import {
  EventType,
  type IntegrationOptions,
  type LoadIntegrationEventData,
  type StrippedDownAnalytics,
} from '../../index.js';
import { Integration } from '../index.js';
import {
  loadIntegrationData as loadData,
  trackEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';

const constructorSpy = jest.fn();

class MyIntegration extends Integration<IntegrationOptions> {
  constructor(
    options: IntegrationOptions,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, strippedDownAnalytics);
    constructorSpy();
  }

  static override shouldLoad() {
    return true;
  }

  override track(): void {
    // Do nothing
  }
}

describe('Integration', () => {
  const options = {
    endpoint: '/foo',
    data: {
      bar: 'bar',
      foo: 'foo',
    },
  };

  function assertConstructorCalled() {
    expect(constructorSpy).toHaveBeenCalled();
  }

  let integration: Integration<IntegrationOptions>;

  beforeEach(() => {
    integration = MyIntegration.createInstance(options, loadData, {
      createEvent: type => Promise.resolve({ ...loadData, type }),
    });

    assertConstructorCalled();
  });

  it('`track` should throw a `Method not implemented` error by default', () => {
    expect(() => {
      Integration.createInstance({}, loadData, {
        createEvent: type => Promise.resolve({ ...loadData, type }),
      }).track(trackEventsData[EventType.ProductAddedToCart]);
    }).toThrow('Method not implemented');
  });

  it('Should set the options passed in the constructor', () => {
    // @ts-expect-error
    expect(integration.options).toEqual(options);
  });

  it('Should have a track method', () => {
    expect(integration.track).toBeInstanceOf(Function);
  });

  it('should return an instance of itself or of an extended class', () => {
    class MyIntegration extends Integration<IntegrationOptions> {}

    expect(integration).toBeInstanceOf(Integration);
    // @ts-expect-error - No need to pass options to test what we need here
    expect(MyIntegration.createInstance()).toBeInstanceOf(Integration);
  });

  describe('Consent', () => {
    it('Should not be ready to load by default', () => {
      // @ts-expect-error - Ensure it returns false even when there's no consent
      expect(Integration.shouldLoad()).toBe(false);
    });

    it('Should have a setConsent method', () => {
      expect(integration.setConsent).toBeInstanceOf(Function);
    });

    it('Should load only when ALL the provided consent categories are true', () => {
      expect(
        Integration.shouldLoad(
          { foo: true, bar: true },
          {
            consentCategories: ['foo', 'bar'],
          },
        ),
      ).toBe(true);

      expect(
        Integration.shouldLoad(
          { foo: true, bar: false },
          {
            consentCategories: ['foo', 'bar'],
          },
        ),
      ).toBe(false);

      expect(
        Integration.shouldLoad(
          { foo: true, bar: false },
          {
            consentCategories: 'foo',
          },
        ),
      ).toBe(true);
    });

    it('Should throw an error if passed an invalid consent type', () => {
      expect(() =>
        Integration.shouldLoad(
          {},
          {
            // @ts-expect-error - Test an invalid type scenario
            consentCategories: 123,
          },
        ),
      ).toThrow();
    });
  });
});

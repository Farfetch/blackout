import {
  eventTypes,
  IntegrationOptions,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
} from '../..';
import { Integration } from '..';
import {
  loadIntegrationData as loadData,
  trackEventsData,
} from 'tests/__fixtures__/analytics';

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

  let integration: Integration<IntegrationOptions>;

  beforeEach(() => {
    integration = MyIntegration.createInstance(options, loadData, {
      createEvent: type => Promise.resolve({ ...loadData, type }),
    });

    expect(constructorSpy).toHaveBeenCalled();
  });

  it('`shouldLoad` should throw a `Method not implemented` error by default', () => {
    expect(() => {
      Integration.shouldLoad(loadData.consent);
    }).toThrow('Method not implemented');
  });

  it('`track` should throw a `Method not implemented` error by default', () => {
    expect(() => {
      Integration.createInstance({}, loadData, {
        createEvent: type => Promise.resolve({ ...loadData, type }),
      }).track(trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART]);
    }).toThrow('Method not implemented');
  });

  it('Should set the options passed in the constructor', () => {
    // @ts-expect-error
    expect(integration.options).toEqual(options);
  });

  it('Should have a track method', () => {
    expect(integration.track).toBeInstanceOf(Function);
  });

  it('Should have a setConsent method', () => {
    expect(integration.setConsent).toBeInstanceOf(Function);
  });
});

import { Integration } from '..';

describe('Integration', () => {
  const options = {
    endpoint: '/foo',
    data: {
      bar: 'bar',
      foo: 'foo',
    },
  };
  const loadData = {
    foo: 'bar',
  };
  let integration;

  beforeEach(() => {
    integration = new Integration(options, loadData);
  });

  it('Should set the options passed in the constructor', () => {
    expect(integration.options).toEqual(options);
  });

  it('Should have a track method', () => {
    expect(integration.track).toBeInstanceOf(Function);
  });

  it('should return an instance of itself or of an extended class', () => {
    class MyIntegration extends Integration {}

    expect(integration).toBeInstanceOf(Integration);
    expect(MyIntegration.createInstance()).toBeInstanceOf(Integration);
  });

  describe('Consent', () => {
    it('Should not be ready to load by default', () => {
      expect(Integration.shouldLoad()).toEqual(false);
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
            consentCategories: 123,
          },
        ),
      ).toThrowError();
    });
  });
});

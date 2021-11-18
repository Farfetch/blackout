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

  it('Should not be ready to load by default', () => {
    expect(Integration.shouldLoad()).toEqual(false);
  });

  it('Should set the options passed in the constructor', () => {
    expect(integration.options).toEqual(options);
  });

  it('Should have a track method', () => {
    expect(integration.track).toBeInstanceOf(Function);
  });

  it('Should have a setConsent method', () => {
    expect(integration.setConsent).toBeInstanceOf(Function);
  });
});

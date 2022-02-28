import { Integration } from '..';

class MyIntegration extends Integration {
  static createInstance(
    options?: Record<string, unknown>,
    loadData?: Record<string, unknown>,
  ) {
    return new MyIntegration(options, loadData);
  }

  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

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
  let integration: Integration;

  beforeEach(() => {
    integration = new MyIntegration(options, loadData);
  });

  it('Should not be ready to load by default', () => {
    expect(Integration.shouldLoad({})).toEqual(false);
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

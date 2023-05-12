import { integrations } from '@farfetch/blackout-core/analytics';
import Castle from '../Castle';
import CastleV2 from '../Castle/CastleV2';

// mock this function to avoid installing `jest-canvas-mock` - CastleV2 needs it.
HTMLCanvasElement.prototype.getContext = jest.fn();

describe('Castle facade class', () => {
  it('Should extend the core integration class', () => {
    expect(Castle.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('Should be an integration that loads independently of user consent', () => {
    expect(Castle.shouldLoad()).toBe(true);
  });

  it('Should return a CastleV2 instance when passing an publishable key', async () => {
    const instance = Castle.createInstance({
      configureOptions: {
        pk: 'pk_mock_111111111111111111111111111',
      },
    });

    expect(instance).toBeInstanceOf(CastleV2);
  });

  it('Should throw an error if old castle v1 options is passed.', async () => {
    expect(() => Castle.createInstance({ appId: 123465 })).toThrowError(
      '[Castle] - Could not load the correct version of Castle integration. The version 1 of Castle, is deprecated and is not available anymore. Make sure to pass the correct integration options.',
    );
  });

  it('Should throw an error if no valid option is passed', async () => {
    expect(() => Castle.createInstance({ foo: 'bar' })).toThrowError(
      '[Castle] - Could not load the correct version of Castle integration. Make sure to pass the correct integration options.',
    );
  });
});

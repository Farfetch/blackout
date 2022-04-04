import { integrations } from '@farfetch/blackout-core/analytics';
import Castle from '../Castle';
import CastleV1 from '../Castle/CastleV1';
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

  it('Should return a CastleV1 instance when passing an app ID', async () => {
    const instance = Castle.createInstance({ appId: 123465 });

    expect(instance).toBeInstanceOf(CastleV1);
  });

  it('Should return a CastleV2 instance when passing an publishable key', async () => {
    const instance = Castle.createInstance({
      pk: 'pk_mock_111111111111111111111111111',
    });

    expect(instance).toBeInstanceOf(CastleV2);
  });

  it('Should throw an error if no valid option is passed', async () => {
    expect(() => Castle.createInstance({ foo: 'bar' })).toThrowError(
      'Could not load the correct version of Castle integration. Make sure to pass the correct integration options.',
    );
  });
});

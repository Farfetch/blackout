import {
  trackTypes as analyticsTrackTypes,
  integrations,
} from '@farfetch/blackout-core/analytics';
import { Riskified } from '..';

describe('Riskified integration', () => {
  let instance;
  const options = {};
  const baseUrl = 'https://beacon.riskified.com?shop=farfetch.com&sid=';
  const localId = '3c11a6f9-6d5e-45c4-b1b2-d26736964605';
  const loadData = {
    user: {
      localId,
    },
  };

  beforeEach(() => {
    instance = Riskified.createInstance(options, loadData);
  });

  it('should return null when trying to track an event type `track`', () => {
    expect(instance.track({ type: analyticsTrackTypes.TRACK })).toBeNull();
  });

  it('Should extend the abstract class `Integration`', () => {
    expect(Riskified.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('Should be ready to load by default', () => {
    expect(Riskified.shouldLoad()).toEqual(true);
  });

  it('Should have a base URL defined', () => {
    expect(instance.baseUrl).toEqual(baseUrl);
  });

  it('Should set the script and append it to the DOM', () => {
    const script = document.querySelector('[data-test="riskified"]');

    expect(script).toBeDefined();
    expect(script.async).toBe(true);
    expect(script.src.endsWith(localId)).toBeTruthy();
  });

  it('Should set to true when onLoad occurs', () => {
    expect(instance.isReady).toBe(false);

    instance.onLoad();

    expect(instance.isReady).toBe(true);
  });

  it('Should call `RISKX.go` if the integration is ready', () => {
    const data = {
      type: 'page',
      context: {
        web: {
          window: {
            location: {
              href: 'http://localhost',
            },
          },
        },
      },
      user: {
        localId,
      },
    };
    const spy = jest.fn();

    global.RISKX = {
      go: spy,
    };

    instance.isReady = true;
    instance.track(data);

    expect(spy).toBeCalledWith(data.context.web.window.location.href);
  });

  it('Should not call `RISKX.go` if the integration isnt ready', () => {
    const data = {
      type: 'page',
      properties: {
        location: {
          href: 'http://localhost',
        },
      },
      user: {
        localId,
      },
    };
    const spy = jest.fn();

    global.RISKX = {
      go: spy,
    };

    instance.isReady = false;
    instance.track(data);

    expect(spy).not.toBeCalled();
  });
});

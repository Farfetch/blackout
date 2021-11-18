import {
  trackTypes as analyticsTrackTypes,
  integrations,
  utils,
} from '@farfetch/blackout-core/analytics';
import { Nethone } from '../';

utils.logger.error = jest.fn();

describe('Nethone integration', () => {
  let instance;
  let baseUrl = 'https://iequ7wai.urjohmgbuuwi.com/s/4799/dja.js';
  const validEvent = 'Sign-up Form Viewed';
  const options = {
    sensitiveFields: {
      [validEvent]: ['foo'],
    },
  };
  const timestamp = new Date().getTime();
  const localId = '3c11a6f9-6d5e-45c4-b1b2-d26736964605';
  const data = {
    type: analyticsTrackTypes.TRACK,
    timestamp,
    event: validEvent,
    context: {
      culture: 'US',
    },
    user: {
      localId,
    },
  };
  const spy = jest.fn();
  global.dftp = {
    init: spy,
  };
  const loadData = {
    user: {
      localId,
    },
  };
  beforeEach(() => {
    instance = Nethone.createInstance(options, loadData);
  });

  afterEach(() => {
    // Remove script tag if present to avoid conflict between tests
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('Should extend the abstract class `Integration`', () => {
    expect(Nethone.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('Should be ready to load by default', () => {
    expect(Nethone.shouldLoad()).toEqual(true);
  });

  it('Should return an instance of it in .createInstance()', () => {
    expect(Nethone.createInstance({})).toBeInstanceOf(Nethone);
  });

  it('Should have `isLoaded` flag set to false', () => {
    expect(instance.isLoaded).toEqual(false);
  });

  it('Should have `initialized` flag set to false', () => {
    expect(instance.initialized).toEqual(false);
  });

  it('Should have a base URL defined', () => {
    expect(instance.baseUrl).toEqual(baseUrl);
  });

  it('should return null when trying to track a page type', () => {
    expect(
      instance.track({ ...data, type: analyticsTrackTypes.PAGE }),
    ).toBeNull();
  });

  it('Should append the script only once if the culture is valid, when calling multiple times `.track()`', () => {
    instance.track(data);
    instance.track(data);

    const scripts = document.querySelectorAll('[data-test="nethone"]');

    expect(scripts).toBeDefined();
    expect(scripts).toHaveLength(1);
    expect(scripts[0].async).toBe(true);
    expect(scripts[0].src).toBe(baseUrl);
  });

  it('Should not append the script if the culture is invalid or undefined', () => {
    instance.track({ ...data, context: { culture: 'foo' } });

    let script = document.querySelector('[data-test="nethone"]');

    expect(script).toBeNull();

    instance.track({ ...data, context: { culture: undefined } });

    script = document.querySelector('[data-test="nethone"]');

    expect(script).toBeNull();
  });

  it('Should not append the script if the event is not of interest', () => {
    instance.track({ ...data, event: 'foo' });

    const script = document.querySelector('[data-test="nethone"]');

    expect(script).toBeNull();
  });

  it('Should not call `window.dftp.init` if the integration is initialized', () => {
    instance.initialized = true;
    instance.getOnload(data)();

    expect(global.dftp.init).not.toHaveBeenCalled();
  });

  it('Should call `window.dftp.init` only once when calling instance `onload` method twice', () => {
    instance.getOnload(data)();

    expect(global.dftp.init).toHaveBeenCalledTimes(1);
    expect(global.dftp.init).toBeCalledWith({
      attemptReference: `${localId}_${timestamp}`,
      sensitiveFields: options.sensitiveFields[validEvent],
    });
  });
});

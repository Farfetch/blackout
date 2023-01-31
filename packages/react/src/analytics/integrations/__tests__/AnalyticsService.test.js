import { integrations, trackTypes } from '@farfetch/blackout-core/analytics';
import ReactAnalyticsService from '../AnalyticsService';

describe('ReactAnalyticsService', () => {
  describe('integration', () => {
    it('Should create an instance of this integration', () => {
      const instance = ReactAnalyticsService.createInstance();

      expect(instance).toBeInstanceOf(ReactAnalyticsService);
      expect(instance).toBeInstanceOf(integrations.AnalyticsService);
    });
  });

  describe('clearInterval method', () => {
    it('Should clear the interval when calling .clearInterval()', () => {
      const instance = ReactAnalyticsService.createInstance();

      expect(instance.interval).toBeDefined();

      instance.clearInterval();

      expect(instance.interval).toBeUndefined();
    });
  });

  it('Should flush the queue when a page track occurs', () => {
    const instance = ReactAnalyticsService.createInstance();
    const flushSpy = jest.spyOn(instance, 'flushQueue');

    instance.track({});
    instance.track({});
    instance.track({});

    expect(instance.queue).toHaveLength(3);

    expect(flushSpy).not.toHaveBeenCalled();

    instance.track({ type: trackTypes.PAGE });

    expect(flushSpy).toHaveBeenCalled();
  });
});

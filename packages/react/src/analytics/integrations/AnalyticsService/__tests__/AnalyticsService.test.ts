import {
  integrations,
  StrippedDownAnalytics,
  trackTypes,
} from '@farfetch/blackout-analytics';
import { loadIntegrationData } from 'tests/__fixtures__/analytics';
import ReactAnalyticsService from '../AnalyticsService';
import type AnalyticsService from '..';

const strippedDownAnalytics = {} as StrippedDownAnalytics;

describe('ReactAnalyticsService', () => {
  describe('integration', () => {
    it('Should create an instance of this integration', () => {
      const instance = ReactAnalyticsService.createInstance(
        {},
        loadIntegrationData,
        strippedDownAnalytics,
      );

      expect(instance).toBeInstanceOf(ReactAnalyticsService);
      expect(instance).toBeInstanceOf(integrations.AnalyticsService);
    });
  });

  describe('clearInterval method', () => {
    it('Should clear the interval when calling .clearInterval()', () => {
      const instance = ReactAnalyticsService.createInstance(
        {},
        loadIntegrationData,
        strippedDownAnalytics,
      ) as AnalyticsService;

      expect(instance.interval).toBeDefined();

      instance.clearInterval();

      expect(instance.interval).toBeUndefined();
    });
  });

  it('Should flush the queue when a page track occurs', () => {
    const instance = ReactAnalyticsService.createInstance(
      {},
      loadIntegrationData,
      strippedDownAnalytics,
    ) as AnalyticsService;
    const flushSpy = jest.spyOn(instance, 'flushQueue');

    // @ts-expect-error
    instance.track({});
    // @ts-expect-error
    instance.track({});
    // @ts-expect-error
    instance.track({});

    expect(instance.queue).toHaveLength(3);

    expect(flushSpy).not.toHaveBeenCalled();

    // @ts-expect-error
    instance.track({ type: trackTypes.PAGE });

    expect(flushSpy).toHaveBeenCalled();
  });
});

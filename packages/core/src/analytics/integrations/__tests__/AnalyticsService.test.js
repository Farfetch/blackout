import {
  DATA_TYPE_FIELD,
  DATA_VERSION_FIELD,
  MINIMUM_REQUEST_INTERVAL,
  REQUEST_INTERVAL_KEY,
} from '../AnalyticsService/constants';
import { postAnalytics } from '../AnalyticsService/client';
import { utils } from '@farfetch/blackout-core/analytics';
import AnalyticsService from '../AnalyticsService/AnalyticsService';
import trackMockData from '../../__fixtures__/trackData.fixtures';
import userMockData from '../../__fixtures__/userData.fixtures';

jest.mock('../AnalyticsService/client', () => ({
  ...jest.requireActual('../AnalyticsService/client'),
  postAnalytics: jest.fn(),
}));

const trackPayload = {
  type: DATA_TYPE_FIELD,
  version: DATA_VERSION_FIELD,
  data: trackMockData,
};

describe('AnalyticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('shouldLoad method', () => {
    it('Should return true no matter which consent was given', () => {
      let shouldLoadResponse = AnalyticsService.shouldLoad({});

      expect(shouldLoadResponse).toBe(true);

      shouldLoadResponse = AnalyticsService.shouldLoad({
        marketing: false,
        statistics: false,
        preferences: false,
      });

      expect(shouldLoadResponse).toBe(true);
    });
  });

  describe('createInstance method', () => {
    it('Should create an instance of this integration', () => {
      const instance = AnalyticsService.createInstance();

      expect(instance).toBeInstanceOf(AnalyticsService);
    });

    it('Should throw a TypeError if passed an invalid type of "requestInterval"', () => {
      expect(() =>
        AnalyticsService.createInstance({
          requestInterval: 'foo',
        }),
      ).toThrow(
        new TypeError(
          `Analytics Service - The "${REQUEST_INTERVAL_KEY}" passed to the integration is not a number. Please make sure a valid number is passed.`,
        ),
      );

      expect(() =>
        AnalyticsService.createInstance({
          requestInterval: -200,
        }),
      ).toThrow(
        new Error(
          `Analytics Service - The "${REQUEST_INTERVAL_KEY}" passed to the integration is not valid. Please make sure you are passing a value superior than "${MINIMUM_REQUEST_INTERVAL}".`,
        ),
      );
    });
  });

  describe('clearInterval method', () => {
    it('Should have a placeholder for the method with the purpose of being extended', () => {
      const instance = AnalyticsService.createInstance();

      expect(() => instance.clearInterval()).not.toThrow();
    });
  });

  describe('controlQueue method', () => {
    it('Should have a placeholder for the method with the purpose of being extended', () => {
      const instance = AnalyticsService.createInstance();

      expect(() => instance.controlQueue()).not.toThrow();
    });
  });

  describe('setup method', () => {
    it('Should have a placeholder for the method with the purpose of being extended', () => {
      const instance = AnalyticsService.createInstance();

      expect(() => instance.setup()).not.toThrow();
    });
  });

  describe('onSetUser method', () => {
    it('Should send event data to Analytics service', () => {
      jest.useFakeTimers();
      const instance = AnalyticsService.createInstance();
      const payload = {
        data: userMockData,
        type: DATA_TYPE_FIELD,
        version: DATA_VERSION_FIELD,
      };

      instance.onSetUser(userMockData);

      const hashedUserPayload = {
        ...payload,
        data: {
          ...payload.data,
          user: utils.hashUserData(payload.data.user),
        },
      };

      expect(instance.queue[0]).toEqual(hashedUserPayload);

      // Force the flush
      instance.flushQueue();

      expect(postAnalytics).toHaveBeenCalledWith([hashedUserPayload]);
    });
  });

  describe('track method', () => {
    it('Should send a track event data to Analytics service', () => {
      const instance = AnalyticsService.createInstance();

      instance.track(trackMockData);

      expect(postAnalytics).not.toHaveBeenCalled();

      // Force the flush
      instance.flushQueue();

      expect(postAnalytics).toHaveBeenCalledWith([trackPayload]);
    });

    it('Should allow to pass a setup function to perform the flush when extending the class', () => {
      jest.useFakeTimers();

      // Extend the class implementing a setTimeout for the setup
      const MyAnalyticsService = class extends AnalyticsService {
        setup(interval) {
          this.interval = setTimeout(this.flushQueue, interval);
        }

        clearInterval() {
          clearInterval(this.interval);

          this.interval = undefined;
        }
      };
      const instance = new MyAnalyticsService();

      expect(instance.interval).toBeDefined();

      // Test tracking an event
      instance.track(trackMockData);

      expect(postAnalytics).not.toHaveBeenCalled();

      jest.runOnlyPendingTimers();

      expect(postAnalytics).toHaveBeenCalledWith([trackPayload]);

      // Test the implementation extension for the clearInterval
      instance.clearInterval();

      expect(instance.interval).toBeUndefined();
    });
  });
});

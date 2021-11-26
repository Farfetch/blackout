import {
  DATA_TYPE_FIELD,
  DATA_VERSION_FIELD,
  MINIMUM_REQUEST_INTERVAL,
  REQUEST_INTERVAL_KEY,
} from '../constants';
import { eventTypes } from '../../../';
import {
  onSetUserEventData,
  trackEventsData,
} from 'tests/__fixtures__/analytics';
import { postAnalytics } from '@farfetch/blackout-client/analyticsService';
import { utils } from '@farfetch/blackout-analytics';
import AnalyticsService from '../AnalyticsService';

jest.mock('@farfetch/blackout-client/analyticsService', () => ({
  ...jest.requireActual('@farfetch/blackout-client/analyticsService'),
  postAnalytics: jest.fn(),
}));

const eventData = trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

const trackPayload = {
  type: DATA_TYPE_FIELD,
  version: DATA_VERSION_FIELD,
  data: {
    ...eventData,
    user: utils.hashUserData(eventData.user),
  },
};

class SafeAnalyticsSubclass extends AnalyticsService {
  setup() {}
  clearInterval() {}
  controlQueue() {}
}

function getAnalyticsServiceInstance(options, loadData, analytics) {
  return new SafeAnalyticsSubclass(options, loadData, analytics);
}

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
      const instance = getAnalyticsServiceInstance();

      expect(instance).toBeInstanceOf(AnalyticsService);
    });

    it('Should throw a TypeError if passed an invalid type of "requestInterval"', () => {
      expect(() =>
        getAnalyticsServiceInstance({
          requestInterval: 'foo',
        }),
      ).toThrow(
        new TypeError(
          `Analytics Service - The "${REQUEST_INTERVAL_KEY}" passed to the integration is not a number. Please make sure a valid number is passed.`,
        ),
      );

      expect(() =>
        getAnalyticsServiceInstance({
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
      // bypass the constructor to dodge the .setup() throw
      expect(() => AnalyticsService.prototype.clearInterval()).toThrow(
        "This method should be implemented by the subclass. If you are getting this error, make sure you are using the correct integration from '@farfetch/blackout-client/react' or '@farfetch/blackout-react-native-analytics'.",
      );
    });
  });

  describe('controlQueue method', () => {
    it('Should have a placeholder for the method with the purpose of being extended', () => {
      // bypass the constructor to dodge the .setup() throw
      expect(() => AnalyticsService.prototype.controlQueue()).toThrow(
        "This method should be implemented by the subclass. If you are getting this error, make sure you are using the correct integration from '@farfetch/blackout-client/react' or '@farfetch/blackout-react-native-analytics'.",
      );
    });
  });

  describe('setup method', () => {
    it('Should have a placeholder for the method with the purpose of being extended', () => {
      expect(() => AnalyticsService.createInstance()).toThrow(
        "This method should be implemented by the subclass. If you are getting this error, make sure you are using the correct integration from '@farfetch/blackout-client/react' or '@farfetch/blackout-react-native-analytics'.",
      );
    });
  });

  describe('onSetUser method', () => {
    it('Should send event data to Analytics service', () => {
      jest.useFakeTimers();
      const instance = getAnalyticsServiceInstance();
      const payload = {
        data: {
          ...onSetUserEventData,
          user: utils.hashUserData(onSetUserEventData.user),
        },
        type: DATA_TYPE_FIELD,
        version: DATA_VERSION_FIELD,
      };

      instance.onSetUser(onSetUserEventData);

      expect(instance.queue[0]).toEqual(payload);

      // Force the flush
      instance.flushQueue();

      expect(postAnalytics).toHaveBeenCalledWith([payload]);
    });
  });

  describe('track method', () => {
    it('Should send a track event data to Analytics service', () => {
      const instance = getAnalyticsServiceInstance();

      instance.track(trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART]);

      expect(postAnalytics).not.toHaveBeenCalled();

      // Force the flush
      instance.flushQueue();

      expect(postAnalytics).toHaveBeenCalledWith([trackPayload]);

      postAnalytics.mockClear();

      // force a new flush to ensure the postAnalytics is not being called again
      instance.flushQueue();

      expect(postAnalytics).not.toHaveBeenCalled();
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

        controlQueue() {}
      };
      const instance = new MyAnalyticsService();

      expect(instance.interval).toBeDefined();

      // Test tracking an event
      instance.track(trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART]);

      expect(postAnalytics).not.toHaveBeenCalled();

      jest.runOnlyPendingTimers();

      expect(postAnalytics).toHaveBeenCalledWith([trackPayload]);

      // Test the implementation extension for the clearInterval
      instance.clearInterval();

      expect(instance.interval).toBeUndefined();
    });
  });
});

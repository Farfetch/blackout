import {
  EventType,
  FromParameterType,
  PageType,
  SignupNewsletterGenderType,
} from '../../../types/index.js';
import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getLoginSignupRecommendedParameters,
  getPageEventFromLocation,
  getPlatformSpecificParameters,
  getProductLineItemsQuantity,
  getRecommendationsTrackingData,
  getValParameterForEvent,
} from '../omnitracking-helper.js';
import { logger } from '../../../utils/index.js';
import PlatformType from '../../../types/PlatformType.js';
import TrackType from '../../../types/TrackType.js';
import type {
  EventData,
  TrackTypesValues,
} from '../../../types/analytics.types.js';
import type URLParse from 'url-parse';

logger.error = jest.fn();
logger.warn = jest.fn();

describe('omnitracking-helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPageEventFromLocation', () => {
    it('should return null when location is not provided', () => {
      expect(getPageEventFromLocation()).toBeNull();
    });

    it('should return null location.href is not set', () => {
      expect(
        getPageEventFromLocation(
          {} as URLParse<Record<string, string | undefined>>,
        ),
      ).toBeNull();
    });
  });

  describe('getValParameterForEvent', () => {
    it('should return a stringified object', () => {
      expect(getValParameterForEvent()).toBe('{}');
      expect(getValParameterForEvent({ foo: 'bar' })).toBe('{"foo":"bar"}');
    });
  });

  describe('generatePaymentAttemptReferenceId', () => {
    it('Should return a string with the generated payment attempt reference ID', () => {
      const mockPaymentAttemptReferenceId = '12345_123456789';

      expect(
        generatePaymentAttemptReferenceId({
          user: {
            localId: '12345',
          },
          timestamp: 123456789,
        } as EventData<TrackTypesValues>),
      ).toEqual(mockPaymentAttemptReferenceId);
    });
  });

  describe('getPlatformSpecificParameters', () => {
    it('should not add parameters if the platform is mobile and track type is not screen', () => {
      const eventData = {
        platform: PlatformType.Mobile,
        type: TrackType.Track,
      } as EventData<TrackTypesValues>;

      expect(getPlatformSpecificParameters(eventData)).toStrictEqual({});
    });
  });

  describe('getCheckoutEventGenericProperties', () => {
    it('should display an error if an invalid orderId value is passed', () => {
      const eventData = {
        type: TrackType.Track,
        event: EventType.PromocodeApplied,
        properties: { orderId: '123' } as Record<string, unknown>,
      } as EventData<TrackTypesValues>;

      getCheckoutEventGenericProperties(eventData);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining(
          'property "orderId" should be an alphanumeric value',
        ),
      );
    });

    it('should get orderCode and checkoutOrderId correctly', () => {
      const eventData = {
        properties: {
          orderId: '5H5QYB',
          checkoutOrderId: 123,
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>;

      expect(getCheckoutEventGenericProperties(eventData)).toEqual({
        orderCode: '5H5QYB',
        checkoutOrderId: 123,
      });
    });
  });

  describe('getProductLineItemsQuantity', () => {
    it('should return the sum of all quantities from all products in the list', () => {
      expect(
        getProductLineItemsQuantity([
          {
            quantity: 5,
          },
          {
            quantity: 3,
          },
          {
            quantity: 2,
          },
        ]),
      ).toBe(10);
    });
  });

  describe('getDeliveryInformationDetails', () => {
    it('should deal with empty information', () => {
      // @ts-expect-error
      expect(getDeliveryInformationDetails({})).toBeUndefined();
    });

    it('should deal with delivery type', () => {
      expect(
        getDeliveryInformationDetails({
          properties: {
            deliveryType: 'sample',
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toBe('{"deliveryType":"sample"}');
    });

    it('should deal with shipping tier', () => {
      expect(
        getDeliveryInformationDetails({
          properties: {
            shippingTier: 'sample',
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toBe('{"courierType":"sample"}');
    });
  });

  describe('getCommonCheckoutStepTrackingData', () => {
    it('should obtain common checkout parameters', () => {
      expect(
        getCommonCheckoutStepTrackingData({
          properties: {
            step: 2,
            deliveryType: 'sample_delivery',
            shippingTier: 'sample_shipping',
            interactionType: 'click',
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual({
        checkoutStep: 2,
        deliveryInformationDetails:
          '{"deliveryType":"sample_delivery","courierType":"sample_shipping"}',
        interactionType: 'click',
      });
    });
  });

  describe('getGenderValueFromProperties', () => {
    it(`should test all ways to return ${SignupNewsletterGenderType[0]} value`, () => {
      expect(
        getGenderValueFromProperties({
          properties: {
            gender: 0,
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(SignupNewsletterGenderType[0]);

      expect(
        getGenderValueFromProperties({
          properties: {
            gender: '0',
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(SignupNewsletterGenderType[0]);

      expect(
        getGenderValueFromProperties({
          properties: {
            gender: { id: '0' },
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(SignupNewsletterGenderType[0]);
    });

    it(`should test all ways to return ${SignupNewsletterGenderType[0]} and ${SignupNewsletterGenderType[1]} value`, () => {
      const expected = `${SignupNewsletterGenderType[0]},${SignupNewsletterGenderType[1]}`;

      expect(
        getGenderValueFromProperties({
          properties: {
            gender: [0, 1],
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(expected);

      expect(
        getGenderValueFromProperties({
          properties: {
            gender: ['0', '1'],
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(expected);

      expect(
        getGenderValueFromProperties({
          properties: {
            gender: [{ id: '0' }, { id: '1' }],
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(expected);
    });

    it('should return custom value', () => {
      expect(
        getGenderValueFromProperties({
          properties: {
            gender: { name: 'W' },
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toBe('W');

      expect(
        getGenderValueFromProperties({
          properties: {
            gender: [{ name: 'W' }, { name: 'M' }],
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toBe('W,M');
    });
  });

  describe('getRecommendationsTrackingData', () => {
    const mockedRecommendationsValues = {
      list: 'list123',
      listId: '09a35590-bb62-4027-a630-5da04ec64fb5',
    };

    const mockedReturnedRecommendationsValues = {
      moduleTitle: JSON.stringify([mockedRecommendationsValues.list]),
      moduleId: JSON.stringify([mockedRecommendationsValues.listId]),
    };

    it('should return undefined in case its non recommendations product-details event', () => {
      expect(
        getRecommendationsTrackingData({
          event: PageType.ProductDetails,
          properties: {
            from: 'abc',
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toBeUndefined();
    });

    it('should return empty object if the event is sent without the recommendations parameters filled', () => {
      expect(
        getRecommendationsTrackingData({
          event: 'abc',
          properties: {
            from: FromParameterType.Recommendations,
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual({});
    });

    it('should return the json stringified values correctly', () => {
      expect(
        getRecommendationsTrackingData({
          event: 'abc',
          properties: {
            from: FromParameterType.Recommendations,
            ...mockedRecommendationsValues,
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual(mockedReturnedRecommendationsValues);
    });

    it('should return just one stringified parameter in case its sent only one parameter', () => {
      expect(
        getRecommendationsTrackingData({
          event: 'abc',
          properties: {
            from: 'abc',
            list: mockedRecommendationsValues.list,
          } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual({
        moduleTitle: mockedReturnedRecommendationsValues.moduleTitle,
      });
    });
  });

  describe('getLoginSignupRecommendedParameters', () => {
    it('should log a warning when recommended properties are missing and should not return any properties.', () => {
      expect(
        getLoginSignupRecommendedParameters({
          event: 'abc',
          properties: {} as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual({});

      expect(logger.warn).toHaveBeenCalled();
    });

    it('should not log a warning when all recommended properties are filled and correctly mapped to Omnitracking fields.', () => {
      expect(
        getLoginSignupRecommendedParameters({
          event: 'abc',
          properties: { method: 'test' } as Record<string, unknown>,
        } as EventData<TrackTypesValues>),
      ).toEqual({ loginType: 'test' });

      expect(logger.warn).not.toHaveBeenCalled();
    });
  });
});

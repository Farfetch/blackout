import { EventTypes, SignupNewsletterGenderTypes } from '../../../types';
import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getPageEventFromLocation,
  getPlatformSpecificParameters,
  getProductLineItemsQuantity,
  getValParameterForEvent,
} from '../omnitracking-helper';
import { logger } from '../../../utils';
import PlatformTypes from '../../../types/PlatformTypes';
import TrackTypes from '../../../types/TrackTypes';
import type {
  EventData,
  TrackTypesValues,
} from '../../../types/analytics.types';

logger.error = jest.fn();

describe('getPageEventFromLocation', () => {
  it('should return null when location is not provided', () => {
    expect(getPageEventFromLocation()).toBeNull();
  });

  it('should return null location.href is not set', () => {
    expect(getPageEventFromLocation({} as Location)).toBeNull();
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
      platform: PlatformTypes.Mobile,
      type: TrackTypes.TRACK,
    } as EventData<TrackTypesValues>;

    expect(getPlatformSpecificParameters(eventData)).toStrictEqual({});
  });
});

describe('getCheckoutEventGenericProperties', () => {
  it('should display an error if an invalid orderId value is passed', () => {
    const eventData = {
      type: TrackTypes.TRACK,
      event: EventTypes.PROMOCODE_APPLIED,
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
  it(`should test all ways to return ${SignupNewsletterGenderTypes[0]} value`, () => {
    expect(
      getGenderValueFromProperties({
        properties: {
          gender: 0,
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual(SignupNewsletterGenderTypes[0]);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: '0',
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual(SignupNewsletterGenderTypes[0]);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: { id: '0' },
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual(SignupNewsletterGenderTypes[0]);
  });

  it(`should test all ways to return ${SignupNewsletterGenderTypes[0]} and ${SignupNewsletterGenderTypes[1]} value`, () => {
    const expected = `${SignupNewsletterGenderTypes[0]},${SignupNewsletterGenderTypes[1]}`;

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

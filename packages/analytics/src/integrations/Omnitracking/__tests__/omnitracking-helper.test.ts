import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getOmnitrackingProductId,
  getPageEventFromLocation,
  getPlatformSpecificParameters,
  getProductLineItemsQuantity,
  getValParameterForEvent,
} from '../omnitracking-helper';
import { logger } from '../../../utils';
import { signupNewsletterGenderTypes } from '../../../types';
import platformTypes from '../../../types/platformTypes';
import trackTypes from '../../../types/trackTypes';
import type {
  EventData,
  TrackTypesValues,
} from '../../../types/analytics.types';

logger.warn = jest.fn();
const mockLoggerWarn = logger.warn;

describe('getPageEventFromLocation', () => {
  it('should return null when location is not provided', () => {
    expect(getPageEventFromLocation()).toBe(null);
  });

  it('should return null location.href is not set', () => {
    expect(getPageEventFromLocation({} as Location)).toBe(null);
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
      platform: platformTypes.Mobile,
      type: trackTypes.TRACK,
    } as EventData<TrackTypesValues>;

    expect(getPlatformSpecificParameters(eventData)).toStrictEqual({});
  });
});

describe('getCheckoutEventGenericProperties', () => {
  it('should display some warn', () => {
    const eventData = {
      type: trackTypes.TRACK,
      properties: { orderId: '123' } as Record<string, unknown>,
    } as EventData<TrackTypesValues>;

    getCheckoutEventGenericProperties(eventData);
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining(
        'property orderId should be an alphanumeric value',
      ),
    );
  });

  it('should get orderCode without warn and without property orderId', () => {
    const eventData = {
      properties: {
        orderId: '5H5QYB',
        checkoutOrderId: '123',
      } as Record<string, unknown>,
    } as EventData<TrackTypesValues>;

    expect(getCheckoutEventGenericProperties(eventData)).toEqual({
      orderCode: '5H5QYB',
    });
  });

  it('should get orderCode without warn and with property orderId', () => {
    const eventData = {
      properties: {
        orderId: '5H5QYB',
        checkoutOrderId: '123',
      } as Record<string, unknown>,
    } as EventData<TrackTypesValues>;

    expect(getCheckoutEventGenericProperties(eventData, true)).toEqual({
      orderCode: '5H5QYB',
      orderId: '123',
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
    expect(getDeliveryInformationDetails({})).toEqual(undefined);
  });
  it('should deal with delivery type', () => {
    expect(
      getDeliveryInformationDetails({
        properties: {
          deliveryType: 'sample',
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual('{"deliveryType":"sample"}');
  });

  it('should deal with shipping tier', () => {
    expect(
      getDeliveryInformationDetails({
        properties: {
          shippingTier: 'sample',
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual('{"courierType":"sample"}');
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

describe('getOmnitrackingProductId', () => {
  it('should return product id over id', () => {
    const data = {
      properties: {
        productId: 123,
        id: 432,
      } as Record<string, unknown>,
    } as EventData<TrackTypesValues>;

    expect(getOmnitrackingProductId(data)).toEqual(123);
  });

  it('should return id without product id', () => {
    const data = {
      properties: {
        productId: undefined,
        id: 432,
      } as Record<string, unknown>,
    } as EventData<TrackTypesValues>;

    expect(getOmnitrackingProductId(data)).toEqual(432);
  });

  it('should return undefined instead of id property if method has been called with true on useOnlyProductIdField parameter', () => {
    const data = {
      properties: {
        productId: undefined,
        id: 432,
      } as Record<string, unknown>,
    } as EventData<TrackTypesValues>;

    expect(getOmnitrackingProductId(data, true)).toEqual(undefined);
  });
});
describe('getGenderValueFromProperties', () => {
  it(`should test all ways to return ${signupNewsletterGenderTypes[0]} value`, () => {
    expect(
      getGenderValueFromProperties({
        properties: {
          gender: 0,
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual(signupNewsletterGenderTypes[0]);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: '0',
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual(signupNewsletterGenderTypes[0]);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: { id: '0' },
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual(signupNewsletterGenderTypes[0]);
  });

  it(`should test all ways to return ${signupNewsletterGenderTypes[0]} and ${signupNewsletterGenderTypes[1]} value`, () => {
    const expected = `${signupNewsletterGenderTypes[0]},${signupNewsletterGenderTypes[1]}`;

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
    ).toEqual('W');

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: [{ name: 'W' }, { name: 'M' }],
        } as Record<string, unknown>,
      } as EventData<TrackTypesValues>),
    ).toEqual('W,M');
  });
});

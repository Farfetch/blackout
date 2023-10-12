import { fromParameterTypes, pageTypes, utils } from '../../..';
import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getPageEventFromLocation,
  getPlatformSpecificParameters,
  getRecommendationsTrackingData,
  getValParameterForEvent,
} from '../omnitracking-helper';
import { SignupNewsletterGenderMappings } from '../..';
import platformTypes from '../../../types/platformTypes';
import trackTypes from '../../../types/trackTypes';

utils.logger.warn = jest.fn();
const mockLoggerWarn = utils.logger.warn;

describe('getPageEventFromLocation', () => {
  it('should return null when location is not provided', () => {
    expect(getPageEventFromLocation()).toBe(null);
  });

  it('should return null location.href is not set', () => {
    expect(getPageEventFromLocation({})).toBe(null);
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
      }),
    ).toEqual(mockPaymentAttemptReferenceId);
  });
});

describe('getPlatformSpecificParameters', () => {
  it('should not add parameters if the platform is mobile and track type is not screen', () => {
    const eventData = {
      platform: platformTypes.Mobile,
      type: trackTypes.TRACK,
    };

    expect(getPlatformSpecificParameters(eventData)).toStrictEqual({});
  });
});

describe('getCheckoutEventGenericProperties', () => {
  it('should display some warn', () => {
    const eventData = {
      properties: {
        orderId: '123',
      },
    };

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
      },
    };

    expect(getCheckoutEventGenericProperties(eventData)).toEqual({
      orderCode: '5H5QYB',
    });
  });

  it('should get orderCode without warn and with property orderId', () => {
    const eventData = {
      properties: {
        orderId: '5H5QYB',
        checkoutOrderId: 123,
      },
    };

    expect(getCheckoutEventGenericProperties(eventData, true)).toEqual({
      orderCode: '5H5QYB',
      orderId: 123,
    });
  });
});

describe('getGenderValueFromProperties', () => {
  it(`should test all ways to return ${SignupNewsletterGenderMappings[0]} value`, () => {
    expect(
      getGenderValueFromProperties({
        properties: {
          gender: 0,
        },
      }),
    ).toEqual(SignupNewsletterGenderMappings[0]);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: '0',
        },
      }),
    ).toEqual(SignupNewsletterGenderMappings[0]);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: { id: '0' },
        },
      }),
    ).toEqual(SignupNewsletterGenderMappings[0]);
  });

  it(`should test all ways to return ${SignupNewsletterGenderMappings[0]} and ${SignupNewsletterGenderMappings[1]} value`, () => {
    const expected = `${SignupNewsletterGenderMappings[0]},${SignupNewsletterGenderMappings[1]}`;

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: [0, 1],
        },
      }),
    ).toEqual(expected);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: ['0', '1'],
        },
      }),
    ).toEqual(expected);

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: [{ id: '0' }, { id: '1' }],
        },
      }),
    ).toEqual(expected);
  });

  it('should return custom value', () => {
    expect(
      getGenderValueFromProperties({
        properties: {
          gender: { name: 'W' },
        },
      }),
    ).toEqual('W');

    expect(
      getGenderValueFromProperties({
        properties: {
          gender: [{ name: 'W' }, { name: 'M' }],
        },
      }),
    ).toEqual('W,M');
  });
});

describe('getDeliveryInformationDetails', () => {
  it('should deal with empty information', () => {
    expect(getDeliveryInformationDetails({})).toEqual(undefined);
  });
  it('should deal with delivery type', () => {
    expect(
      getDeliveryInformationDetails({
        properties: {
          deliveryType: 'sample',
        },
      }),
    ).toEqual('{"deliveryType":"sample"}');
  });

  it('should deal with shipping tier', () => {
    expect(
      getDeliveryInformationDetails({
        properties: {
          shippingTier: 'sample',
        },
      }),
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
        },
      }),
    ).toEqual({
      checkoutStep: 2,
      deliveryInformationDetails:
        '{"deliveryType":"sample_delivery","courierType":"sample_shipping"}',
      interactionType: 'click',
    });
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
        event: pageTypes.PRODUCT_DETAILS,
        properties: {
          from: 'abc',
        },
      }),
    ).toBeUndefined();
  });

  it('should return empty object if the event is sent without the recommendations parameters filled', () => {
    expect(
      getRecommendationsTrackingData({
        event: 'abc',
        properties: {
          from: fromParameterTypes.RECOMMENDATIONS,
        },
      }),
    ).toEqual({});
  });

  it('should return the json stringified values correctly', () => {
    expect(
      getRecommendationsTrackingData({
        event: 'abc',
        properties: {
          from: fromParameterTypes.RECOMMENDATIONS,
          ...mockedRecommendationsValues,
        },
      }),
    ).toEqual(mockedReturnedRecommendationsValues);
  });

  it('should return just one stringified parameter in case its sent only one parameter', () => {
    expect(
      getRecommendationsTrackingData({
        event: 'abc',
        properties: {
          from: 'abc',
          list: mockedRecommendationsValues.list,
        },
      }),
    ).toEqual({
      moduleTitle: mockedReturnedRecommendationsValues.moduleTitle,
    });
  });
});

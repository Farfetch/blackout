import {
  generatePaymentAttemptReferenceId,
  getPageEventFromLocation,
  getPlatformSpecificParameters,
  getValParameterForEvent,
} from '../omnitracking-helper';
import platformTypes from '../../../types/platformTypes';
import trackTypes from '../../../types/trackTypes';
import type {
  EventData,
  TrackTypesValues,
} from '../../../types/analytics.types';

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

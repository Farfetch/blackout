import {
  getEventValForEventData,
  getPageEventFromLocation,
  getPlatformSpecificParameters,
} from '../omnitracking-helper';
import eventTypes from '../../../types/eventTypes';
import platformTypes from '../../../types/platformTypes';
import trackTypes from '../../../types/trackTypes';

describe('getPageEventFromLocation', () => {
  it('should return null when location is not provided', () => {
    expect(getPageEventFromLocation()).toBe(null);
  });

  it('should return null location.href is not set', () => {
    expect(getPageEventFromLocation({})).toBe(null);
  });
});

describe('getEventValForEventData', () => {
  it('should return null for an event that is not considered', () => {
    expect(getEventValForEventData(eventTypes.SELECT_CONTENT)).toBe(null);
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

import { eventTypes } from '@farfetch/blackout-core/analytics';
import { isEventOfInterest, isValidCulture } from '../nethone-helper';

describe('nethone-helper', () => {
  describe('isEventOfInterest', () => {
    it('should return 1 when the event is of interest', () => {
      const events = {
        [eventTypes.SIGNUP_FORM_VIEWED]: {},
        [eventTypes.CHECKOUT_STEP_VIEWED]: {},
      };
      const event = eventTypes.SIGNUP_FORM_VIEWED;
      expect(isEventOfInterest(events, event)).toEqual(1);
    });
    it('should return 0 when the event is not of interest', () => {
      const events = {
        [eventTypes.SIGNUP_FORM_VIEWED]: {},
        [eventTypes.CHECKOUT_STEP_VIEWED]: {},
      };
      const event = eventTypes.ORDER_CONFIRMATION_VIEWED;
      expect(isEventOfInterest(events, event)).toEqual(0);
    });
  });

  describe('nethone-helper', () => {
    it('should return true when the culture is valid', () => {
      const culture = 'US';
      const validSubfolders = ['US', 'BR', 'AL'];
      expect(isValidCulture(culture, validSubfolders)).toBe(true);
    });
    it('should return false when the culture is invalid', () => {
      const culture = 'MX';
      const validSubfolders = ['US', 'BR', 'AL'];
      expect(isValidCulture(culture, validSubfolders)).toBe(false);
    });
    it('should return false when culture is not passed', () => {
      const culture = undefined;
      const validSubfolders = ['US', 'BR', 'AL'];
      expect(isValidCulture(culture, validSubfolders)).toBe(false);
    });
  });
});

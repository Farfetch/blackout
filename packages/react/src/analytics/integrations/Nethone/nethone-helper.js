/**
 * @module nethone-helper
 * @private
 */

import { eventTypes, utils } from '@farfetch/blackout-core/analytics';

/**
 * Checks if a event is of interest of the integration.
 *
 * @param {object} events - List of events this integration is interested on.
 * @param {string} event - The event to filter by.
 *
 * @returns {number} 0 if event is not of interest and 1 otherwise.
 */
export const isEventOfInterest = (events, event) =>
  Object.keys(events).filter(key => key === event).length;

/**
 * Validates if the culture passed exists and it is within the valid ones.
 *
 * @param {string} culture - The culture of the user based on the subfolder.
 * @param {Array} validSubfolders - List of valid subfolders (cultures) for Nethone integration.
 *
 * @returns {boolean} If the passed in culture is valid.
 */
export const isValidCulture = (culture, validSubfolders) => {
  if (!culture) {
    utils.logger.error(
      '[Nethone] - "culture" not found. Please set the "culture" context (country code) via "analytics.useContext()".',
    );

    return false;
  }

  if (validSubfolders.indexOf(culture) === -1) {
    return false;
  }

  return true;
};

/**
 * List of events of interest for Nethone.
 */
export const events = {
  [eventTypes.SIGNUP_FORM_VIEWED]: {},
  [eventTypes.CHECKOUT_STEP_VIEWED]: {},
  [eventTypes.PLACE_ORDER_STARTED]: {},
};

/**
 * List of valid subfolders where Nethone can be applied.
 */
export const validSubfolders = [
  'US',
  'BR',
  'AL',
  'AD',
  'AT',
  'AZ',
  'BY',
  'BE',
  'BA',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'GE',
  'DE',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'KZ',
  'XK',
  'LV',
  'LI',
  'LT',
  'LU',
  'MK',
  'MT',
  'MD',
  'MC',
  'ME',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'RU',
  'SM',
  'RS',
  'SK',
  'SI',
  'ES',
  'SE',
  'CH',
  'TR',
  'UA',
  'UK',
  'VA',
];

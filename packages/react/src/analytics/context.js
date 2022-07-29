import { trackTypes } from '@farfetch/blackout-core/analytics';
import merge from 'lodash/merge';
import parse from 'url-parse';

/**
 * Adds web environment information to the context.
 *
 * @function webContext
 * @memberof module:analytics
 * @returns {object} Context object for web applications.
 */

let lastLocation =
  typeof document !== 'undefined' ? document.referrer : undefined;

/**
 * Returns the web context for the analytics package.
 *
 * @param {string} trackEventType - The type of the event being tracked.
 *
 * @returns {object} - The web context.
 */
export default function (trackEventType) {
  const pageLocationReferrer = lastLocation;
  const locationHref = window.location.href;
  const isPageEvent = trackEventType === trackTypes.PAGE;

  if (isPageEvent && lastLocation !== locationHref) {
    lastLocation = locationHref;
  }

  return {
    web: {
      window: {
        location: parse(locationHref, true),
        navigator: merge({}, window.navigator),
        screen: merge({}, window.screen),
      },
      document: {
        title: document.title,
        referrer: document.referrer,
      },
      // Since document.referrer stays the same on single page applications,
      // we have this alternative that will hold the previous page location
      // based on page track calls with `analyticsWeb.page()`.
      pageLocationReferrer: isPageEvent ? pageLocationReferrer : undefined,
    },
  };
}

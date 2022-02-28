/**
 * @module trackTypes
 * @category Analytics
 */

/**
 *
 * Analytics tracking event types.
 * These types are meant to be used whenever a call is made to an integration,
 * to send the proper type of event on the payload.
 */
const trackTypes = {
  /** Track is to be used for generic events. */
  TRACK: 'track',
  /** Page is to be used for page view events (Web platform-only). */
  PAGE: 'page',
  /** Screen is to be used for screen view events (Mobile platform-only). */
  SCREEN: 'screen',
};

export default trackTypes;

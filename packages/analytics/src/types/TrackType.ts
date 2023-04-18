/**
 * Analytics tracking event types. These types are meant to be used whenever a call
 * is made to an integration, to send the proper type of event on the payload.
 */
enum TrackType {
  /**
   * Track is to be used for generic events.
   */
  Track = 'track',
  /**
   * Page is to be used for page view events (Web platform-only).
   */
  Page = 'page',
  /**
   * Screen is to be used for screen view events (Mobile platform-only).
   */
  Screen = 'screen',
}

export default TrackType;

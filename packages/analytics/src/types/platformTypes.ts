/**
 * @module platformTypes
 * @category Analytics
 */

/**
 * The platform types supported by analytics.
 * These values are to be used in Analytics's constructor
 * and will be available under the platform property of the event
 * data that Analytics will generate for all Integrations registered.
 */
const platformTypes = {
  /** Mobile is to be used when running on a native app. Used by @farfetch/blackout-react-native-analytics facade. */
  Mobile: 'mobile',
  /** Web is to be used when running on a web app. Used by @farfetch/blackout-react/analytics facade. */
  Web: 'web',
};

export default platformTypes;

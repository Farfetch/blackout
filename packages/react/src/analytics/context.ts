import merge from 'lodash/merge';
import parse from 'url-parse';

export type WebContextType = {
  web: {
    window: {
      location: parse<Record<string, string | undefined>>;
      navigator: Navigator;
      screen: Screen;
    };
    document: {
      title: string;
      referrer: string;
    };
    pageLocationReferrer: string | undefined;
  };
};

let lastLocation =
  typeof document !== 'undefined' ? document.referrer : undefined;

/**
 * Returns the web context for the analytics package.
 *
 * @returns Context object for web applications.
 */
export const context = (): WebContextType => {
  const locationHref = window.location.href;

  if (lastLocation !== locationHref) {
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
      pageLocationReferrer: lastLocation,
    },
  };
};

export default context;

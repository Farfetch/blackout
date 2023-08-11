import { merge } from 'lodash-es';
import parse from 'url-parse';
import type { ContextData, utils } from '@farfetch/blackout-analytics';

export type WebContext = ContextData & {
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
  } & ProcessedContextWeb;
};

export type ProcessedContextWeb = {
  [utils.ANALYTICS_UNIQUE_VIEW_ID]?: string | null;
  [utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID]?: string | null;
  [utils.LAST_FROM_PARAMETER_KEY]?: string | null;
};

let lastLocation =
  typeof document !== 'undefined' ? document.referrer : undefined;

/**
 * Returns a partial object of web context for the analytics package.
 * The remaining properties will be added when the this context object gets processed
 * by analytics, adding the ProcessedContextWeb values.
 *
 * @returns Context object for web applications.
 */
const webContext = (): Partial<WebContext> => {
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

export default webContext;

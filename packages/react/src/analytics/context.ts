import { type ContextData, type utils } from '@farfetch/blackout-analytics';
import { merge } from 'lodash-es';
import parse from 'url-parse';

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
  } & ProcessedContextWeb;
};

export type ProcessedContextWeb = {
  [utils.ANALYTICS_UNIQUE_VIEW_ID]?: string | null;
  [utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID]?: string | null;
  [utils.LAST_FROM_PARAMETER_KEY]?: string | null;
  [utils.PAGE_LOCATION_REFERRER_KEY]?: string;
};

/**
 * Returns a partial object of web context for the analytics package.
 * The remaining properties will be added when the this context object gets processed
 * by analytics, adding the ProcessedContextWeb values.
 *
 * @returns Context object for web applications.
 */

const webContext = (): Partial<WebContext> => ({
  web: {
    window: {
      location: parse(window.location.href, true),
      navigator: merge({}, window.navigator),
      screen: merge({}, window.screen),
    },
    document: {
      title: document.title,
      referrer: document.referrer,
    },
  },
});

export default webContext;

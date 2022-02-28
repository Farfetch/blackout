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
  };
};

/**
 * Adds web environment information to the context.
 *
 * @function webContext
 * @memberof module:analytics
 * @returns Context object for web applications.
 */
export const context = (): WebContextType => {
  return {
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
  };
};

export default context;

import merge from 'lodash/merge';
import parse from 'url-parse';

/**
 * Adds web environment information to the context.
 *
 * @function webContext
 * @memberof module:analytics
 * @returns {object} Context object for web applications.
 */
export default function () {
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
}

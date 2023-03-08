import { merge } from 'lodash-es';
import context from '../context.js';
import parse from 'url-parse';

describe('context', () => {
  it('Should return a suitable context to be used in web applications', () => {
    const expectedContext = {
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
        pageLocationReferrer: window.location.href,
      },
    };

    const returnedContext = context();

    expect(returnedContext).toEqual(expectedContext);
  });
});

import context from '../context';
import merge from 'lodash/merge';
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
      },
    };

    const returnedContext = context();

    expect(returnedContext).toEqual(expectedContext);
  });
});

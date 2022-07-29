import { trackTypes } from '../../../../core/src/analytics';
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
        pageLocationReferrer: undefined,
      },
    };

    const returnedContext = context();

    expect(returnedContext).toEqual(expectedContext);
  });

  it('should return the correct pageLocationReferrer value when calls to the function are made between pages', async () => {
    const firstPageLocationReferrerMock = 'https://foo.bar.com/';
    const secondPageLocationReferrerMock = 'https://foo.bar.biz.com/';

    // starts with an empty value from document.referrer
    expect(context(trackTypes.PAGE).web.pageLocationReferrer).toEqual('');

    delete window.location;

    // simulate a URL change to the first page
    window.location = new URL(firstPageLocationReferrerMock);

    // expect that the pageLocationReferrer is the last one (which in this environment is localhost)
    expect(context(trackTypes.PAGE).web.pageLocationReferrer).toEqual(
      'http://localhost/',
    );

    delete window.location;

    // simulate a URL change to the second page
    window.location = new URL(secondPageLocationReferrerMock);

    // expect the pageLocationReferrer is the last one (first page)
    expect(context(trackTypes.PAGE).web.pageLocationReferrer).toEqual(
      firstPageLocationReferrerMock,
    );

    delete window.location;

    // simulate a URL change to the first page (back from the second)
    window.location = new URL(firstPageLocationReferrerMock);

    // expect the pageLocationReferrer is the last one (second page)
    expect(context(trackTypes.PAGE).web.pageLocationReferrer).toEqual(
      secondPageLocationReferrerMock,
    );
  });
});

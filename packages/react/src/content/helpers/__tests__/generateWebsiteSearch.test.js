import * as helpers from '../';
import websiteSearchResult from '../__fixtures__/websiteSearchResult.fixtures.json';

const metadata = {
  metatags: [],
};
const url = 'http://www.farfetch.com';
const searchTitle = 'Title';
const urlTemplate = 'http://www.farfetch.com/shopping?query=';

describe('generateWebsiteSearch', () => {
  it('should correctly generate JSON-LD for a WebsiteSearch', () => {
    const websiteSearch = helpers.generateWebsiteSearch(
      metadata,
      url,
      searchTitle,
      urlTemplate,
    );

    expect(websiteSearch).toMatchObject(websiteSearchResult);
  });
});

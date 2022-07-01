import {
  MockRenderScript,
  websiteSearch,
  websiteSearchResult,
} from './__fixtures__';
import structuredWebsiteSearch from '../structuredWebsiteSearch';

const { metadata, url, searchTitle, urlTemplate } = websiteSearch;

describe('structuredWebsiteSearch', () => {
  it('should correctly generate JSON-LD for a WebsiteSearch', () => {
    const renderStructuredWebsiteSearch = structuredWebsiteSearch(
      metadata,
      url,
      searchTitle,
      urlTemplate,
    );

    expect(renderStructuredWebsiteSearch).toEqual(
      MockRenderScript(JSON.stringify(websiteSearchResult)),
    );
  });
});

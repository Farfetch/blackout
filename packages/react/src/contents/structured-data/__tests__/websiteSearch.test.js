import { renderScriptTag } from '../../helpers';
import {
  websiteSearch,
  websiteSearchResult,
} from '../__fixtures__/websiteSearch.fixtures';
import structuredWebsiteSearch from '../websiteSearch';

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
      renderScriptTag(websiteSearchResult),
    );
  });
});

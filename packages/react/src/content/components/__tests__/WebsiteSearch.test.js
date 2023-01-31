import { render, waitFor } from '@testing-library/react';
import React from 'react';
// Components
import StructuredWebsiteSearch from '../WebsiteSearch';
// Fixtures
import {
  websiteSearch,
  websiteSearchResult,
} from '../__fixtures__/websiteSearch.fixtures';

describe('<WebsiteSearch />', () => {
  it('should render properly', async () => {
    const { metadata, url, searchTitle, urlTemplate } = websiteSearch;

    render(
      <StructuredWebsiteSearch
        metadata={metadata}
        url={url}
        searchTitle={searchTitle}
        urlTemplate={urlTemplate}
      />,
    );

    const scriptTag = await waitFor(
      () => document.getElementsByTagName('script')[0].innerHTML,
    );
    const scriptParsed = JSON.parse(scriptTag);

    expect(scriptParsed).toEqual(websiteSearchResult);
  });
});

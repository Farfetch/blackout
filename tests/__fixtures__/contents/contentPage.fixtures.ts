import { BlackoutError, ContentPageType } from '@farfetch/blackout-client';
import { generateContentHash } from '@farfetch/blackout-redux';

export const contentPagesType = ContentPageType.Listing;
export const slugContent = 'woman/gucci';
export const contentPagesQuery = {
  slug: slugContent,
};

const contentQuery = {
  codes: slugContent,
  contentTypeCode: 'content_pages',
};

export const contentPagesHash = generateContentHash(contentQuery);

export const mockContentPageEntry = {
  publicationId: 'dc9c0c95-9485-45c2-a76c-6923bb39b544',
  versionId: '78f1922d-0ef1-46ed-b02c-ca541d0a0d80',
  spaceCode: 'website',
  contentTypeCode: 'content_pages',
  environmentCode: 'live',
  code: 'LISTING_gender_0/brand_5030844/category_136643',
  target: {
    contentzone: '10674',
  },
  metadata: {
    custom: {
      none: '',
      id: '',
      gender: '0',
      brand: '5030844',
      category: '136643',
      slug: '',
      priceType: '0',
      sku: '',
      type: 'LISTING',
      eventDate: '0001-01-01T00:00:00Z',
    },
  },
  publicationDate: '2021-08-20T15:40:39.0000132Z',
  components: [
    {
      type: 'custom',
      fields: {
        title: {
          type: 'text',
          value: 'Commerce Page',
          name: 'test',
          displayOptions: {},
        },
        content: {
          type: 'html',
          name: 'Listing Page Description 1',
          displayOptions: {},
          content:
            '<p>What was once a keepsake from an island getaway has now become a permanent fixture in your jewellery collection thanks to Gigi Clozeau. Browsing her collection of anklets will keep you in the holiday mood all year round, so much so, you&#39;ll want one in every colour for every destination. Crafted from 18K gold, these delicate chains are perfectly accented with the addition of her signature resin beads in a mix of tropical colours. Browse Gigi Clozeau body jewellery below to be <em>vacay</em> ready at all times.</p>',
        },
      },
      customType: 'article',
      name: 'article',
      displayOptions: {},
    },
  ],
};

export const mockContentPage = {
  number: 1,
  totalItems: 1,
  totalPages: 1,
  entries: [mockContentPageEntry],
};

export const expectedContentPageNormalizedPayload = {
  entities: {},
  result: {
    ...mockContentPage,
    entries: [mockContentPage.entries[0]?.publicationId],
  },
  hash: 'content_pages!woman/gucci',
};

export const mockContentPageInitialState = {
  entities: {},
  contents: {
    searchResults: {},
    contentTypes: {
      isLoading: false,
    },
    metadata: {
      error: {},
      isLoading: {},
      result: {},
    },
  },
};

export const mockContentPageLoadingState = {
  entities: {},
  contents: {
    ...mockContentPageInitialState.contents,
    searchResults: {
      [contentPagesHash]: {
        isLoading: true,
        error: null,
      },
    },
  },
};

export const mockContentPageErrorState = {
  entities: {},
  contents: {
    ...mockContentPageInitialState.contents,
    searchResults: {
      [contentPagesHash]: {
        isLoading: false,
        error: new Error('Error') as BlackoutError,
      },
    },
  },
};

export const mockContentPageWithDataState = {
  entities: {
    contents: {
      [mockContentPageEntry.publicationId]: {
        ...mockContentPageEntry,
        publicationDate: 0,
        metadata: {
          ...mockContentPageEntry.metadata,
          custom: {
            ...mockContentPageEntry.metadata.custom,
            eventDate: 0,
          },
        },
      },
    },
  },
  contents: {
    ...mockContentPageInitialState.contents,
    searchResults: {
      [contentPagesHash]: {
        isLoading: false,
        error: null,
        result: {
          hash: contentPagesHash,
          ...mockContentPage,
          entries: [mockContentPageEntry.publicationId],
        },
      },
    },
  },
};

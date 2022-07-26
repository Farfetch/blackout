import { buildContentGroupHash } from '@farfetch/blackout-core/contents/utils';

export const contentQuery = {
  spaceCode: 'website',
  environmentCode: 'live',
  codes: ['cttpage,boutiques'],
  contentTypeCode: 'pages',
};

export const widgetQuery = {
  spaceCode: 'website',
  environmentCode: 'live',
  codes: 'newsletter-terms-and-conditions-widget',
  contentTypeCode: 'widgets',
};

export const navbarsQuery = {
  spaceCode: 'website',
  environmentCode: 'live',
  codes: 'footer',
  contentTypeCode: 'navbars',
};

export const contentTypeQuery = {
  spaceCode: 'website',
  environmentCode: 'live',
  contentTypeCode: 'careers',
};

export const contentTypeQueryWithCodes = {
  spaceCode: 'website',
  environmentCode: 'live',
  codes: 'test-career',
  contentTypeCode: 'careers',
};

export const params = {
  countryCode: 'US',
  cultureCode: 'en-US',
};

export const contentHash = buildContentGroupHash(contentQuery);
export const widgetHash = buildContentGroupHash(widgetQuery);
export const navbarsHash = buildContentGroupHash(navbarsQuery);
export const contentTypeHash = buildContentGroupHash(contentTypeQuery);
export const contentTypeHashWithCodes = buildContentGroupHash(
  contentTypeQueryWithCodes,
);

export const mockContents = {
  number: 1,
  totalPages: 1,
  totalItems: 2,
  entries: [
    {
      publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
      versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
      spaceCode: 'website',
      contentTypeCode: 'pages',
      environmentCode: 'live',
      id: undefined,
      code: 'cttpage',
      target: {
        contentzone: '10674',
      },
      components: [
        {
          type: 'html',
          content: '',
          name: 'QA HTML Template',
          displayOptions: {},
        },
      ],
    },
    {
      publicationId: '01b7783c-1b9d-4d5d-915b-17a30c85082d',
      versionId: '8402918c-b859-4b5b-8192-d83809bae1d0',
      spaceCode: 'website',
      contentTypeCode: 'pages',
      environmentCode: 'live',
      id: undefined,
      code: 'boutiques',
      target: {
        contentzone: '10674',
      },
      components: [
        {
          type: 'list',
          components: [
            {
              type: 'custom',
              fields: {
                title: {
                  type: 'text',
                  value: 'Browns South Molton Street',
                  name: 'Title',
                  displayOptions: {},
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export const mockWidget = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      publicationId: 'daada313-7908-46c8-8ea8-ad2263b41b43',
      versionId: 'd5e5b26c-de10-4e36-b22d-3bb9171868d4',
      spaceCode: 'website',
      contentTypeCode: 'widgets',
      environmentCode: 'preview',
      id: undefined,
      code: 'newsletter-terms-and-conditions-widget',
      target: {
        language: 'en-US',
      },
      publicationDate: '2020-07-31T08:25:58.696Z',
      components: [
        {
          type: 'html',
          content:
            '<p>By clicking Sign Up, you agree to our Terms and Conditions Privacy Cookies Policy.</p>',
          name: 'widget',
          displayOptions: {},
        },
      ],
    },
  ],
};

export const mockNavbars = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      publicationId: '7317888f-c8ea-4770-98b3-232961af741b',
      versionId: '03a24282-83e2-4679-aca6-d6df056b59f1',
      spaceCode: 'website',
      contentTypeCode: 'navbars',
      environmentCode: 'preview',
      id: undefined,
      code: 'footer',
      target: {
        language: 'en-GB',
      },
      publicationDate: '2021-02-11T15:10:26.9469156Z',
      components: [
        {
          type: 'custom',
          fields: {
            title: {
              type: 'text',
              value: 'About White Label',
              name: 'Title',
              displayOptions: {},
            },
            subtitle: {
              type: 'text',
              name: 'Subtitle',
              displayOptions: {},
            },
            link: {
              type: 'text',
              value: '/about',
              name: 'Link',
              displayOptions: {},
            },
            categoryId: {
              type: 'text',
              name: 'CategoryId',
              displayOptions: {},
            },
            linkType: {
              type: 'text',
              name: 'LinkType',
              displayOptions: {},
            },
            openLinkInNewTab: {
              type: 'bool',
              value: false,
              name: 'OpenLinkInNewTab',
              displayOptions: {},
            },
            role: {
              type: 'text',
              name: 'Role',
              displayOptions: {},
            },
            nodeType: {
              type: 'text',
              value: 'Group',
              name: 'NodeType',
              displayOptions: {},
            },
            visualizationProperties: {
              type: 'list',
              components: [],
              name: 'VisualizationProperties',
              displayOptions: {},
            },
          },
          customType: 'navbarNode',
          name: 'Node',
          displayOptions: {},
        },
      ],
    },
  ],
};

export const mockContentType = {
  number: 1,
  totalPages: 1,
  totalItems: 2,
  entries: [
    {
      publicationId: '6fc6f3c1-ae2b-44d3-abec-54f0b679b19f',
      versionId: '6f9fbc9c-fb8b-4b1a-b181-e4cf52e01264',
      spaceCode: 'website',
      contentTypeCode: 'careers',
      environmentCode: 'preview',
      id: undefined,
      code: 'career-test',
      target: {
        language: 'en-GB',
      },
      publicationDate: '2020-05-14T14:26:13.692Z',
      components: [
        {
          type: 'text',
          value: 'Career Page Title',
          name: 'Title',
          displayOptions: {},
        },
        {
          type: 'html',
          content: '<p>Here you can add some text to explain the Career</p>',
          name: 'Description',
          displayOptions: {},
        },
      ],
    },
    {
      publicationId: '7255bc1f-517f-4c7d-bfdb-6e10fe037c68',
      versionId: '4453bf3f-dafc-4f8b-a602-af02c42abb91',
      spaceCode: 'website',
      contentTypeCode: 'careers',
      environmentCode: 'preview',
      id: undefined,
      code: 'test-career',
      target: {
        language: 'en-GB',
      },
      publicationDate: '2020-05-11T17:22:44.375Z',
      components: [
        {
          type: 'text',
          value: 'Career',
          name: 'Title',
          displayOptions: {},
        },
        {
          type: 'html',
          content: '<p>Career test</p>',
          name: 'Description',
          displayOptions: {},
        },
      ],
    },
  ],
};

export const mockModel = {
  slug: '/cttpage',
  subfolder: '/',
  searchContentRequests: [
    {
      filters: {
        spaceCode: 'website',
        codes: ['cttpage', 'boutiques'],
        contentTypeCode: 'pages',
        environmentCode: 'live',
        sort: 'publicationDate:desc',
        target: {},
        searchTags: [],
        metadataCustom: {},
      },
      searchResponse: mockContents,
    },
    {
      filters: {
        spaceCode: 'website',
        codes: 'newsletter-terms-and-conditions-widget',
        contentTypeCode: 'widgets',
        environmentCode: 'live',
        sort: 'publicationDate:desc',
        target: {},
        searchTags: [],
        metadataCustom: {},
      },
      searchResponse: mockWidget,
    },
    {
      filters: {
        spaceCode: 'website',
        codes: 'footer',
        contentTypeCode: 'navbars',
        environmentCode: 'live',
        sort: 'publicationDate:desc',
        target: {},
        searchTags: [],
        metadataCustom: {},
      },
      searchResponse: mockNavbars,
    },
    {
      filters: {
        spaceCode: 'website',
        contentTypeCode: 'careers',
        environmentCode: 'live',
        sort: 'publicationDate:desc',
        target: {},
        searchTags: [],
        metadataCustom: {},
      },
      searchResponse: mockContentType,
    },
    {
      filters: {
        spaceCode: 'website',
        codes: 'test-career',
        contentTypeCode: 'careers',
        environmentCode: 'live',
        sort: 'publicationDate:desc',
        target: {},
        searchTags: [],
        metadataCustom: {},
      },
      searchResponse: {
        number: 1,
        totalItems: 1,
        totalPages: 1,
        entries: [mockContentType.entries[1]],
      },
    },
  ],
  seoMetadata: {
    title: 'Whitelabel',
    h1: "Men's & Women's Designer Fashion",
    canonicalUrl: 'https://blackandwhite-ff.com',
  },
};

export const expectedNormalizedPayload = {
  entities: {
    contentGroups: {
      [contentHash]: {
        hash: contentHash,
        number: 1,
        totalPages: 1,
        totalItems: 2,
        entries: [
          mockContents.entries[0].publicationId,
          mockContents.entries[1].publicationId,
        ],
      },
      [widgetHash]: {
        hash: widgetHash,
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [mockWidget.entries[0].publicationId],
      },
      [navbarsHash]: {
        hash: navbarsHash,
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [mockNavbars.entries[0].publicationId],
      },
      [contentTypeHash]: {
        hash: contentTypeHash,
        number: 1,
        totalPages: 1,
        totalItems: 2,
        entries: [
          mockContentType.entries[0].publicationId,
          mockContentType.entries[1].publicationId,
        ],
      },
      [contentTypeHashWithCodes]: {
        hash: contentTypeHashWithCodes,
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [mockContentType.entries[1].publicationId],
      },
    },
    contents: {
      [mockContents.entries[0].publicationId]: {
        ...mockContents.entries[0],
      },
      [mockContents.entries[1].publicationId]: {
        ...mockContents.entries[1],
      },
      [mockWidget.entries[0].publicationId]: {
        ...mockWidget.entries[0],
      },
      [mockNavbars.entries[0].publicationId]: {
        ...mockNavbars.entries[0],
      },
      [mockContentType.entries[0].publicationId]: {
        ...mockContentType.entries[0],
      },
      [mockContentType.entries[1].publicationId]: {
        ...mockContentType.entries[1],
      },
    },
  },
  contents: {
    isLoading: {
      'careers!all!1': false,
      'careers!test-career!1': false,
      'navbars!footer!1': false,
      'pages!cttpage,boutiques!1': false,
      'widgets!newsletter-terms-and-conditions-widget!1': false,
    },
    error: {},
    metadata: {
      error: {},
      isLoading: {
        'pages!/cttpage': false,
      },
      result: {
        'pages!/cttpage': {
          ...mockModel.seoMetadata,
        },
      },
    },
  },
};

export const mockContentsInitialState = {
  entities: {},
  contents: {
    isLoading: {},
    error: {},
  },
};

export const mockContentsLoadingState = {
  entities: {},
  contents: {
    isLoading: {
      'careers!all!1': true,
      'navbars!footer!1': true,
      'pages!cttpage,boutiques!1': true,
      'widgets!newsletter-terms-and-conditions-widget!1': true,
    },
    error: {},
  },
};

export const mockContentsErrorState = {
  entities: {},
  contents: {
    isLoading: {
      'careers!all!1': false,
      'navbars!footer!1': false,
      'pages!cttpage,boutiques!1': false,
      'widgets!newsletter-terms-and-conditions-widget!1': false,
    },
    error: {
      'careers!all!1': {
        message: 'Error',
      },
      'navbars!footer!1': {
        message: 'Error',
      },
      'pages!cttpage,boutiques!1': {
        message: 'Error',
      },
      'widgets!newsletter-terms-and-conditions-widget!1': {
        message: 'Error',
      },
    },
  },
};

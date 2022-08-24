import { generateContentHash } from '@farfetch/blackout-redux/src/contents/utils';

export const contentPublicationId = '1fa65fb0-49bf-43b3-902e-78d104f160a3';

export const contentQuery = {
  spaceCode: 'website',
  environmentCode: 'live',
  codes: 'cttpage',
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

export const contentHash = generateContentHash(contentQuery);
export const widgetHash = generateContentHash(widgetQuery);
export const navbarsHash = generateContentHash(navbarsQuery);
export const contentTypeHash = generateContentHash(contentTypeQuery);
export const contentTypeHashWithCodes = generateContentHash(
  contentTypeQueryWithCodes,
);

export const mockContents = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      code: 'cttpage',
      components: [
        {
          content: '<p>Content test</p>',
          displayOptions: {},
          name: 'QA HTML Template',
          type: 'html',
        },
      ],
      contentTypeCode: 'pages',
      environmentCode: 'live',
      id: undefined,
      publicationId: contentPublicationId,
      publicationDate: '2020-11-25T15:31:22.619Z',
      metadata: {
        custom: {},
      },
      spaceCode: 'website',
      target: {
        contentzone: '10674',
      },
      versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
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
        country: 'EN',
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

export const mockContentResult = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [contentPublicationId],
};

export const contentNormalizedPayload = {
  entities: {
    contents: {
      [contentPublicationId]: {
        ...mockContents.entries[0],
      },
    },
  },
  result: {
    hash: contentHash,
    ...mockContentResult,
  },
};

export const expectedNormalizedPayload = {
  contents: {
    searchResults: {
      [contentHash]: {
        error: null,
        isLoading: false,
        result: {
          ...contentNormalizedPayload.result,
        },
      },
      [widgetHash]: {
        error: null,
        isLoading: false,
        result: {
          entries: ['daada313-7908-46c8-8ea8-ad2263b41b43'],
          hash: widgetHash,
          number: 1,
          totalItems: 1,
          totalPages: 1,
        },
      },
      [navbarsHash]: {
        error: null,
        isLoading: false,
        result: {
          entries: ['7317888f-c8ea-4770-98b3-232961af741b'],
          hash: navbarsHash,
          number: 1,
          totalItems: 1,
          totalPages: 1,
        },
      },
      [contentTypeHash]: {
        error: null,
        isLoading: false,
        result: {
          // We will need to fix this duplication when the codes is 'all'
          entries: [
            '6fc6f3c1-ae2b-44d3-abec-54f0b679b19f',
            '7255bc1f-517f-4c7d-bfdb-6e10fe037c68',
          ],
          hash: contentTypeHash,
          number: 1,
          totalItems: 2,
          totalPages: 1,
        },
      },
      [contentTypeHashWithCodes]: {
        error: null,
        isLoading: false,
        result: {
          entries: ['7255bc1f-517f-4c7d-bfdb-6e10fe037c68'],
          hash: contentTypeHashWithCodes,
          number: 1,
          totalItems: 1,
          totalPages: 1,
        },
      },
    },
  },
  entities: {
    contents: {
      [contentPublicationId]: mockContents.entries[0],
      'daada313-7908-46c8-8ea8-ad2263b41b43': mockWidget.entries[0],
      '7317888f-c8ea-4770-98b3-232961af741b': mockNavbars.entries[0],
      '6fc6f3c1-ae2b-44d3-abec-54f0b679b19f': mockContentType.entries[0],
      '7255bc1f-517f-4c7d-bfdb-6e10fe037c68': mockContentType.entries[1],
    },
  },
};

export const mockModel = {
  searchContentRequests: [
    {
      filters: {
        spaceCode: 'website',
        codes: ['cttpage'],
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
        codes: ['newsletter-terms-and-conditions-widget'],
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
        codes: ['footer'],
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
};

export const mockContentsInitialState = {
  entities: {},
  contents: {
    searchResults: {},
  },
};

export const mockContentsLoadingState = {
  entities: {},
  contents: {
    searchResults: {
      [contentHash]: {
        isLoading: true,
      },
    },
  },
};

export const mockContentsErrorState = {
  entities: {},
  contents: {
    searchResults: {
      [contentHash]: {
        isLoading: false,
        error: {
          message: 'Error',
        },
      },
    },
  },
};

export const mockLegacyData = {
  components: [
    {
      type: 'text',
      value: 'test',
      name: 'Text',
      displayOptions: {},
    },
  ],
};

export const mockContentToolData = {
  components: [
    {
      type: 'list',
      components: [
        {
          type: 'list',
          components: [
            {
              type: 'text',
              value: 'test',
              name: 'Text',
              displayOptions: {},
            },
          ],
          name: 'subsection',
          displayOptions: {},
        },
      ],
      name: 'section',
      displayOptions: {},
    },
  ],
};

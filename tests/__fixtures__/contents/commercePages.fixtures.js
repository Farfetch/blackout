import { buildContentGroupHash } from '@farfetch/blackout-core/contents/utils';

export const commercePagesQuery = {
  type: 'LISTING',
  gender: 0,
  brand: 5030844,
  category: 136643,
};

export const commercePagesHash = buildContentGroupHash(commercePagesQuery);

export const mockCommercePages = {
  number: 1,
  totalPages: 1,
  totalItems: 2,
  entries: [
    {
      publicationId: 'dc9c0c95-9485-45c2-a76c-6923bb39b544',
      versionId: '78f1922d-0ef1-46ed-b02c-ca541d0a0d80',
      spaceCode: 'website',
      contentTypeCode: 'commerce_pages',
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
          type: 'text',
          name: 'Title',
          displayOptions: {},
        },
        {
          type: 'html',
          content:
            '<p>With delicate jewellery being her signature, Gigi Clozeau fine earrings are minature masterpieces. Taking inspiration from her beaded necklaces and bracelets, Gigi creates chain link huggie hoops using the same tiny resin beads, alongside diamond studs that can be worn as a pair or sepearately for a unique curated ear.</p>',
          name: 'Listing Page Description',
          displayOptions: {},
        },
      ],
    },
    {
      publicationId: '264cb62c-04fe-4d54-a347-a9299568a227',
      versionId: 'ce6b7c20-93cf-4f44-b80e-8447d0320f47',
      spaceCode: 'website',
      contentTypeCode: 'commerce_pages',
      environmentCode: 'live',
      code: 'LISTING_gender_0/brand_5030844',
      target: {
        contentzone: '10674',
      },
      metadata: {
        custom: {
          none: '',
          id: '',
          gender: '0',
          brand: '5030844',
          category: '',
          slug: '',
          priceType: '',
          sku: '',
          type: 'LISTING',
          eventDate: '0001-01-01T00:00:00Z',
        },
      },
      publicationDate: '2021-08-20T15:38:20.6658783Z',
      components: [
        {
          type: 'text',
          name: 'Title 2',
          displayOptions: {},
        },
        {
          type: 'html',
          content:
            '<p>What was once a keepsake from an island getaway has now become a permanent fixture in your jewellery collection thanks to Gigi Clozeau. Browsing her collection of anklets will keep you in the holiday mood all year round, so much so, you&#39;ll want one in every colour for every destination. Crafted from 18K gold, these delicate chains are perfectly accented with the addition of her signature resin beads in a mix of tropical colours. Browse Gigi Clozeau body jewellery below to be <em>vacay</em> ready at all times.</p>',
          name: 'Listing Page Description 2',
          displayOptions: {},
        },
      ],
    },
  ],
};

export const expectedCommercePagesNormalizedPayload = {
  entities: {
    contentGroups: {
      [commercePagesHash]: {
        hash: commercePagesHash,
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [mockCommercePages.entries[0].publicationId],
      },
    },
    contents: {
      [mockCommercePages.entries[0].publicationId]: {
        ...mockCommercePages.entries[0],
      },
    },
  },
  contents: {
    isLoading: {
      [commercePagesHash]: false,
    },
    error: {},
  },
};

export const defaultStrategyResult = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      ...mockCommercePages.entries[0],
      ranking: 1000010110,
    },
  ],
};

export const mergeStrategyResult = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      ...mockCommercePages.entries[0],
      components: [].concat(
        mockCommercePages.entries[0].components,
        mockCommercePages.entries[1].components,
      ),
    },
  ],
};

export const mockAddressId = '05f94e7d-9e41-4ce9-aa91-77b31d5b562d';
export const mockBagId = 'f0064b5b-f5f2-4008-a7cb-29f6b1fca8b7';
export const mockBagItemId = 50598056;
export const mockBagProductId = 12912485;
export const mockBrandId = 6326412;
export const mockBookAnAppointmentFormCode = 'book-an-appointment';
export const mockCategoryId = 135967;
export const mockCountryId = 165;
export const mockDesignerResultHash = 122333;
export const mockFacetId = 'colors_1';
export const mockListingHash =
  '/en-pt/shopping?pageindex=3&sort=price&sortdirection=asc';
export const mockMerchantLocationId = 112233;
export const mockOrderId = 'GBTD8M';
export const mockOrderItemId = 31783868;
export const mockProductDetailsId = 1234567;
export const mockProductId = 12913174;
export const mockRecommendationId = '11111';
export const mockRecommendationsStrategy = 'fpswhitelabel_pdp_generic_a';
export const mockRecommendedSetId = 57401;
export const mockPostPurchaseFormCode = 'post-purchase';
export const mockSetId = 202382;
export const mockSetId2 = 176836;
export const mockSizeScaleId = 117;
export const mockSubscriptionPackageId = 'Newsletter';
export const mockUserId = '987654321';
export const mockUserSubscriptionId = '2';
export const mockUserSubscriptionEmailAddress = 'test@acme.com';
export const mockUserSubscriptionSmsAddress = '911111111';
export const mockUserSubscriptionWithSms = {
  type: 'Sale',
  channels: [
    {
      platform: 'sms',
      address: mockUserSubscriptionSmsAddress,
      source: 'Preferences',
    },
  ],
};
export const mockUserSubscriptionWithEmail = {
  type: 'BackInStock',
  channels: [
    {
      platform: 'email',
      address: mockUserSubscriptionEmailAddress,
      source: 'Preferences',
    },
  ],
};

export const mockVariantId = '111';
export const mockWishlistId = '8ea6dba4-ca23-4daa-9f0f-d34ba3d91634';
export const mockWishlistItemId = 4568785454;
export const mockWishlistProductId = 4544564654;
export const mockWishlistSetId = '50408d1f-8541-49a6-be2e-64c3c267e237';
export const mockWishlistSetName = 'This is a set';
export const mockWishlistSetDescription = 'This is a set description';

// This will be used for the regular listing and as "parent listing", because of
// the disabled filters
export const mockListingEntity = {
  breadCrumbs: [
    {
      text: 'Woman',
      slug: 'woman',
      link: 'shopping/woman',
    },
  ],
  config: {
    pageSize: 20,
  },
  facetGroups: [
    {
      deep: 0,
      description: 'Colors',
      dynamic: 0,
      format: 'multiple',
      key: 'colors',
      type: 11,
      values: [[mockFacetId, 'colors_7']],
    },
    {
      deep: 0,
      description: 'Brands',
      dynamic: 0,
      format: 'autocomplete',
      key: 'brands',
      type: 0,
      values: [['brands_16', 'brands_17']],
    },
    {
      deep: 1,
      description: 'Categories',
      dynamic: 0,
      format: 'hierarchical',
      key: 'categories',
      type: 6,
      values: [['categories_135973', `categories_${mockCategoryId}`]],
    },
    {
      deep: 2,
      description: 'Categories',
      dynamic: 0,
      format: 'hierarchical',
      key: 'categories',
      type: 6,
      values: [['categories_135979']],
    },
    {
      deep: 2,
      description: 'Categories',
      dynamic: 0,
      format: 'hierarchical',
      key: 'categories',
      type: 6,
      values: [['categories_136001']],
    },
    {
      deep: 3,
      description: 'Categories',
      dynamic: 0,
      format: 'hierarchical',
      key: 'categories',
      type: 6,
      values: [['categories_136189']],
    },
    {
      deep: 0,
      description: 'Leg length',
      dynamic: 11,
      format: 'multiple',
      key: 'attributes',
      type: 7,
      values: [['attributes_21']],
    },
    {
      deep: 0,
      description: 'SizesByCategory',
      dynamic: 136330,
      format: 'multiple',
      key: 'sizesbycategory',
      order: 8,
      type: 24,
      values: [['sizesbycategory_17_136330', 'sizesbycategory_18_136330']],
    },
    {
      deep: 0,
      description: 'Price',
      dynamic: 0,
      format: 'range',
      key: 'price',
      type: 10,
      values: [['price_239_1802']],
    },
    {
      deep: 0,
      description: 'Discount',
      dynamic: 0,
      format: 'multiple',
      key: 'discount',
      type: 18,
      values: [
        [
          'discount_0',
          'discount_0_30',
          'discount_30_50',
          'discount_50_60',
          'discount_60_100',
        ],
      ],
    },
  ],
  filterSegments: [
    {
      deep: 0,
      description: 'Woman',
      fromQueryString: false,
      gender: null,
      key: 'gender',
      negativeFilter: false,
      order: 0,
      parentId: 0,
      slug: 'woman',
      type: 2,
      value: 0,
      valueUpperBound: 0,
    },
    {
      deep: 1,
      description: 'Clothing',
      fromQueryString: false,
      gender: 0,
      key: 'categories',
      negativeFilter: false,
      order: 0,
      parentId: 0,
      slug: 'clothing',
      type: 6,
      value: mockCategoryId,
      valueUpperBound: 0,
    },
    {
      order: 0,
      type: 10,
      key: 'price',
      gender: null,
      value: 300,
      valueUpperBound: 1802,
      slug: null,
      description: null,
      deep: 0,
      parentId: 0,
      fromQueryString: true,
      negativeFilter: false,
    },
  ],
  hash: mockListingHash,
  name: null,
  products: {
    entries: [mockProductId],
    number: 1,
    totalItems: 40,
    totalPages: 2,
  },
};

const initialReduxState = {
  account: {
    user: {
      isAuthenticated: false,
    },
  },
  addresses: {
    predictions: {
      result: [
        {
          id: 'PT|TT|A|16200000119399|1312',
          text: 'Rua das Estrelas Azuis 1312',
          description: 'Comenda, 6040 Gavião',
          type: 'Address',
        },
        {
          id: 'PT|TT|POR|PORTALEGRE-GAVIÃO-COMENDA',
          text: 'Comenda',
          description: 'Gavião - 2654 Addresses',
          type: 'District',
        },
      ],
      error: null,
      isLoading: false,
    },
    predictionDetails: {
      result: {
        streetName: 'Rua do Passo',
        buildingNumber: '',
        addressLine1: 'Rua do Passo',
        addressLine2: 'Bastuço São João',
        districtName: 'Bastuço São João',
        cityName: 'Barcelos',
        provinceName: 'Braga',
        postalCode: '4755-515',
        countryName: 'Portugal',
      },
      error: null,
      isLoading: false,
    },
  },
  authentication: {
    register: {},
  },
  app: {
    seo: {
      title: null,
    },
  },
  bag: {
    error: {},
    result: {
      bagSummary: {
        currency: 'USD',
        currencySymbol: '$',
        dateCreated: '/Date(1534759345364)/',
        dateUpdated: '/Date(1562573175001)/',
        grandTotal: 381.62,
        subTotalAmount: 371.62,
        subTotalAmountExclTaxes: 371.62,
        totalDiscount: 0,
        totalShippingFee: 10,
        totalTaxes: 0,
        formattedGrandTotal: '$381.62',
        formattedSubTotalAmount: '$371.62',
        formattedSubTotalAmountExclTaxes: '$371.62',
        formattedTotalDiscount: '$0',
        formattedTotalShippingFee: '$10',
        formattedTotalTaxes: '$0',
        taxType: 'DDP',
      },
      count: 1,
      hadUnavailableItems: false,
      id: mockBagId,
    },
    id: mockBagId,
    isLoading: false,
    items: {
      ids: [mockBagItemId],
      item: {
        error: {},
        isLoading: {},
      },
    },
  },
  categories: {
    isLoading: false,
    error: null,
    top: [135972, 135973, 137116, 137117],
  },
  commerce: {
    payments: {
      methods: {
        isLoading: false,
        available: [],
      },
    },
    checkout: {
      order: {
        isLoading: false,
      },
    },
  },
  contents: {
    searchResults: {
      'navbars!customerService': {
        error: null,
        isLoading: false,
        result: {
          hash: 'navbars!customerService',
          number: 1,
          totalItems: 1,
          totalPages: 1,
          entries: ['navbars!customerService'],
        },
      },
    },
    contentTypes: {
      error: {},
      isLoading: {},
      result: ['navbars'],
    },
    metadata: {
      error: {},
      isLoading: {},
      result: null,
    },
  },
  designers: {
    isLoading: {
      [mockDesignerResultHash]: false,
    },
    hash: mockDesignerResultHash,
    error: {
      [mockDesignerResultHash]: null,
    },
  },
  details: {
    attributes: {
      error: {},
      isLoading: {},
    },
    fittings: {
      error: {},
      isLoading: {},
    },
    colorGrouping: {
      currentPageIndex: {},
      error: {},
      isLoading: {},
    },
    sizes: {
      isLoading: {},
      error: {},
    },
    error: {},
    id: mockProductDetailsId,
    isLoading: {
      [mockProductDetailsId]: false,
    },
    isHydrated: {
      [mockProductDetailsId]: true,
    },
    measurements: {
      isLoading: {},
    },
    recommendedSets: {
      error: {},
      isLoading: {},
    },
    sets: {
      error: {},
      isLoading: {},
    },
    sizeguides: {
      isLoading: {},
    },
    sizeScale: {
      isLoading: {},
    },
    merchantsLocations: {
      isLoading: {},
    },
  },
  editorial: {},
  entities: {
    countryAddressSchemas: {
      [mockCountryId]: {
        addressSchemaLines: [
          {
            name: 'FirstName',
            position: 0,
            type: 'FreeText',
            validationRegex: '^.{1,45}$',
            apiMapping: 'FirstName',
            isMandatory: true,
            maxLength: 45,
            minLength: 1,
            column: 0,
            row: 0,
          },
          {
            name: 'LastName',
            position: 0,
            type: 'FreeText',
            validationRegex: '^.{1,45}$',
            apiMapping: 'LastName',
            isMandatory: true,
            maxLength: 45,
            minLength: 1,
            column: 1,
            row: 0,
          },
          {
            name: 'StreetLine1',
            position: 1,
            type: 'FreeText',
            validationRegex: '^.{1,250}$',
            apiMapping: 'AddressLine1',
            isMandatory: true,
            maxLength: 250,
            minLength: 1,
            column: 0,
            row: 1,
          },
          {
            name: 'StreetLine2',
            position: 2,
            type: 'FreeText',
            validationRegex: '^.{0,500}$',
            apiMapping: 'AddressLine2',
            isMandatory: false,
            maxLength: 500,
            minLength: 0,
            column: 0,
            row: 2,
          },
          {
            name: 'StreetLine3',
            position: 3,
            type: 'FreeText',
            validationRegex: '^.{0,250}$',
            apiMapping: 'AddressLine3',
            isMandatory: false,
            maxLength: 250,
            minLength: 0,
            column: 0,
            row: 3,
          },
          {
            name: 'AdministrativeArea',
            position: 4,
            type: 'FreeText',
            validationRegex: '^.{1,150}$',
            apiMapping: 'City',
            isMandatory: true,
            maxLength: 150,
            minLength: 1,
            column: 0,
            row: 4,
          },
          {
            name: 'Municipality',
            position: 4,
            type: 'FreeText',
            validationRegex: '^.{0,150}$',
            apiMapping: 'State',
            isMandatory: false,
            maxLength: 150,
            minLength: 0,
            column: 1,
            row: 4,
          },
          {
            name: 'PostalCode',
            position: 5,
            type: 'FreeText',
            validationRegex: '^.{1,50}$',
            apiMapping: 'ZipCode',
            isMandatory: true,
            maxLength: 50,
            minLength: 1,
            column: 0,
            row: 5,
          },
          {
            name: 'Phone',
            position: 5,
            type: 'PhoneNumber',
            validationRegex:
              '^(?=.{1,50}$)^(?!.*([\\s\\+\\-\\#\\*\\.\\(\\)\\[\\]])\\1)([\\d\\s\\+\\-\\#\\*\\.\\(\\)\\[\\]])+$',
            apiMapping: 'Phone',
            isMandatory: true,
            maxLength: 50,
            minLength: 1,
            column: 1,
            row: 5,
          },
        ],
      },
    },
    addresses: {
      [mockAddressId]: {
        addressLine1: 'Foo street',
        addressLine2: 'Bar thing, line 2',
        city: {
          countryId: 0,
          id: 3,
          name: 'Biz city',
          stateId: null,
        },
        country: {
          alpha2Code: 'PT',
          alpha3Code: 'PRT',
          culture: 'pt-PT',
          id: 165,
          name: 'Portugal',
          nativeName: 'Portugal',
          region: 'Europe',
          subRegion: null,
          regionId: 0,
          subfolder: '/en-pt',
          continentId: 3,
        },
        ddd: null,
        title: null,
        firstName: 'First Name',
        id: mockAddressId,
        lastName: 'Last Name',
        neighbourhood: null,
        phone: '+999999999',
        state: {
          code: null,
          countryId: 0,
          id: 4,
          name: 'Barbiz state',
        },
        vatNumber: '95489652',
        zipCode: '0000-000',
        userId: 6,
        isCurrentBilling: true,
        isCurrentShipping: true,
        isCurrentPreferred: true,
        customsClearanceCode: null,
      },
      '47bcee74-2abc-4a7f-b9bd-cae7147b58a7': {
        addressLine1: 'Another street',
        addressLine2: 'THE line 2',
        city: {
          countryId: 0,
          id: 0,
          name: 'Biz city',
          stateId: null,
        },
        country: {
          alpha2Code: 'PT',
          alpha3Code: 'PRT',
          culture: 'pt-PT',
          id: 165,
          name: 'Portugal',
          nativeName: 'Portugal',
          region: 'Europe',
          subRegion: null,
          regionId: 0,
          subfolder: '/en-pt',
          continentId: 3,
        },
        ddd: null,
        title: null,
        firstName: 'First Name',
        id: '47bcee74-2abc-4a7f-b9bd-cae7147b58a7',
        lastName: 'Last Name',
        neighbourhood: null,
        phone: '+999999999',
        state: {
          code: null,
          countryId: 0,
          id: 0,
          name: '',
        },
        vatNumber: null,
        zipCode: '0000-000',
        userId: 0,
        isCurrentBilling: false,
        isCurrentShipping: false,
        isCurrentPreferred: false,
        customsClearanceCode: null,
      },
    },
    bagItems: {
      [mockBagItemId]: {
        product: mockBagProductId,
        customAttributes: '',
        dateCreated: 1562573174875,
        fulfillmentInfo: null,
        id: mockBagItemId,
        isAvailable: true,
        isCustomizable: false,
        isExclusive: false,
        merchant: 9359,
        price: {
          discount: {
            rate: 0,
          },
          formatted: {
            includingTaxes: '$371.62',
            includingTaxesWithoutDiscount: '$371.62',
          },
          includingTaxes: 371.62,
          includingTaxesWithoutDiscount: 371.62,
        },
        promotionDetail: {
          totalDiscountPercentage: null,
          totalDiscountValue: 0,
          formattedTotalDiscountValue: '0,00 €',
          isProductOffer: false,
        },
        quantity: 1,
        size: {
          scale: 125,
          id: 20,
          name: '25',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 13,
        },
      },
    },
    brands: {
      [mockBrandId]: {
        name: 'Gucci',
        id: mockBrandId,
      },
    },
    categories: {
      [mockCategoryId]: {
        id: mockCategoryId,
        name: 'Clothing',
        parentId: 0,
        gender: 0,
      },
      135972: {
        id: 135972,
        name: 'Accessories',
        gender: 1,
        slug: 'accessories',
      },
      135973: {
        id: 135973,
        name: 'Accessories',
        gender: 0,
        slug: 'accessories',
      },
      137116: {
        id: 137116,
        name: 'Activewear',
        gender: 1,
        slug: 'activewear',
      },
      137117: {
        id: 137117,
        name: 'Activewear',
        gender: 0,
        slug: 'activewear',
      },
    },
    contents: {
      'f7bfa76e-1a1e-4304-85cb-c2a3a757cdd9': {
        publicationId: 'f7bfa76e-1a1e-4304-85cb-c2a3a757cdd9',
        versionId: 'd9a58995-b64c-44b8-a55d-997228b2e508',
        spaceCode: 'website',
        contentTypeCode: 'navbars',
        environmentCode: 'preview',
        code: 'customerService',
        target: {
          language: 'en-US',
        },
        publicationDate: '2020-11-06T14:19:14.4398538Z',
        components: [
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Help & Contact us',
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
                value: '/customer-service/help-contact-us',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Help & Contact us',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Orders & Shipping',
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
                value: '/customer-service/orders-shipping',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Orders & Shipping',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Returns & Refunds',
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
                value: '/customer-service/returns-refunds',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Returns & Refunds',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Click & Collect',
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
                value: '/customer-service/click-and-collect',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Click & Collect',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'FAQ',
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
                value: '/customer-service/frequently-asked-questions',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'FAQ',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Terms & Conditions',
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
                value: '/customer-service/terms-and-conditions',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Terms & Conditions',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Privacy Policy',
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
                value: '/customer-service/privacy-policy',
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
                value: 'PAGES',
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
                value: 'Link',
                name: 'NodeType',
                displayOptions: {},
              },
              roots: {
                type: 'list',
                components: [],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Privacy Policy',
            displayOptions: {},
          },
          {
            type: 'custom',
            fields: {
              title: {
                type: 'text',
                value: 'Cookie Policy',
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
                value: '/customer-service/cookie-policy',
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
                value: 'PAGES',
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
              roots: {
                type: 'list',
                components: [
                  {
                    type: 'custom',
                    fields: {
                      title: {
                        type: 'text',
                        value: 'Cookie Preferences',
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
                        value: '/customer-service/cookie-preferences',
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
                        value: 'PAGES',
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
                        value: 'Link',
                        name: 'NodeType',
                        displayOptions: {},
                      },
                      roots: {
                        type: 'list',
                        components: [],
                        name: 'Roots',
                        displayOptions: {},
                      },
                      visualizationProperties: {
                        type: 'list',
                        components: [],
                        name: 'visualizationProperties',
                        displayOptions: {},
                      },
                    },
                    customType: 'navbarNode',
                    name: 'Cookie Preferences',
                    displayOptions: {},
                  },
                  {
                    type: 'custom',
                    fields: {
                      title: {
                        type: 'text',
                        value: 'Do Not Sell My Personal Info',
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
                        value: '/customer-service/do-not-sell-my-personal-info',
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
                        value: 'PAGES',
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
                        value: 'Link',
                        name: 'NodeType',
                        displayOptions: {},
                      },
                      roots: {
                        type: 'list',
                        components: [],
                        name: 'Roots',
                        displayOptions: {},
                      },
                      visualizationProperties: {
                        type: 'list',
                        components: [],
                        name: 'visualizationProperties',
                        displayOptions: {},
                      },
                    },
                    customType: 'navbarNode',
                    name: 'Do Not Sell My Personal Info',
                    displayOptions: {},
                  },
                ],
                name: 'Roots',
                displayOptions: {},
              },
              visualizationProperties: {
                type: 'list',
                components: [],
                name: 'visualizationProperties',
                displayOptions: {},
              },
            },
            customType: 'navbarNode',
            name: 'Cookie Policy',
            displayOptions: {},
          },
        ],
      },
    },
    contentGroups: {
      'navbars!customerService': {
        hash: 'navbars!customerService',
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: ['f7bfa76e-1a1e-4304-85cb-c2a3a757cdd9'],
      },
    },
    countries: {
      US: {
        code: 'US',
        cultureCode: 'en-US',
        currencies: [
          {
            id: 2,
            name: 'United States Dollar',
            isoCode: 'USD',
            cultureCode: 'en-US',
          },
        ],
        newsletterSubscriptionOptionDefault: true,
        platformId: 216,
        structure: '/en-us',
        name: 'United States',
        nativeName: 'United States',
        structures: ['/en-us'],
        cultures: ['en-US'],
        isDefault: true,
        isCountryDefault: false,
        continentId: 5,
      },
      PT: {
        code: 'PT',
        cultureCode: 'en-US',
        currencies: [
          {
            id: 4,
            name: 'Eur',
            isoCode: 'EUR',
            cultureCode: 'en-PT',
          },
        ],
        newsletterSubscriptionOptionDefault: true,
        platformId: 165,
        structure: '/en-pt',
        name: 'Portugal',
        nativeName: 'Portugal',
        structures: ['/en-pt'],
        cultures: ['en-US', 'pt-PT'],
        isDefault: true,
        isCountryDefault: false,
        continentId: 3,
      },
    },
    designerResults: {
      [mockDesignerResultHash]: {
        designers: [
          {
            gender: '',
            list: [
              {
                slug: '2-3-4',
                title: '2 3 4',
              },
            ],
            slug: 'numeric',
            title: 'numeric',
          },
          {
            gender: '',
            list: [
              {
                slug: 'a-peace-treaty',
                title: 'A peace treaty',
              },
              {
                slug: 'adidas',
                title: 'Adidas',
              },
            ],
            slug: 'A',
            title: 'A',
          },
          {
            gender: '',
            list: [
              {
                slug: 'balenciaga',
                title: 'Balenciaga',
              },
              {
                slug: 'balmain',
                title: 'Balmain',
              },
            ],
            slug: 'B',
            title: 'B',
          },
        ],
      },
    },
    facets: {
      [mockFacetId]: {
        description: 'BLACK',
        id: mockFacetId,
        parentId: 'colors_0',
        value: 1,
      },
      attributes_21: {
        description: 'Cropped',
        id: 'attributes_21',
        parentId: 'attributes_0',
        value: 21,
      },
      colors_7: {
        description: 'BLUE',
        id: 'colors_7',
        parentId: 'colors_0',
        value: 7,
      },
      brands_16: {
        description: 'Balenciaga',
        id: 'brands_16',
        parentId: 'brands_0',
        value: 16,
      },
      brands_17: {
        description: 'Gucci',
        id: 'brands_17',
        parentId: 'brands_0',
        value: 17,
      },
      categories_135973: {
        description: 'Accessories',
        id: 'categories_135973',
        parentId: 'categories_0',
        value: 135973,
      },
      categories_136001: {
        description: 'Belts',
        id: 'categories_136001',
        parentId: 'categories_135973',
        value: 136001,
      },
      categories_136003: {
        description: 'Scarves',
        id: 'categories_136003',
        parentId: 'categories_135973',
        value: 136003,
      },
      [`categories_${mockCategoryId}`]: {
        description: 'Clothing',
        id: `categories_${mockCategoryId}`,
        parentId: 'categories_0',
        value: mockCategoryId,
      },
      categories_135979: {
        description: 'Dresses',
        id: 'categories_135979',
        parentId: `categories_${mockCategoryId}`,
        value: 135979,
        slug: 'dresses',
      },
      categories_136189: {
        description: 'Day Dresses',
        id: 'categories_136189',
        parentId: 'categories_135979',
        value: 136189,
      },
      discount_0: {
        value: 0,
        valueUpperBound: 0,
        id: 'discount_0',
        parentId: 'discount_0',
      },
      discount_0_30: {
        value: 0,
        valueUpperBound: 30,
        id: 'discount_0_30',
        parentId: 'discount_0',
      },
      discount_30_50: {
        value: 30,
        valueUpperBound: 50,
        id: 'discount_30_50',
        parentId: 'discount_0',
      },
      discount_50_60: {
        value: 50,
        valueUpperBound: 60,
        id: 'discount_50_60',
        parentId: 'discount_0',
      },
      discount_60_100: {
        value: 60,
        valueUpperBound: 100,
        id: 'discount_60_100',
        parentId: 'discount_0',
      },
      price_239_1802: {
        description: null,
        groupsOn: 0,
        id: 'price_239_1802',
        parentId: 'price_0',
        slug: null,
        url: '?price=239',
        value: 239,
        valueUpperBound: 1802,
      },
      sizesbycategory_17_136330: {
        description: 'XXXS',
        groupsOn: 136330,
        parentId: 'sizebycategory_0',
        slug: null,
        url: 'clothing?sizes=17',
        value: 17,
        valueUpperBound: 0,
      },
      sizesbycategory_18_136330: {
        description: 'XXS',
        groupsOn: 136330,
        parentId: 'sizebycategory_0',
        slug: null,
        url: 'clothing?sizes=18',
        value: 18,
        valueUpperBound: 0,
      },
    },
    genders: {},
    merchants: {},
    orders: {
      [mockOrderId]: {
        id: mockOrderId,
        createdDate: 1605268277080,
        totalItems: 1,
        byMerchant: {
          11554: {
            userId: 34113438,
            totalQuantity: 1,
            status: 'Order cancelled',
            returnAvailable: false,
            checkoutOrderId: 110737049,
            returnId: null,
            merchant: 11554,
            orderItems: [mockOrderItemId],
          },
        },
        checkoutOrderId: 110737049,
        userId: 34113438,
        paymentId: null,
        shippingAddress: {
          addressLine1: 'Rua da Lionesa, 446 Edifício G12',
          addressLine2: '',
          addressLine3: null,
          city: {
            countryId: 165,
            id: 197,
            name: 'Porto',
            stateId: null,
          },
          country: {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            culture: 'pt-PT',
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: 'Europe',
            subRegion: null,
            regionId: 0,
            subfolder: null,
            continentId: 3,
          },
          ddd: null,
          title: null,
          firstName: 'Porto',
          id: '00000000-0000-0000-0000-000000000000',
          lastName: 'Office',
          neighbourhood: null,
          phone: '+351 220430530',
          state: {
            code: null,
            countryId: 0,
            id: 0,
            name: null,
          },
          vatNumber: null,
          zipCode: '4465- 671 ',
          userId: 0,
          isCurrentBilling: false,
          isCurrentShipping: false,
          isCurrentPreferred: false,
          customsClearanceCode: null,
        },
        billingAddress: {
          addressLine1: '821 Mount Rushmore Rd Ste B',
          addressLine2: '821',
          addressLine3: null,
          city: {
            countryId: 216,
            id: 0,
            name: 'Rapid City',
            stateId: null,
          },
          country: {
            alpha2Code: 'US',
            alpha3Code: 'USA',
            culture: 'en-US',
            id: 216,
            name: 'United States',
            nativeName: 'United States',
            region: 'The United States & Canada',
            subRegion: null,
            regionId: 0,
            subfolder: null,
            continentId: 5,
          },
          ddd: null,
          title: null,
          firstName: 'Pepe',
          id: '00000000-0000-0000-0000-000000000000',
          lastName: 'Pepe',
          neighbourhood: null,
          phone: '312312321312',
          state: {
            code: 'SD',
            countryId: 216,
            id: 58,
            name: 'South Dakota',
          },
          vatNumber: null,
          zipCode: '57701-8238',
          userId: 0,
          isCurrentBilling: false,
          isCurrentShipping: false,
          isCurrentPreferred: false,
          customsClearanceCode: null,
        },
        items: [mockOrderItemId],
        totalQuantity: 1,
        subTotalAmount: 1,
        totalDiscount: 0.96,
        totalShippingFee: 0,
        totalTaxes: 0,
        totalDomesticTaxes: 0,
        grandTotal: 0.04,
        credit: 0,
        customerType: 0,
        formattedCredit: '0,00 €',
        formattedGrandTotal: '0,04 €',
        formattedSubTotalAmount: '1,00 €',
        formattedTotalDiscount: '0,96 €',
        formattedTotalShippingFee: '0,00 €',
        formattedTotalTaxes: '0,00 €',
        formattedTotalDomesticTaxes: '0,00 €',
        taxType: 'DDP',
        updatedDate: 1605268277080,
      },
      '6D9LAK': {
        id: '6D9LAK',
        createdDate: 1605267070023,
        totalItems: 1,
        byMerchant: {
          11554: {
            userId: 34113438,
            totalQuantity: 1,
            status: 'Reviewing order',
            returnAvailable: false,
            checkoutOrderId: 110733439,
            returnId: null,
            merchant: 11554,
          },
        },
      },
    },
    orderItems: {
      [mockOrderItemId]: {
        attributes: [
          { description: 'Scale', type: 2, value: '204' },
          { description: 'Size', type: 0, value: '24' },
          { description: 'SizeDescription', type: 1, value: '7.5' },
        ],
        brand: 220482,
        categories: [136301, 136308],
        colors: [
          {
            color: { id: 112495, name: 'Black' },
            tags: ['MainColor'],
          },
          {
            color: { id: 0, name: 'BLACK' },
            tags: ['DesignerColor'],
          },
        ],
        creationChannel: null,
        customAttributes: null,
        id: mockOrderItemId,
        images: [
          {
            order: 1,
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
            },
          },
          {
            order: 2,
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
            },
          },
          {
            order: 3,
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
            },
          },
          {
            order: 4,
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
            },
          },
          {
            order: 5,
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
            },
          },
        ],
        isCustomizable: false,
        isExclusive: false,
        merchant: 10538,
        merchantOrderId: 100001339,
        orderItemStatus: null,
        orderStatus: 'CheckingStock',
        price: {
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          formattedPrice: '375,00 €',
          formattedPriceWithoutCurrency: null,
          formattedPriceWithoutDiscount: '375,00 €',
          formattedPriceWithoutDiscountAndCurrency: null,
          priceExclTaxes: 256.49,
          priceInclTaxes: 375,
          priceInclTaxesWithoutDiscount: 375,
          tags: ['DDP'],
          taxType: 'DDP',
          taxesRate: 46.2071,
          taxesValue: 118.51,
        },
        productId: 12091686,
        productSlug: 'stud-sandal-12091686',
        shippingService: {
          description: 'Express',
          id: 33,
          maxEstimatedDeliveryHour: 0,
          minEstimatedDeliveryHour: 0,
          name: 'DHL Express',
          type: 'Express',
          trackingCodes: ['56', '34'],
        },
        shortDescription: 'stud sandal',
        size: '7.5',
        tag: { id: undefined, name: undefined },
      },
    },
    products: {
      [mockProductDetailsId]: {
        scaleId: mockSizeScaleId,
        associationsInformation: {
          hasColorGrouping: false,
        },
        brand: mockBrandId,
        breadCrumbs: [
          {
            text: 'Woman',
            slug: 'woman',
            link: 'shopping/woman',
          },
        ],
        categories: [mockCategoryId],
        description: 'biz',
        id: mockProductDetailsId,
        fittings: [
          {
            type: 'Size Selection',
            description:
              'This piece fits true to size. We recommend you get your regular size',
          },
          {
            type: 'Overall fit',
            description: 'Cut for a slim fit',
          },
          {
            type: 'Fabric weight & type',
            description: 'Made with a mid-weight fabric',
          },
        ],
        images: [
          {
            order: 1,
            sources: {
              54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
              600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
            },
          },
          {
            order: 2,
            sources: {
              54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
              600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
            },
          },
          {
            order: 3,
            sources: {
              54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
              600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
            },
          },
          {
            order: 4,
            sources: {
              54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
              600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
            },
          },
          {
            order: 5,
            sources: {
              54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
              600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
            },
          },
        ],
        measurements: [
          {
            attributes: [
              {
                description: 'SizeDescription',
                type: 1,
                value: '38.5',
              },
              {
                description: 'ScaleDescription',
                type: 3,
                value: 'Italy',
              },
              {
                description: 'ScaleAbbreviation',
                type: 4,
                value: 'IT',
              },
            ],
            measurements: [
              {
                description: 'HEEL',
                measureTypeId: '1ccfc07b-f70c-41c8-b496-79509de4ed25',
                unit: 'cm',
                unitClass: 1,
                unitClassDescription: 'Length',
                value: 9.5,
              },
              {
                description: 'CIRCUMFERENCE',
                measureTypeId: '53d795dc-4b62-4141-80d7-d7245ca3eb59',
                unit: 'cm',
                unitClass: 1,
                unitClassDescription: 'Length',
                value: 34,
              },
              {
                description: 'HEIGHT',
                measureTypeId: 'f4636e38-d893-4dcd-a871-3665329353d6',
                unit: 'cm',
                unitClass: 1,
                unitClassDescription: 'Length',
                value: 12,
              },
            ],
          },
          {
            attributes: [
              {
                description: 'SizeDescription',
                type: 1,
                value: '40',
              },
              {
                description: 'ScaleDescription',
                type: 3,
                value: 'Italy',
              },
              {
                description: 'ScaleAbbreviation',
                type: 4,
                value: 'IT',
              },
            ],
            measurements: [
              {
                description: 'HEEL',
                measureTypeId: '1ccfc07b-f70c-41c8-b496-79509de4ed25',
                unit: 'cm',
                unitClass: 1,
                unitClassDescription: 'Length',
                value: 10,
              },
              {
                description: 'CIRCUMFERENCE',
                measureTypeId: '53d795dc-4b62-4141-80d7-d7245ca3eb59',
                unit: 'cm',
                unitClass: 1,
                unitClassDescription: 'Length',
                value: 35,
              },
              {
                description: 'HEIGHT',
                measureTypeId: 'f4636e38-d893-4dcd-a871-3665329353d6',
                unit: 'cm',
                unitClass: 1,
                unitClassDescription: 'Length',
                value: 14,
              },
            ],
          },
        ],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
          includingTaxes: 129.7446,
          includingTaxesWithoutDiscount: 129.7446,
          taxes: {
            type: 'VAT',
          },
        },
        shortDescription: 'foo',
        sizes: [
          {
            globalQuantity: 0,
            id: 1,
            isOutOfStock: false,
            name: 'S',
            scale: 1,
            scaleAbbreviation: 'it',
            scaleDescription: 'italian',
            stock: [
              {
                merchantId: 1223,
                quantity: 2,
              },
            ],
          },
          {
            globalQuantity: 1,
            id: 2,
            isOutOfStock: false,
            name: 'M',
            scale: 1,
            scaleAbbreviation: 'it',
            scaleDescription: 'italian',
            stock: [
              {
                merchantId: 1223,
                quantity: 2,
              },
            ],
          },
          {
            globalQuantity: 2,
            id: 3,
            isOutOfStock: true,
            name: 'L',
            scale: 1,
            scaleAbbreviation: 'it',
            scaleDescription: 'italian',
            stock: [
              {
                merchantId: 1223,
                quantity: 2,
              },
            ],
          },
          {
            globalQuantity: 5,
            id: 4,
            isOutOfStock: true,
            name: 'XL',
            scale: 1,
            scaleAbbreviation: 'it',
            scaleDescription: 'italian',
            stock: [
              {
                merchantId: 1223,
                quantity: 2,
              },
            ],
          },
        ],
        sizeguide: {
          annotations: [],
          brandId: 769627,
          categoryId: mockCategoryId,
          maps: [
            {
              sizeScaleId: 950,
              description: 'CHLOÉ STANDARD',
              abbreviation: '',
              maps: [
                {
                  description: 'XXXS',
                  position: 0,
                },
                {
                  description: 'M',
                  position: 1,
                },
                {
                  description: 'L',
                  position: 2,
                },
              ],
            },
            {
              sizeScaleId: 955,
              description: 'CHLOÉ FRANCE',
              abbreviation: 'FR',
              maps: [
                {
                  description: '0',
                  position: 0,
                },
                {
                  description: '2',
                  position: 1,
                },
                {
                  description: '4',
                  position: 2,
                },
              ],
            },
            {
              sizeScaleId: 960,
              description: 'CHLOÉ US',
              abbreviation: 'US',
              maps: [
                {
                  description: '0',
                  position: 0,
                },
                {
                  description: '1',
                  position: 1,
                },
                {
                  description: '2',
                  position: 2,
                },
              ],
            },
            {
              sizeScaleId: 965,
              description: 'CHLOÉ UK',
              abbreviation: 'UK',
              maps: [
                {
                  description: '50',
                  position: 0,
                },
                {
                  description: '55',
                  position: 1,
                },
                {
                  description: '60',
                  position: 2,
                },
              ],
            },
          ],
        },
        sku: '000000000006175920',
        preferedMerchant: {
          merchantId: 9359,
        },
        variants: [
          {
            id: mockVariantId,
            merchantId: 10948,
            merchantsLocations: [
              {
                merchantLocationId: 1,
                quantity: 0,
              },
              {
                merchantLocationId: 2,
                quantity: 1,
              },
              {
                merchantLocationId: 3,
                quantity: 99,
              },
            ],
            price: {
              formatted: {
                includingTaxes: '$667',
              },
            },
            size: '25',
          },
          {
            id: 222,
            merchantId: 9359,
            price: {
              formatted: {
                includingTaxes: '$666',
              },
            },
            size: '3',
          },
          {
            id: 444,
            merchantId: 10948,
            price: {
              formatted: {
                includingTaxes: '$667',
              },
            },
            size: '4',
          },
        ],
        slug: 'bar',
        colors: [
          {
            color: {
              id: 112504,
              name: 'Red',
            },
            tags: ['MainColor'],
          },
          {
            color: {
              id: 2323429,
              name: 'degrade vermelho',
            },
            tags: ['DesignerColor'],
          },
        ],
      },
      [mockBagProductId]: {
        brand: mockBrandId,
        categories: [mockCategoryId],
        colors: [
          {
            color: {
              id: 112504,
              name: 'Red',
            },
            tags: ['MainColor'],
          },
          {
            color: {
              id: 2323429,
              name: 'degrade vermelho',
            },
            tags: ['DesignerColor'],
          },
        ],
        description: 'Grey cotton patchwork trousers from 78 Stitches. ',
        id: mockBagProductId,
        images: [],
        name: 'Cotton patchwork trousers ',
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
          includingTaxes: 129.7446,
          includingTaxesWithoutDiscount: 129.7446,
          taxes: {
            type: 'VAT',
          },
        },
        shortDescription: 'foo',
        sizes: [
          {
            globalQuantity: 15,
            id: 20,
            isOneSize: false,
            isOutOfStock: false,
            name: '25',
            scale: 125,
            scaleAbbreviation: 'WAIST',
            scaleDescription: 'Jeans (waist)',
            stock: [
              {
                merchantId: 9359,
                quantity: 9,
                purchaseChannel: 0,
                price: {},
              },
            ],
          },
          {
            globalQuantity: 9,
            id: 25,
            isOneSize: false,
            isOutOfStock: false,
            name: '30',
            scale: 125,
            scaleAbbreviation: 'WAIST',
            scaleDescription: 'Jeans (waist)',
            stock: [
              {
                merchantId: 9359,
                quantity: 9,
                purchaseChannel: 0,
                price: {},
              },
            ],
          },
          {
            globalQuantity: 15,
            id: 26,
            isOneSize: false,
            isOutOfStock: false,
            name: '31',
            scale: 125,
            scaleAbbreviation: 'WAIST',
            scaleDescription: 'Jeans (waist)',
            stock: [
              {
                merchantId: 9359,
                quantity: 9,
                purchaseChannel: 0,
                price: {},
              },
            ],
          },
        ],
        sku: '000000000006175920',
        slug: 'cotton-patchwork-trousers-12912485',
        type: 0,
      },
      [mockProductId]: {
        associationsInformation: {
          hasColorGrouping: true,
        },
        brand: mockBrandId,
        categories: [mockCategoryId],
        colorGrouping: [
          {
            entries: [
              {
                digitalAssets: [
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '54',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240695_cs.jpg',
                    type: 1,
                  },
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '80',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240695_cs.jpg',
                    type: 1,
                  },
                ],
                color: '9075 WHITE/YELLOW',
                slug: 'woman-complain-skull-print-scarf-shortdescription-testes-14260835',
                hasStock: true,
                id: 14260835,
                order: 1,
                isDefault: true,
                variantId: 'a6674901-3c30-4d1c-82a1-0153a862e0ee',
              },
              {
                digitalAssets: [
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '54',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240696_cs.jpg',
                    type: 1,
                  },
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '80',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240696_cs.jpg',
                    type: 1,
                  },
                ],
                color: '9075 WHITE/YELLOW',
                slug: 'woman-complain-skull-print-scarf-shortdescription-testes-14260834',
                hasStock: true,
                id: 14260834,
                order: 1,
                isDefault: false,
                variantId: 'a6674901-3c30-4d1c-82a1-0153a862e0ee',
              },
              {
                digitalAssets: [
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '54',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240689_cs.jpg',
                    type: 1,
                  },
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '80',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240689_cs.jpg',
                    type: 1,
                  },
                ],
                color: '9075 WHITE/YELLOW',
                slug: 'woman-complain-skull-print-scarf-shortdescription-testes-14260779',
                hasStock: true,
                id: 14260779,
                order: 1,
                isDefault: false,
                variantId: 'a6674901-3c30-4d1c-82a1-0153a862e0ee',
              },
              {
                digitalAssets: [
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '54',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240690_cs.jpg',
                    type: 1,
                  },
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '80',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240690_cs.jpg',
                    type: 1,
                  },
                ],
                color: '999   BLACK',
                slug: 'woman-moncler-grenoble-mocked-prod-1-fur-collar-jacket-14720161',
                hasStock: true,
                id: 14720161,
                order: 1,
                isDefault: false,
                variantId: 'a6674901-3c30-4d1c-82a1-0153a862e0ee',
              },
              {
                digitalAssets: [
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '54',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240692_cs.jpg',
                    type: 1,
                  },
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '80',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240692_cs.jpg',
                    type: 1,
                  },
                ],
                color: '04258 ST.CAMOUFLAGE',
                slug: 'woman-twin-set-mocked-prod-2-v-neck-camo-jumper-14719550',
                hasStock: true,
                id: 14719550,
                order: 1,
                isDefault: false,
                variantId: 'a6674901-3c30-4d1c-82a1-0153a862e0ee',
              },
              {
                digitalAssets: [
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '54',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240693_cs.jpg',
                    type: 1,
                  },
                  {
                    mediaType: 'Image',
                    displayOrder: 1,
                    size: '80',
                    url: 'https://www.amiparis.com/BWContent/AMI/14240693_cs.jpg',
                    type: 1,
                  },
                ],
                color: '04481 ST.MIX RIGHE FIORE BAROCCO CAR',
                slug: 'woman-twin-set-mocked-prod-3-v-neck-floral-jumper-14719551',
                hasStock: true,
                id: 14719551,
                order: 1,
                isDefault: false,
                variantId: 'a6674901-3c30-4d1c-82a1-0153a862e0ee',
              },
            ],
            number: 1,
            totalItems: 6,
            totalPages: 1,
          },
        ],
        currencyIsoCode: 'USD',
        gender: 0,
        groupedEntries: {
          total: 12,
          remaining: 0,
          entries: [
            {
              productId: 123,
              images: [
                {
                  sources: {
                    200: 'https://www.amiparis.com/BWContent/AMI/14240690_cs.jpg',
                  },
                },
              ],
              shortDescription: 'This is the short description for thumb 1',
            },
            {
              productId: 456,
              images: [
                {
                  sources: {
                    200: 'https://www.amiparis.com/BWContent/AMI/14240692_cs.jpg',
                  },
                },
              ],
              shortDescription: 'This is the short description for thumb 2',
            },
            {
              productId: 789,
              images: [
                {
                  sources: {
                    200: 'https://www.amiparis.com/BWContent/AMI/14240693_cs.jpg',
                  },
                },
              ],
              shortDescription: 'This is the short description for thumb 3',
            },
          ],
        },
        id: mockProductId,
        images: [
          {
            order: 1,
            sources: {
              54: 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_54.jpg',
              58: 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_58.jpg',
              600: 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_600.jpg',
            },
          },
          {
            order: 2,
            sources: {
              54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128970_54.jpg',
              600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128970_600.jpg',
            },
          },
        ],
        labels: [],
        merchant: 10973,
        price: {
          discount: {
            rate: 0,
          },
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
          includingTaxes: 129.7446,
          includingTaxesWithoutDiscount: 129.7446,
        },
        prices: [],
        quantity: 7,
        sizes: [
          {
            isOneSize: false,
            scale: 191,
            scaleAbbreviation: 'US',
            name: '4',
            sizeId: '19',
            id: 1,
            stock: [
              {
                merchantId: 10537,
              },
            ],
            variants: [
              {
                merchantId: 10537,
                formattedPrice: '$645',
                formattedPriceWithoutDiscount: '$645',
                quantity: 2,
              },
            ],
          },
          {
            isOneSize: false,
            scale: 191,
            scaleAbbreviation: 'US',
            name: '6',
            sizeId: '20',
            id: 2,
            stock: [
              {
                merchantId: 10537,
              },
            ],
            variants: [
              {
                merchantId: 10537,
                formattedPrice: '$645',
                formattedPriceWithoutDiscount: '$645',
                quantity: 2,
              },
            ],
          },
          {
            isOneSize: false,
            scale: 191,
            scaleAbbreviation: 'US',
            name: '8',
            sizeId: '21',
            id: 3,
            stock: [
              {
                merchantId: 10537,
              },
            ],
            variants: [
              {
                merchantId: 10537,
                formattedPrice: '$645',
                formattedPriceWithoutDiscount: '$645',
                quantity: 1,
              },
            ],
          },
        ],
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        sku: '000000000006175920',
        slug: 'chuck-70-u-throat-ballet-sneakers-12913174',
        tag: {
          id: 1,
          name: 'NewSeason',
        },
        type: 0,
        videos: [],
      },
      [mockWishlistProductId]: {
        brand: mockBrandId,
        categories: [mockCategoryId],
        colors: [
          {
            color: {
              id: 112504,
              name: 'Red',
            },
            tags: ['MainColor'],
          },
          {
            color: {
              id: 2323429,
              name: 'degrade vermelho',
            },
            tags: ['DesignerColor'],
          },
        ],
        description: 'Grey cotton patchwork trousers from 78 Stitches. ',
        id: mockWishlistProductId,
        images: [],
        name: 'Cotton patchwork trousers ',
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
          includingTaxes: 129.7446,
          includingTaxesWithoutDiscount: 129.7446,
          taxes: {
            type: 'VAT',
          },
        },
        sizes: [
          {
            globalQuantity: 9,
            id: 25,
            isOneSize: false,
            isOutOfStock: false,
            name: '30',
            scale: 125,
            scaleAbbreviation: 'WAIST',
            scaleDescription: 'Jeans (waist)',
            stock: [
              {
                merchantId: 9359,
                quantity: 9,
                purchaseChannel: 0,
                price: {},
              },
            ],
          },
          {
            globalQuantity: 15,
            id: 26,
            isOneSize: false,
            isOutOfStock: false,
            name: '31',
            scale: 125,
            scaleAbbreviation: 'WAIST',
            scaleDescription: 'Jeans (waist)',
            stock: [
              {
                merchantId: 9359,
                quantity: 9,
                purchaseChannel: 0,
                price: {},
              },
            ],
          },
        ],
        slug: 'cotton-patchwork-trousers-12912485',
      },
    },
    user: {
      id: mockUserId,
      isGuest: false,
      dateOfBirth: '/Date(353635200000)/',
      email: 'test@acme.com',
      gender: 1,
      name: 'John Doe',
      phoneNumber: '+351-911111111',
      username: 'test@acme.com',
      lastName: 'Doe',
      firstName: 'John',
      segments: ['segment1', 'segment2'],
      bagId: '1ff36cd1-0dac-497f-8f32-4f2f7bdd2eaf',
      membership: [],
    },
    recommendedSets: {
      [mockRecommendedSetId]: {
        gender: null,
        name: 'cool set',
        slug: 'cool-set',
        id: [mockRecommendedSetId],
        products: {
          entries: [mockProductId],
        },
      },
    },
    sets: {
      [mockSetId]: {
        name: 'My awesome set',
        id: [mockSetId],
        products: {
          entries: [mockProductId, mockProductDetailsId],
        },
      },
      [mockSetId2]: {
        name: 'My awesome set 2',
        id: [mockSetId2],
        products: {
          entries: [mockProductId, mockProductDetailsId],
        },
      },
    },
    listings: {
      [mockListingHash]: {
        hash: mockListingHash,
        breadCrumbs: [
          {
            text: 'Woman',
            slug: 'woman',
            link: 'shopping/woman',
          },
        ],
        name: null,
        products: {
          entries: [mockProductId],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        facetGroups: [
          {
            deep: 0,
            description: 'Colors',
            dynamic: 0,
            format: 'multiple',
            key: 'colors',
            type: 11,
            values: [[mockFacetId, 'colors_7']],
          },
          {
            deep: 0,
            description: 'Brands',
            dynamic: 0,
            format: 'autocomplete',
            key: 'brands',
            type: 0,
            values: [['brands_16', 'brands_17']],
          },
          {
            deep: 1,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_135973', `categories_${mockCategoryId}`]],
          },
          {
            deep: 2,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_135979']],
          },
          {
            deep: 2,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_136001']],
          },
          {
            deep: 3,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_136189']],
          },
          {
            deep: 0,
            description: 'Leg length',
            dynamic: 11,
            format: 'multiple',
            key: 'attributes',
            type: 7,
            values: [['attributes_21']],
          },
          {
            deep: 0,
            description: 'SizesByCategory',
            dynamic: 136330,
            format: 'multiple',
            key: 'sizesbycategory',
            order: 8,
            type: 24,
            values: [
              ['sizesbycategory_17_136330', 'sizesbycategory_18_136330'],
            ],
          },
          {
            deep: 0,
            description: 'Price',
            dynamic: 0,
            format: 'range',
            key: 'price',
            type: 10,
            values: [['price_239_1802']],
          },
          {
            deep: 0,
            description: 'Discount',
            dynamic: 0,
            format: 'multiple',
            key: 'discount',
            type: 18,
            values: [
              [
                'discount_0',
                'discount_0_30',
                'discount_30_50',
                'discount_50_60',
                'discount_60_100',
              ],
            ],
          },
        ],
        filterSegments: [
          {
            deep: 0,
            description: 'Woman',
            fromQueryString: false,
            gender: null,
            key: 'gender',
            negativeFilter: false,
            order: 0,
            parentId: 0,
            slug: 'woman',
            type: 2,
            value: 0,
            valueUpperBound: 0,
          },
          {
            deep: 1,
            description: 'Clothing',
            fromQueryString: false,
            gender: 0,
            key: 'categories',
            negativeFilter: false,
            order: 0,
            parentId: 0,
            slug: 'clothing',
            type: 6,
            value: mockCategoryId,
            valueUpperBound: 0,
          },
          {
            order: 0,
            type: 10,
            key: 'price',
            gender: null,
            value: 300,
            valueUpperBound: 1802,
            slug: null,
            description: null,
            deep: 0,
            parentId: 0,
            fromQueryString: true,
            negativeFilter: false,
          },
        ],
        config: {
          pageSize: 20,
        },
      },
      '/en-pt/listing?pagesize=1': {
        hash: '/en-pt/listing?pagesize=1',
        breadCrumbs: [
          {
            text: 'Woman',
            slug: 'woman',
            link: 'shopping/woman',
          },
        ],
        name: null,
        products: {
          entries: [mockProductId],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        facetGroups: [
          {
            deep: 0,
            description: 'Colors',
            dynamic: 0,
            format: 'multiple',
            key: 'colors',
            type: 11,
            values: [[mockFacetId, 'colors_7']],
          },
          {
            deep: 0,
            description: 'Brands',
            dynamic: 0,
            format: 'autocomplete',
            key: 'brands',
            type: 0,
            values: [['brands_16', 'brands_17']],
          },
          {
            deep: 1,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_135973', `categories_${mockCategoryId}`]],
          },
          {
            deep: 2,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_135979']],
          },
          {
            deep: 2,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_136001']],
          },
          {
            deep: 3,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [['categories_136189']],
          },
          {
            deep: 0,
            description: 'Leg length',
            dynamic: 11,
            format: 'multiple',
            key: 'attributes',
            type: 7,
            values: [['attributes_21']],
          },
          {
            deep: 0,
            description: 'SizesByCategory',
            dynamic: 136330,
            format: 'multiple',
            key: 'sizesbycategory',
            order: 8,
            type: 24,
            values: [
              ['sizesbycategory_17_136330', 'sizesbycategory_18_136330'],
            ],
          },
          {
            deep: 0,
            description: 'Price',
            dynamic: 0,
            format: 'range',
            key: 'price',
            type: 10,
            values: [['price_239_1802']],
          },
          {
            deep: 0,
            description: 'Discount',
            dynamic: 0,
            format: 'multiple',
            key: 'discount',
            type: 18,
            values: [
              [
                'discount_0',
                'discount_0_30',
                'discount_30_50',
                'discount_50_60',
                'discount_60_100',
              ],
            ],
          },
        ],
        filterSegments: [
          {
            deep: 0,
            description: 'Woman',
            fromQueryString: false,
            gender: null,
            key: 'gender',
            negativeFilter: false,
            order: 0,
            parentId: 0,
            slug: 'woman',
            type: 2,
            value: 0,
            valueUpperBound: 0,
          },
          {
            deep: 1,
            description: 'Clothing',
            fromQueryString: false,
            gender: 0,
            key: 'categories',
            negativeFilter: false,
            order: 0,
            parentId: 0,
            slug: 'clothing',
            type: 6,
            value: mockCategoryId,
            valueUpperBound: 0,
          },
          {
            order: 0,
            type: 10,
            key: 'price',
            gender: null,
            value: 300,
            valueUpperBound: 1802,
            slug: null,
            description: null,
            deep: 0,
            parentId: 0,
            fromQueryString: true,
            negativeFilter: false,
          },
        ],
        config: {
          pageSize: 20,
        },
      },
      '/en-pt/shopping?pageindex=3&sort=price&sortdirection=asc&colors=1|12': {
        hash: '/en-pt/shopping?pageindex=3&sort=price&sortdirection=asc&colors=1|12',
        breadCrumbs: [
          {
            text: 'Woman',
            slug: 'woman',
            link: 'shopping/woman',
          },
        ],
        name: null,
        products: {
          entries: [mockProductId],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        facetGroups: [
          {
            description: 'Colors',
            format: 'multiple',
            fromQueryString: true,
            key: 'colors',
            values: [['BLACK_1', 'BLUE_7']],
          },
          {
            description: 'Brands',
            format: 'autocomplete',
            key: 'brands',
            values: [['Balenciaga_16', 'Gucci_17']],
          },
          {
            description: 'Discount',
            format: 'multiple',
            key: 'discount',
            values: [
              [
                'discount_0',
                'discount_0_30',
                'discount_30_50',
                'discount_50_60',
                'discount_60_100',
              ],
            ],
          },
        ],
        filterSegments: [
          {
            order: 0,
            type: 11,
            key: 'colors',
            gender: null,
            value: 1,
            valueUpperBound: 0,
            slug: null,
            description: null,
            deep: 0,
            parentId: 0,
            fromQueryString: true,
            negativeFilter: false,
          },
          {
            order: 0,
            type: 11,
            key: 'colors',
            gender: null,
            value: 12,
            valueUpperBound: 0,
            slug: null,
            description: null,
            deep: 0,
            parentId: 0,
            fromQueryString: true,
            negativeFilter: false,
          },
        ],
        config: {
          pageSize: 20,
        },
      },
    },
    sizeScales: {
      [mockSizeScaleId]: {
        sizeScaleId: mockSizeScaleId,
        description: 'Jeans (waist)',
        abbreviation: 'Waist',
        maps: [
          {
            description: '22',
            position: 17,
          },
          {
            description: '23',
            position: 18,
          },
          {
            description: '24',
            position: 19,
          },
          {
            description: '25',
            position: 20,
          },
          {
            description: '26',
            position: 21,
          },
          {
            description: '27',
            position: 22,
          },
          {
            description: '28',
            position: 23,
          },
          {
            description: '29',
            position: 24,
          },
          {
            description: '30',
            position: 25,
          },
          {
            description: '31',
            position: 26,
          },
          {
            description: '32',
            position: 27,
          },
          {
            description: '33',
            position: 28,
          },
          {
            description: '34',
            position: 29,
          },
          {
            description: '35',
            position: 30,
          },
          {
            description: '36',
            position: 31,
          },
          {
            description: '37',
            position: 32,
          },
          {
            description: '38',
            position: 33,
          },
        ],
        categoryId: mockCategoryId,
        isDefault: true,
      },
      1234: {
        sizeScaleId: 1234,
        description: 'Jeans (waist)',
        abbreviation: 'Super Scale',
        maps: [
          {
            description: '92',
            position: 17,
          },
          {
            description: '93',
            position: 18,
          },
        ],
        categoryId: mockCategoryId,
        isDefault: false,
      },
    },
    subscriptionPackages: {
      [mockSubscriptionPackageId]: {
        id: mockSubscriptionPackageId,
        topics: [
          {
            type: 'Sale',
            channels: ['email', 'sms'],
          },
          {
            type: 'New_Arrivals',
            channels: ['email', 'sms'],
          },
          {
            type: 'Weekly_Newsletters',
            channels: ['email', 'sms'],
          },
        ],
      },
    },
    wishlistItems: {
      [mockWishlistItemId]: {
        dateCreated: 1562573174875,
        id: mockWishlistItemId,
        isAvailable: true,
        isCustomizable: false,
        isExclusive: false,
        merchant: 9359,
        price: {
          discount: {
            rate: 0,
          },
          formatted: {
            includingTaxes: '$371.62',
            includingTaxesWithoutDiscount: '$371.62',
          },
          includingTaxes: 371.62,
          includingTaxesWithoutDiscount: 371.62,
        },
        quantity: 1,
        size: {
          scale: 125,
          id: 26,
          name: '31',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 15,
        },
        product: mockWishlistProductId,
      },
    },
    wishlistSets: {
      [mockWishlistSetId]: {
        id: mockWishlistSetId,
        name: mockWishlistSetName,
        description: mockWishlistSetDescription,
        dateCreated: '2020-04-06T15:59:17.377Z',
        wishlistSetItems: [
          {
            wishlistItemId: mockWishlistItemId,
            dateCreated: '2020-04-13T15:27:45.081Z',
          },
        ],
      },
    },
    merchantsLocations: {
      [mockMerchantLocationId]: {
        address: {
          addressLine1: 'Avepark Zona Industrial da Gandra Barco GMR',
          addressLine2: null,
          addressLine3: null,
          city: {
            countryId: 0,
            id: 4665,
            name: 'Guimarães',
            stateId: null,
          },
          country: {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            continentId: 0,
            culture: 'pt-PT',
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: null,
            regionId: 0,
            subRegion: null,
            subfolder: null,
          },
          customsClearanceCode: null,
          ddd: null,
          firstName: 'Guimarães Office',
          id: '00000000-0000-0000-0000-000000000000',
          isCurrentBilling: false,
          isCurrentShipping: false,
          isCurrentPreferred: false,
          lastName: null,
          neighbourhood: null,
          phone: '+351 253 142 100',
          state: {
            code: 'MA',
            countryId: 165,
            id: 91,
            name: 'Maranhão',
          },
          title: null,
          userId: 0,
          vatNumber: null,
          zipCode: '4805-015',
        },
        businessDays: [
          {
            hours: [
              {
                close: '15:00:00',
                open: '7:30:00',
              },
              {
                close: '21:00:00',
                open: '16:30:00',
              },
            ],
            weekday: 0,
          },
        ],
        id: mockMerchantLocationId,
        isCollectPoint: false,
        isReturnsInStoreAllowed: false,
        lat: '51.513357',
        lon: '-0.146409',
        merchantId: 9359,
        merchantName: 'ACME',
        sameDayDelivery: {
          cutOffTime: '00:00:00',
          isActive: false,
        },
        deliveryOptions: [
          {
            deliveryType: 4,
            startTime: '00:00:00',
            endTime: '00:00:00',
            isEnabled: false,
          },
        ],
      },
    },
  },
  forms: {
    result: {
      [mockBookAnAppointmentFormCode]: {
        jsonSchema: {
          type: 'object',
          required: [
            'firstName',
            'surname',
            'email',
            'storeName',
            'requestedDate',
            'requestedHour',
            'serviceType',
          ],
          properties: {
            firstName: {
              title: 'First Name',
              type: 'string',
            },
            surname: {
              title: 'Surname',
              type: 'string',
            },
            email: {
              title: 'Email',
              type: 'string',
              format: 'email',
            },
            phoneNumber: {
              title: 'Phone Number',
              type: 'string',
              pattern: '^[+]{1}[0-9]{1,3}[-]{1}[-0-9]+$',
            },
            requestedDate: {
              title: 'Best time to schedule a call to arrange your appointment',
              type: 'string',
              format: 'date',
            },
            requestedHour: {
              type: 'string',
            },
            storeName: {
              title: 'Store',
              type: 'string',
            },
            serviceType: {
              title: 'Service Type',
              type: 'string',
              enum: [
                'black-tie-gala',
                'bridal-collections',
                'tailored-pieces',
                'season-collections',
              ],
              enumNames: [
                'Black Tie & Gala',
                'Bridal Collections',
                'Tailored Pieces',
                'Season Collections',
              ],
            },
            additionalNotes: {
              title: 'message',
              type: 'string',
              maxLength: 300,
            },
            sendUserCopy: {
              title: 'Send me a copy',
              type: 'boolean',
              default: false,
            },
          },
        },
      },
      [mockPostPurchaseFormCode]: {
        jsonSchema: {
          type: 'object',
          properties: {
            tenantId: { title: 'tenantId', type: 'string' },
            orderId: { title: 'orderId', type: 'string' },
            userId: { title: 'userId', type: 'string' },
            score: { title: 'score', type: 'string' },
            reason: { title: 'reason', type: 'string' },
            findingProduct: {
              title: 'findingProduct',
              type: 'string',
            },
            placingOrder: { title: 'placingOrder', type: 'string' },
            delivery: { title: 'delivery', type: 'string' },
            packaging: { title: 'packaging', type: 'string' },
            productQuality: {
              title: 'productQuality',
              type: 'string',
            },
            productSizeAndFit: {
              title: 'productSizeAndFit',
              type: 'string',
            },
          },
          required: [
            'score',
            'findingProduct',
            'placingOrder',
            'delivery',
            'packaging',
            'productQuality',
            'productSizeAndFit',
          ],
        },
      },
    },
    isLoading: {
      [mockBookAnAppointmentFormCode]: false,
      [mockPostPurchaseFormCode]: false,
    },
    error: {
      [mockBookAnAppointmentFormCode]: null,
      [mockPostPurchaseFormCode]: null,
    },
    isSubmitFormLoading: {
      [mockBookAnAppointmentFormCode]: false,
      [mockPostPurchaseFormCode]: false,
    },
    submitFormError: {
      [mockBookAnAppointmentFormCode]: null,
      [mockPostPurchaseFormCode]: null,
    },
  },
  listing: {
    error: {},
    hash: mockListingHash,
    isHydrated: {},
    isLoading: {},
  },
  locale: {
    countryCode: 'US',
    countries: {
      isLoading: false,
    },
    states: {
      isLoading: false,
    },
    countryAddressSchema: {
      error: null,
      isLoading: false,
    },
  },
  merchantsLocations: {
    isLoading: false,
  },
  navigation: {},
  newsletter: {
    subscribe: {
      isLoading: false,
    },
    unsubscribe: {
      isLoading: false,
    },
  },
  orders: {
    error: null,
    isLoading: false,
    result: null,
    ordersList: {
      error: null,
      isLoading: false,
    },
    orderDetails: {
      error: {},
      isLoading: {},
    },
    orderReturnOptions: {
      error: {},
      isLoading: {},
    },
    trackings: {
      error: null,
      isLoading: false,
    },
  },
  profile: {
    preferences: {
      error: null,
      isLoading: false,
    },
    updatePreferences: {
      error: null,
      isLoading: false,
    },
  },

  recommendations: {
    error: {},
    isLoading: {},
    result: {
      [mockRecommendationsStrategy]: {
        id: mockRecommendationId,
        values: [
          {
            id: mockProductId,
            score: 0.748578548431396,
          },
        ],
      },
    },
  },
  sizeScales: {
    isLoading: false,
    isLoadingById: {
      [mockSizeScaleId]: false,
    },
    isLoadingByQuery: {
      [mockCategoryId]: false,
    },
    error: null,
    errorById: {},
    errorByQuery: {},
  },
  sizeguides: {
    error: null,
    isLoading: false,
    result: [
      {
        annotations: [
          'Please notice that this is a guide only and that measurements may vary according to brand and style.',
        ],
        brandId: mockBrandId,
        categoryId: mockCategoryId,
        maps: [
          {
            sizeScaleId: 950,
            description: 'CHLOÉ STANDARD',
            abbreviation: '',
            maps: [
              {
                description: 'XXXS',
                position: 0,
              },
              {
                description: 'M',
                position: 1,
              },
              {
                description: 'L',
                position: 2,
              },
            ],
          },
          {
            sizeScaleId: 955,
            description: 'CHLOÉ FRANCE',
            abbreviation: 'FR',
            maps: [
              {
                description: '0',
                position: 0,
              },
              {
                description: '2',
                position: 1,
              },
              {
                description: '4',
                position: 2,
              },
            ],
          },
          {
            sizeScaleId: 960,
            description: 'CHLOÉ US',
            abbreviation: 'US',
            maps: [
              {
                description: '0',
                position: 0,
              },
              {
                description: '1',
                position: 1,
              },
              {
                description: '2',
                position: 2,
              },
            ],
          },
          {
            sizeScaleId: 965,
            description: 'CHLOÉ UK',
            abbreviation: 'UK',
            maps: [
              {
                description: '50',
                position: 0,
              },
              {
                description: '55',
                position: 1,
              },
              {
                description: '60',
                position: 2,
              },
            ],
          },
        ],
      },
    ],
  },
  stores: {
    stores: {
      result: [
        {
          entries: [
            {
              id: 'e987a998-36c9-4fbe-a0c0-9692cb530729',
              name: 'Whitelabel Maisón',
              slug: 'whitelabel-maison',
              tags: [],
              contacts: [
                {
                  id: 1,
                  type: 'Email',
                  number: '28288282@whitelabel.com',
                },
              ],
            },
          ],
        },
      ],
      error: null,
      isLoading: false,
    },
  },
  subscriptions: {
    user: {
      error: null,
      isLoading: false,
      result: [
        {
          id: mockUserSubscriptionId,
          topics: [mockUserSubscriptionWithSms, mockUserSubscriptionWithEmail],
        },
      ],
    },
    packages: {
      error: null,
      isLoading: false,
      result: {
        supportedChannels: ['email', 'sms'],
        packages: [mockSubscriptionPackageId],
      },
    },
  },
  viewport: {
    breakpoint: 'xs',
    size: {
      width: 0,
      height: 0,
    },
    isTouchDevice: false,
  },
  wishlist: {
    error: {},
    id: mockWishlistId,
    isLoading: false,
    result: {
      count: 1,
      id: mockWishlistId,
      items: [mockWishlistItemId],
    },
    items: {
      ids: [mockWishlistItemId],
      item: {
        error: {},
        isLoading: {},
      },
    },
    sets: {
      error: null,
      ids: null,
      isLoading: false,
      set: {
        error: {},
        isLoading: {},
      },
    },
  },
};

export default initialReduxState;

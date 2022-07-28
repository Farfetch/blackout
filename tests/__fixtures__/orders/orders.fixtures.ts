import {
  CustomerType,
  OrderDocumentType,
  OrderItemStatus,
  OrderStatus,
  TrackingEventType,
} from '@farfetch/blackout-client';

export const checkoutId = 15338048;
export const checkoutOrderId = 15338048;
export const checkoutOrderItemId = 30380051;
export const countryId = 165;
export const courierId = 2;
export const merchantId = 10537;
export const merchantId2 = 10538;
export const merchantOrderId = 100001339;
export const merchantOrderId2 = 100001340;
export const fileId = '98b1cb96-710e-437c-98b6-e904b91cf6f6';
export const orderId = '3558DS';
export const itemId = '3558DS';
export const orderId2 = 'QUJ9AC';
export const orderItemId = 10070161;
export const orderItemId2 = 10070162;
export const orderItemId3 = 10070163;
export const returnOptionId = '10537_3';
export const returnOptionId2 = '10538_3';
export const trackingNumber = '4538009162';
export const trackingNumber2 = '4538009163';
export const userId = 29521154;

export const mockOrdersResponse = {
  entries: [
    {
      checkoutOrderId,
      createdDate: '2018-10-16T11:07:09.817Z',
      id: orderId,
      merchantId,
      merchantName: 'TOMAS MAIER MADISON',
      merchantOrderCode: 'PZ1129361393',
      returnAvailable: false,
      returnId: 26821464,
      status: 'Reviewing order',
      tags: [],
      totalQuantity: 2,
      userId,
    },
    {
      checkoutOrderId,
      createdDate: '2018-10-16T11:07:09.817Z',
      id: orderId,
      merchantId: merchantId2,
      merchantName: 'TOMAS MAIER BLEECKER',
      merchantOrderCode: 'PZ1128781830',
      returnAvailable: false,
      returnId: 26678630,
      status: 'Reviewing order',
      tags: [],
      totalQuantity: 1,
      userId,
    },
    {
      checkoutOrderId,
      createdDate: '2018-08-14T11:12:14.007Z',
      id: orderId2,
      merchantId,
      merchantName: 'TOMAS MAIER MADISON',
      merchantOrderCode: 'PZ1129361393',
      returnAvailable: false,
      returnId: 26678892,
      status: 'Reviewing order',
      tags: [],
      totalQuantity: 1,
      userId,
    },
  ],
  number: 1,
  totalItems: 3,
  totalPages: 1,
};

export const mockTrackingResponse = {
  number: 1,
  totalPages: 1,
  totalItems: 2,
  entries: [
    {
      id: '1',
      numberOfTrackings: 1,
      parcels: 2,
      pickupDate: '2019-05-23T18:35:23Z',
      deliveryDate: '2019-05-24T22:59:00Z',
      estimatedDeliveryDate: '2019-05-24T22:59:00Z',
      events: [
        {
          type: TrackingEventType.Pickup,
          description: 'Pickup',
          date: '2019-05-23T18:35:23Z',
        },
      ],
      labelTrackings: [
        {
          courier: {
            id: 2,
            name: 'DHL',
          },
          trackingNumber,
          service: 'DOMESTIC EXPRESS',
          isEstimatedDeliveryDateTrusworthy: false,
          estimatedDeliveryDate: '2019-05-24T22:59:00Z',
          events: [
            {
              code: 'PU',
              date: '2019-05-23T18:35:23Z',
              description: 'Shipment picked up',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'PL',
              date: '2019-05-23T19:37:46Z',
              description: 'Processed at DOCKLANDS-GBR',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'PL',
              date: '2019-05-23T19:48:16Z',
              description: 'Processed at DOCKLANDS-GBR',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'DF',
              date: '2019-05-23T19:48:58Z',
              description: 'Departed Facility in DOCKLANDS-GBR',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'AF',
              date: '2019-05-23T20:39:47Z',
              description: 'Arrived at Sort Facility LONDON-HEATHROW-GBR',
              location: 'LONDON-HEATHROW-GBR',
              signatory: '',
            },
            {
              code: 'PL',
              date: '2019-05-23T22:25:12Z',
              description: 'Processed at LONDON-HEATHROW-GBR',
              location: 'LONDON-HEATHROW-GBR',
              signatory: '',
            },
            {
              code: 'DF',
              date: '2019-05-24T04:34:12Z',
              description: 'Departed Facility in LONDON-HEATHROW-GBR',
              location: 'LONDON-HEATHROW-GBR',
              signatory: '',
            },
            {
              code: 'AR',
              date: '2019-05-24T06:22:13Z',
              description: 'Arrived at Delivery Facility in CITY OF LONDON-GBR',
              location: 'CITY OF LONDON-GBR',
              signatory: '',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      numberOfTrackings: 1,
      parcels: 2,
      pickupDate: '2019-05-23T18:35:23Z',
      deliveryDate: '2019-05-24T22:59:00Z',
      estimatedDeliveryDate: '2019-05-24T22:59:00Z',
      events: [
        {
          type: TrackingEventType.Pickup,
          description: 'Pickup',
          date: '2019-05-23T18:35:23Z',
        },
      ],
      labelTrackings: [
        {
          courier: {
            id: 2,
            name: 'DHL',
          },
          trackingNumber: trackingNumber2,
          service: 'DOMESTIC EXPRESS',
          isEstimatedDeliveryDateTrusworthy: false,
          estimatedDeliveryDate: '2019-05-24T22:59:00Z',
          events: [
            {
              code: 'PU',
              date: '2019-05-23T18:35:23Z',
              description: 'Shipment picked up',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'PL',
              date: '2019-05-23T19:37:46Z',
              description: 'Processed at DOCKLANDS-GBR',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'PL',
              date: '2019-05-23T19:48:16Z',
              description: 'Processed at DOCKLANDS-GBR',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'DF',
              date: '2019-05-23T19:48:58Z',
              description: 'Departed Facility in DOCKLANDS-GBR',
              location: 'DOCKLANDS-GBR',
              signatory: '',
            },
            {
              code: 'AF',
              date: '2019-05-23T20:39:47Z',
              description: 'Arrived at Sort Facility LONDON-HEATHROW-GBR',
              location: 'LONDON-HEATHROW-GBR',
              signatory: '',
            },
            {
              code: 'PL',
              date: '2019-05-23T22:25:12Z',
              description: 'Processed at LONDON-HEATHROW-GBR',
              location: 'LONDON-HEATHROW-GBR',
              signatory: '',
            },
            {
              code: 'DF',
              date: '2019-05-24T04:34:12Z',
              description: 'Departed Facility in LONDON-HEATHROW-GBR',
              location: 'LONDON-HEATHROW-GBR',
              signatory: '',
            },
            {
              code: 'AR',
              date: '2019-05-24T06:22:13Z',
              description: 'Arrived at Delivery Facility in CITY OF LONDON-GBR',
              location: 'CITY OF LONDON-GBR',
              signatory: '',
            },
          ],
        },
      ],
    },
  ],
};

export const mockOrderItem = {
  attributes: [
    {
      description: 'Scale',
      type: 2,
      value: '204',
    },
    {
      description: 'Size',
      type: 0,
      value: '24',
    },
    {
      description: 'SizeDescription',
      type: 1,
      value: '7.5',
    },
  ],
  brand: {
    description: 'German born Tomas Maier headed to Paris.',
    id: 220482,
    name: 'Tomas Maier',
    priceType: 0,
  },
  categories: [
    {
      gender: 0,
      id: 136301,
      name: 'Shoes',
      parentId: 0,
    },
    {
      gender: 0,
      id: 136308,
      name: 'Sandals',
      parentId: 136301,
    },
  ],
  colors: [
    {
      color: {
        id: 112495,
        name: 'Black',
      },
      tags: ['MainColor'],
    },
    {
      color: {
        id: 0,
        name: 'BLACK',
      },
      tags: ['DesignerColor'],
    },
  ],
  creationChannel: 0,
  customAttributes: null,
  id: orderItemId,
  images: {
    images: [
      {
        order: 1,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
      },
      {
        order: 2,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
      },
      {
        order: 3,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
      },
      {
        order: 4,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
      },
      {
        order: 5,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
      },
    ],
    liveModel: {
      globalId: '00000000-0000-0000-0000-000000000000',
      id: 0,
      measurements: [],
      name: 'string',
    },
    liveModelId: 0,
    productSize: '26',
    tag: 'string',
  },
  isCustomizable: false,
  isExclusive: false,
  merchantId: merchantId2,
  merchantOrderId,
  orderItemStatus: OrderItemStatus.None,
  orderStatus: OrderStatus.CheckingStock,
  isReturnAvailable: false,
  merchantOrderCode: 'PZ1132281368',
  productSummary: {
    productId: '12091686',
    description: 'stud sandal',
    shortDescription: 'stud sandal',
  },
  price: {
    discountExclTaxes: 0,
    discountInclTaxes: 0,
    discountRate: 0,
    formattedPrice: '375,00 €',
    formattedPriceWithoutCurrency: '375',
    formattedPriceWithoutDiscount: '375,00 €',
    formattedPriceWithoutDiscountAndCurrency: '375',
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
  },
  shortDescription: 'stud sandal',
  size: '7.5',
  tags: [],
  isPreOrder: false,
  preOrder: {
    expectedFulfillmentDate: {
      startDate: 'string',
      endDate: 'string',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
  gift: {
    to: 'to',
    from: 'from',
    message: 'message',
  },
};

export const mockOrderItem2 = {
  attributes: [
    {
      description: 'Scale',
      type: 2,
      value: '125',
    },
    {
      description: 'Size',
      type: 0,
      value: '23',
    },
    {
      description: 'SizeDescription',
      type: 1,
      value: '28',
    },
  ],
  brand: {
    description: 'German born Tomas Maier headed to Paris.',
    id: 220482,
    name: 'Tomas Maier',
    priceType: 0,
  },
  categories: [
    {
      gender: 0,
      id: 135967,
      name: 'Clothing',
      parentId: 0,
    },
    {
      gender: 0,
      id: 135981,
      name: 'Trousers',
      parentId: 135967,
    },
    {
      gender: 0,
      id: 136273,
      name: 'Palazzo Pants',
      parentId: 135981,
    },
  ],
  colors: [
    {
      color: {
        id: 112495,
        name: 'Black',
      },
      tags: ['MainColor'],
    },
    {
      color: {
        id: 0,
        name: '9100 CHALK',
      },
      tags: ['DesignerColor'],
    },
  ],
  creationChannel: 0,
  customAttributes: null,
  id: orderItemId2,
  images: {
    images: [
      {
        order: 1,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg',
      },
      {
        order: 2,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg',
      },
      {
        order: 3,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg',
      },
      {
        order: 4,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg',
      },
      {
        order: 5,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg',
      },
    ],
    liveModel: {
      globalId: '00000000-0000-0000-0000-000000000000',
      id: 0,
      measurements: [
        {
          description: 'Bust',
          unit: null,
          value: 85,
        },
        {
          description: 'Height',
          unit: null,
          value: 178,
        },
        {
          description: 'Hips',
          unit: null,
          value: 90,
        },
        {
          description: 'Waist',
          unit: null,
          value: 62,
        },
      ],
      name: 'string',
    },
    liveModelId: 0,
    productSize: '26',
    tag: 'string',
  },
  isCustomizable: false,
  isExclusive: false,
  merchantId,
  merchantOrderId: merchantOrderId2,
  orderItemStatus: OrderItemStatus.None,
  orderStatus: OrderStatus.CheckingStock,
  isReturnAvailable: false,
  merchantOrderCode: 'PZ1132281368',
  productSummary: {
    productId: '12511241',
    description: 'wide leg pant',
    shortDescription: 'wide leg pant',
  },
  price: {
    discountExclTaxes: 0,
    discountInclTaxes: 0,
    discountRate: 0,
    formattedPrice: '690,00 €',
    formattedPriceWithoutCurrency: '690',
    formattedPriceWithoutDiscount: '690,00 €',
    formattedPriceWithoutDiscountAndCurrency: '690',
    priceExclTaxes: 433.68,
    priceInclTaxes: 690,
    priceInclTaxesWithoutDiscount: 690,
    tags: ['DDP'],
    taxType: 'DDP',
    taxesRate: 59.1032,
    taxesValue: 256.32,
  },
  productId: 12511241,
  productSlug: 'wide-leg-pant-12511241',
  shippingService: {
    description: 'Express',
    id: 33,
    maxEstimatedDeliveryHour: 0,
    minEstimatedDeliveryHour: 0,
    name: 'DHL Express',
    type: 'Express',
  },
  shortDescription: 'wide leg pant',
  size: '28',
  tags: [],
  isPreOrder: false,
  preOrder: {
    expectedFulfillmentDate: {
      startDate: 'string',
      endDate: 'string',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
  gift: {
    to: 'to',
    from: 'from',
    message: 'message',
  },
};

export const mockOrderItem3 = {
  attributes: [
    {
      description: 'Scale',
      type: 2,
      value: '14',
    },
    {
      description: 'Size',
      type: 0,
      value: '17',
    },
    {
      description: 'SizeDescription',
      type: 1,
      value: 'OS',
    },
  ],
  brand: {
    description: 'German born Tomas Maier headed to Paris.',
    id: 220482,
    name: 'Tomas Maier',
    priceType: 0,
  },
  categories: [
    {
      gender: 1,
      id: 135974,
      name: 'Lifestyle',
      parentId: 0,
    },
    {
      gender: 0,
      id: 136383,
      name: 'Lifestyle',
      parentId: 0,
    },
    {
      gender: 1,
      id: 136380,
      name: 'Travel Accessories',
      parentId: 135974,
    },
    {
      gender: 0,
      id: 136392,
      name: 'Luggage & Travel Accessories',
      parentId: 136383,
    },
  ],
  colors: [
    {
      color: {
        id: 112495,
        name: 'Black',
      },
      tags: ['MainColor'],
    },
    {
      color: {
        id: 0,
        name: 'GRAPHITE',
      },
      tags: ['DesignerColor'],
    },
  ],
  creationChannel: 1,
  customAttributes: null,
  id: orderItemId3,
  images: {
    images: [
      {
        order: 1,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg',
      },
      {
        order: 2,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg',
      },
      {
        order: 3,
        size: '200',
        url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg',
      },
    ],
    liveModel: {
      globalId: '00000000-0000-0000-0000-000000000000',
      id: 0,
      measurements: [],
      name: 'string',
    },
    liveModelId: 0,
    productSize: '26',
    tag: 'string',
  },
  isCustomizable: false,
  isExclusive: false,
  merchantId,
  merchantOrderId: merchantOrderId2,
  orderItemStatus: OrderItemStatus.None,
  orderStatus: OrderStatus.CheckingStock,
  isReturnAvailable: false,
  merchantOrderCode: 'PZ1132281368',
  productSummary: {
    productId: '12511241',
    description: 'beach sheet',
    shortDescription: 'beach sheet',
  },
  price: {
    discountExclTaxes: 0,
    discountInclTaxes: 0,
    discountRate: 0,
    formattedPrice: '160,00 €',
    formattedPriceWithoutCurrency: '160',
    formattedPriceWithoutDiscount: '160,00 €',
    formattedPriceWithoutDiscountAndCurrency: '160',
    priceExclTaxes: 111.26,
    priceInclTaxes: 160,
    priceInclTaxesWithoutDiscount: 160,
    tags: ['DDP'],
    taxType: 'DDP',
    taxesRate: 43.8107,
    taxesValue: 48.74,
  },
  productId: 12092633,
  productSlug: 'beach-sheet-12092633',
  shippingService: {
    description: 'Express',
    id: 33,
    maxEstimatedDeliveryHour: 0,
    minEstimatedDeliveryHour: 0,
    name: 'DHL Express',
    type: 'Express',
  },
  shortDescription: 'beach sheet',
  size: 'OS',
  tags: [],
  isPreOrder: false,
  preOrder: {
    expectedFulfillmentDate: {
      startDate: 'string',
      endDate: 'string',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
  gift: {
    to: 'to',
    from: 'from',
    message: 'message',
  },
};

export const mockOrderDetailsResponse = {
  checkoutOrderId,
  billingAddress: {
    addressLine1: 'Uma rua em Gaia',
    addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
    city: {
      countryId: 165,
      id: 0,
      name: 'Canidelo',
    },
    country: {
      alpha2Code: 'PT',
      alpha3Code: 'PRT',
      continentId: 3,
      culture: 'pt-PT',
      id: 165,
      name: 'Portugal',
      nativeName: 'Portugal',
      region: 'Europe',
      regionId: 0,
      subRegion: 'string',
      subfolder: 'string',
    },
    firstName: 'Nelson',
    id: '00000000-0000-0000-0000-000000000000',
    isCurrentBilling: false,
    isCurrentPreferred: false,
    isCurrentShipping: false,
    lastName: 'Leite',
    neighbourhood: 'string',
    phone: '234234234',
    state: {
      code: 'Porto',
      countryId: 0,
      id: 0,
      name: 'Porto',
    },
    useShippingAsBillingAddress: false,
    userId: 0,
    vatNumber: '123456789',
    zipCode: '1234-567',
  },
  createdDate: '/Date(1539688029817)/',
  credit: 0,
  currency: 'EUR',
  customerType: CustomerType.Normal,
  formattedCredit: '0,00 €',
  formattedGrandTotal: '1 225,00 €',
  formattedSubTotalAmount: '1 225,00 €',
  formattedTotalDiscount: '0,00 €',
  formattedTotalDomesticTaxes: '0,00 €',
  formattedTotalShippingFee: '0,00 €',
  formattedTotalTaxes: '423,57 €',
  grandTotal: 1225,
  id: orderId,
  items: [mockOrderItem, mockOrderItem2, mockOrderItem3],
  newsletterSubscriptionOptionDefault: false,
  paymentId: 'TMADRWWJX2DPH2M7CTUX',
  shippingAddress: {
    addressLine1: 'Uma rua em Gaia',
    addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
    city: {
      countryId: 165,
      id: 0,
      name: 'Canidelo',
    },
    country: {
      alpha2Code: 'PT',
      alpha3Code: 'PRT',
      continentId: 3,
      culture: 'pt-PT',
      id: 165,
      name: 'Portugal',
      nativeName: 'Portugal',
      region: 'Europe',
      regionId: 0,
      subRegion: 'string',
      subfolder: 'string',
    },
    firstName: 'Nelson',
    id: '00000000-0000-0000-0000-000000000000',
    isCurrentBilling: false,
    isCurrentPreferred: false,
    isCurrentShipping: false,
    lastName: 'Leite',
    neighbourhood: 'string',
    phone: '234234234',
    state: {
      code: 'Porto',
      countryId: 0,
      id: 0,
      name: 'Porto',
    },
    useShippingAsBillingAddress: false,
    userId: 0,
    vatNumber: '123456789',
    zipCode: '1234-567',
  },
  subTotalAmount: 1225,
  taxType: 'DDP',
  totalDiscount: 0,
  totalDomesticTaxes: 0,
  totalQuantity: 3,
  totalShippingFee: 0,
  totalTaxes: 423.57,
  updatedDate: '/Date(1539688029817)/',
  userId,
};

export const mockOrderReturnOptionsResponse = [
  {
    merchantId,
    merchantOrderId: 100001340,
    options: [
      {
        type: 3,
        allowedCountries: [
          {
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
        ],
        isNumberOfBoxesMandatory: true,
        isMerchantLocationMandatory: false,
        isAddressMandatory: true,
        isSchedulePickup: true,
      },
    ],
  },
  {
    merchantId: 10538,
    merchantOrderId: 100001339,
    options: [
      {
        type: 3,
        allowedCountries: [
          {
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
        ],
        isNumberOfBoxesMandatory: true,
        isMerchantLocationMandatory: false,
        isAddressMandatory: true,
        isSchedulePickup: true,
      },
    ],
  },
];

export const mockOrderDocumentsResponse = [
  {
    id: '1',
    fileId: '98b1cb96-710e-437c-98b6-e904b91cf6f6',
    type: OrderDocumentType.ComercialInvoice,
    createdAt: '2021-08-04T06:36:17.28+00:00',
    updatedAt: '2021-08-04T06:37:50.317+00:00',
  },
];

export const mockOrderDocumentPayload = {
  action: 'SendToCustomer',
  documentTypes: ['ComercialInvoice'],
};

export const mockOrderItemActivityPayload = {
  type: 'ConfirmDelivery',
};

export const expectedNormalizedPayload = {
  entities: {
    orders: {
      [orderId]: {
        byMerchant: {
          [merchantId]: {
            checkoutOrderId: checkoutOrderId,
            merchant: {
              id: merchantId,
              name: 'TOMAS MAIER MADISON',
            },
            merchantOrderCode: 'PZ1129361393',
            returnAvailable: false,
            returnId: 26821464,
            status: 'Reviewing order',
            tags: [],
            totalQuantity: 2,
            userId: userId,
          },
          [merchantId2]: {
            checkoutOrderId: checkoutOrderId,
            merchant: {
              id: merchantId2,
              name: 'TOMAS MAIER BLEECKER',
            },
            merchantOrderCode: 'PZ1128781830',
            returnAvailable: false,
            returnId: 26678630,
            status: 'Reviewing order',
            tags: [],
            totalQuantity: 1,
            userId: userId,
          },
        },
        createdDate: 1539688029817,
        id: orderId,
        totalItems: 3,
      },
      [orderId2]: {
        byMerchant: {
          [merchantId]: {
            checkoutOrderId: checkoutOrderId,
            merchant: {
              id: merchantId,
              name: 'TOMAS MAIER MADISON',
            },
            merchantOrderCode: 'PZ1129361393',
            returnAvailable: false,
            returnId: 26678892,
            status: 'Reviewing order',
            tags: [],
            totalQuantity: 1,
            userId: userId,
          },
        },
        createdDate: 1534245134007,
        id: orderId2,
        totalItems: 1,
      },
    },
  },
  result: {
    entries: [orderId, orderId, orderId2],
    number: 1,
    totalItems: 3,
    totalPages: 1,
  },
};

export const expectedTrackingNormalizedPayload = {
  entities: {
    courier: {
      [`${courierId}`]: {
        id: courierId,
        name: 'DHL',
      },
    },
    labelTracking: {
      [trackingNumber]: {
        courier: 2,
        estimatedDeliveryDate: '2019-05-24T22:59:00Z',
        events: [
          {
            code: 'PU',
            date: '2019-05-23T18:35:23Z',
            description: 'Shipment picked up',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'PL',
            date: '2019-05-23T19:37:46Z',
            description: 'Processed at DOCKLANDS-GBR',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'PL',
            date: '2019-05-23T19:48:16Z',
            description: 'Processed at DOCKLANDS-GBR',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'DF',
            date: '2019-05-23T19:48:58Z',
            description: 'Departed Facility in DOCKLANDS-GBR',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'AF',
            date: '2019-05-23T20:39:47Z',
            description: 'Arrived at Sort Facility LONDON-HEATHROW-GBR',
            location: 'LONDON-HEATHROW-GBR',
            signatory: '',
          },
          {
            code: 'PL',
            date: '2019-05-23T22:25:12Z',
            description: 'Processed at LONDON-HEATHROW-GBR',
            location: 'LONDON-HEATHROW-GBR',
            signatory: '',
          },
          {
            code: 'DF',
            date: '2019-05-24T04:34:12Z',
            description: 'Departed Facility in LONDON-HEATHROW-GBR',
            location: 'LONDON-HEATHROW-GBR',
            signatory: '',
          },
          {
            code: 'AR',
            date: '2019-05-24T06:22:13Z',
            description: 'Arrived at Delivery Facility in CITY OF LONDON-GBR',
            location: 'CITY OF LONDON-GBR',
            signatory: '',
          },
        ],
        isEstimatedDeliveryDateTrusworthy: false,
        service: 'DOMESTIC EXPRESS',
        trackingNumber,
      },
      [trackingNumber2]: {
        courier: 2,
        estimatedDeliveryDate: '2019-05-24T22:59:00Z',
        events: [
          {
            code: 'PU',
            date: '2019-05-23T18:35:23Z',
            description: 'Shipment picked up',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'PL',
            date: '2019-05-23T19:37:46Z',
            description: 'Processed at DOCKLANDS-GBR',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'PL',
            date: '2019-05-23T19:48:16Z',
            description: 'Processed at DOCKLANDS-GBR',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'DF',
            date: '2019-05-23T19:48:58Z',
            description: 'Departed Facility in DOCKLANDS-GBR',
            location: 'DOCKLANDS-GBR',
            signatory: '',
          },
          {
            code: 'AF',
            date: '2019-05-23T20:39:47Z',
            description: 'Arrived at Sort Facility LONDON-HEATHROW-GBR',
            location: 'LONDON-HEATHROW-GBR',
            signatory: '',
          },
          {
            code: 'PL',
            date: '2019-05-23T22:25:12Z',
            description: 'Processed at LONDON-HEATHROW-GBR',
            location: 'LONDON-HEATHROW-GBR',
            signatory: '',
          },
          {
            code: 'DF',
            date: '2019-05-24T04:34:12Z',
            description: 'Departed Facility in LONDON-HEATHROW-GBR',
            location: 'LONDON-HEATHROW-GBR',
            signatory: '',
          },
          {
            code: 'AR',
            date: '2019-05-24T06:22:13Z',
            description: 'Arrived at Delivery Facility in CITY OF LONDON-GBR',
            location: 'CITY OF LONDON-GBR',
            signatory: '',
          },
        ],
        isEstimatedDeliveryDateTrusworthy: false,
        service: 'DOMESTIC EXPRESS',
        trackingNumber: trackingNumber2,
      },
    },
  },
  result: {
    entries: [
      {
        estimatedDeliveryDate: '2019-05-24T22:59:00Z',
        events: [
          {
            date: '2019-05-23T18:35:23Z',
            description: 'Pickup',
            type: TrackingEventType.Pickup,
          },
        ],
        labelTrackings: ['4538009162'],
        numberOfTrackings: 1,
        parcels: 2,
        pickupDate: '2019-05-23T18:35:23Z',
      },
      {
        estimatedDeliveryDate: '2019-05-24T22:59:00Z',
        events: [
          {
            date: '2019-05-23T18:35:23Z',
            description: 'Pickup',
            type: TrackingEventType.Pickup,
          },
        ],
        labelTrackings: ['4538009163'],
        numberOfTrackings: 1,
        parcels: 2,
        pickupDate: '2019-05-23T18:35:23Z',
      },
    ],
    number: 1,
    totalItems: 2,
    totalPages: 1,
  },
};

export const expectedOrderDetailsNormalizedPayload = {
  entities: {
    brands: {
      220482: {
        description: 'German born Tomas Maier headed to Paris.',
        id: 220482,
        name: 'Tomas Maier',
        priceType: 0,
      },
    },
    categories: {
      135967: {
        gender: 0,
        id: 135967,
        name: 'Clothing',
        parentId: 0,
      },
      135974: {
        gender: 1,
        id: 135974,
        name: 'Lifestyle',
        parentId: 0,
      },
      135981: {
        gender: 0,
        id: 135981,
        name: 'Trousers',
        parentId: 135967,
      },
      136273: {
        gender: 0,
        id: 136273,
        name: 'Palazzo Pants',
        parentId: 135981,
      },
      136301: {
        gender: 0,
        id: 136301,
        name: 'Shoes',
        parentId: 0,
      },
      136308: {
        gender: 0,
        id: 136308,
        name: 'Sandals',
        parentId: 136301,
      },
      136380: {
        gender: 1,
        id: 136380,
        name: 'Travel Accessories',
        parentId: 135974,
      },
      136383: {
        gender: 0,
        id: 136383,
        name: 'Lifestyle',
        parentId: 0,
      },
      136392: {
        gender: 0,
        id: 136392,
        name: 'Luggage & Travel Accessories',
        parentId: 136383,
      },
    },
    merchants: { 10537: { id: 10537 }, 10538: { id: 10538 } },
    orderItems: {
      [`${orderItemId}`]: {
        attributes: mockOrderItem.attributes,
        brand: 220482,
        categories: [136301, 136308],
        colors: mockOrderItem.colors,
        creationChannel: 0,
        customAttributes: null,
        id: orderItemId,
        images: [
          {
            order: 1,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
          },
          {
            order: 2,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
          },
          {
            order: 3,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
          },
          {
            order: 4,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
          },
          {
            order: 5,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
          },
        ],
        isCustomizable: false,
        isExclusive: false,
        isPreOrder: false,
        merchant: merchantId2,
        merchantOrderId: merchantOrderId,
        orderItemStatus: OrderItemStatus.None,
        orderStatus: OrderStatus.CheckingStock,
        isReturnAvailable: false,
        merchantOrderCode: 'PZ1132281368',
        productSummary: {
          productId: '12091686',
          description: 'stud sandal',
          shortDescription: 'stud sandal',
        },
        preOrder: {
          expectedFulfillmentDate: {
            startDate: 'string',
            endDate: 'string',
          },
          type: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        price: {
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          formattedPrice: '375,00 €',
          formattedPriceWithoutCurrency: '375',
          formattedPriceWithoutDiscount: '375,00 €',
          formattedPriceWithoutDiscountAndCurrency: '375',
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
        },
        shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
        gift: {
          to: 'to',
          from: 'from',
          message: 'message',
        },
        tags: [],
        shortDescription: 'stud sandal',
        size: '7.5',
        tag: { id: undefined, name: undefined },
      },
      [`${orderItemId2}`]: {
        attributes: mockOrderItem2.attributes,
        brand: 220482,
        categories: [135967, 135981, 136273],
        colors: mockOrderItem2.colors,
        creationChannel: 0,
        customAttributes: null,
        id: orderItemId2,
        images: [
          {
            order: 1,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg',
          },
          {
            order: 2,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg',
          },
          {
            order: 3,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg',
          },
          {
            order: 4,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg',
          },
          {
            order: 5,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg',
          },
        ],
        isCustomizable: false,
        isExclusive: false,
        isPreOrder: false,
        merchant: merchantId,
        merchantOrderId: merchantOrderId2,
        orderItemStatus: OrderItemStatus.None,
        orderStatus: OrderStatus.CheckingStock,
        isReturnAvailable: false,
        merchantOrderCode: 'PZ1132281368',
        productSummary: {
          productId: '12511241',
          description: 'wide leg pant',
          shortDescription: 'wide leg pant',
        },
        preOrder: {
          expectedFulfillmentDate: {
            startDate: 'string',
            endDate: 'string',
          },
          type: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        price: {
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          formattedPrice: '690,00 €',
          formattedPriceWithoutCurrency: '690',
          formattedPriceWithoutDiscount: '690,00 €',
          formattedPriceWithoutDiscountAndCurrency: '690',
          priceExclTaxes: 433.68,
          priceInclTaxes: 690,
          priceInclTaxesWithoutDiscount: 690,
          tags: ['DDP'],
          taxType: 'DDP',
          taxesRate: 59.1032,
          taxesValue: 256.32,
        },
        productId: 12511241,
        productSlug: 'wide-leg-pant-12511241',
        shippingService: {
          description: 'Express',
          id: 33,
          maxEstimatedDeliveryHour: 0,
          minEstimatedDeliveryHour: 0,
          name: 'DHL Express',
          type: 'Express',
        },
        shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
        gift: {
          to: 'to',
          from: 'from',
          message: 'message',
        },
        tags: [],
        shortDescription: 'wide leg pant',
        size: '28',
        tag: { id: undefined, name: undefined },
      },
      [`${orderItemId3}`]: {
        attributes: mockOrderItem3.attributes,
        brand: 220482,
        categories: [135974, 136383, 136380, 136392],
        colors: mockOrderItem3.colors,
        creationChannel: 1,
        customAttributes: null,
        id: orderItemId3,
        images: [
          {
            order: 1,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg',
          },
          {
            order: 2,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg',
          },
          {
            order: 3,
            size: '200',
            sources: {
              200: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg',
            },
            url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg',
          },
        ],
        isCustomizable: false,
        isExclusive: false,
        isPreOrder: false,
        merchant: merchantId,
        merchantOrderId: merchantOrderId2,
        orderItemStatus: OrderItemStatus.None,
        orderStatus: OrderStatus.CheckingStock,
        isReturnAvailable: false,
        merchantOrderCode: 'PZ1132281368',
        productSummary: {
          productId: '12511241',
          description: 'beach sheet',
          shortDescription: 'beach sheet',
        },
        preOrder: {
          expectedFulfillmentDate: {
            startDate: 'string',
            endDate: 'string',
          },
          type: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        price: {
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          formattedPrice: '160,00 €',
          formattedPriceWithoutCurrency: '160',
          formattedPriceWithoutDiscount: '160,00 €',
          formattedPriceWithoutDiscountAndCurrency: '160',
          priceExclTaxes: 111.26,
          priceInclTaxes: 160,
          priceInclTaxesWithoutDiscount: 160,
          tags: ['DDP'],
          taxType: 'DDP',
          taxesRate: 43.8107,
          taxesValue: 48.74,
        },
        productId: 12092633,
        productSlug: 'beach-sheet-12092633',
        shippingService: {
          description: 'Express',
          id: 33,
          maxEstimatedDeliveryHour: 0,
          minEstimatedDeliveryHour: 0,
          name: 'DHL Express',
          type: 'Express',
        },
        shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
        gift: {
          to: 'to',
          from: 'from',
          message: 'message',
        },
        tags: [],
        shortDescription: 'beach sheet',
        size: 'OS',
        tag: { id: undefined, name: undefined },
      },
    },
  },
  result: {
    checkoutOrderId,
    billingAddress: mockOrderDetailsResponse.billingAddress,
    createdDate: 1539688029817,
    credit: 0,
    currency: 'EUR',
    customerType: CustomerType.Normal,
    formattedCredit: '0,00 €',
    formattedGrandTotal: '1 225,00 €',
    formattedSubTotalAmount: '1 225,00 €',
    formattedTotalDiscount: '0,00 €',
    formattedTotalDomesticTaxes: '0,00 €',
    formattedTotalShippingFee: '0,00 €',
    formattedTotalTaxes: '423,57 €',
    grandTotal: 1225,
    id: orderId,
    items: [orderItemId, orderItemId2, orderItemId3],
    newsletterSubscriptionOptionDefault: false,
    paymentId: 'TMADRWWJX2DPH2M7CTUX',
    shippingAddress: mockOrderDetailsResponse.shippingAddress,
    subTotalAmount: 1225,
    taxType: 'DDP',
    totalDiscount: 0,
    totalDomesticTaxes: 0,
    totalQuantity: 3,
    totalShippingFee: 0,
    totalTaxes: 423.57,
    updatedDate: 1539688029817,
    userId,
  },
};

export const expectedOrderReturnOptionsNormalizedPayload = {
  entities: {
    merchants: {
      [`${merchantId}`]: { id: merchantId, name: undefined },
      [`${merchantId2}`]: { id: merchantId2, name: undefined },
    },
    returnOptions: {
      [returnOptionId]: {
        allowedCountries: [
          {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            continentId: 3,
            culture: 'pt-PT',
            id: countryId,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: 'Europe',
            regionId: 0,
            subRegion: null,
            subfolder: null,
          },
        ],
        id: returnOptionId,
        isAddressMandatory: true,
        isMerchantLocationMandatory: false,
        isNumberOfBoxesMandatory: true,
        isSchedulePickup: true,
        merchant: 10537,
        merchantOrderId: 100001340,
        type: 3,
      },
      [returnOptionId2]: {
        allowedCountries: [
          {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            continentId: 3,
            culture: 'pt-PT',
            id: countryId,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: 'Europe',
            regionId: 0,
            subRegion: null,
            subfolder: null,
          },
        ],
        id: returnOptionId2,
        isAddressMandatory: true,
        isMerchantLocationMandatory: false,
        isNumberOfBoxesMandatory: true,
        isSchedulePickup: true,
        merchant: 10538,
        merchantOrderId: 100001339,
        type: 3,
      },
    },
  },
  result: [
    {
      merchantId: 10537,
      merchantOrderId: 100001340,
      options: ['10537_3'],
    },
    {
      merchantId: 10538,
      merchantOrderId: 100001339,
      options: ['10538_3'],
    },
  ],
};

export const returnOptionEntity = {
  id: returnOptionId,
  type: 3,
};
export const orderEntity = {
  id: orderId,
  byMerchant: {
    [`${merchantId}`]: {
      returnOptions: [returnOptionId],
      orderItems: [orderItemId],
    },
  },
  items: [orderItemId],
};
export const labelTrackingEntity = {
  courier: courierId,
  estimatedDeliveryDate: '2019-05-24T22:59:00Z',
  events: [
    {
      code: 'PU',
      date: '2019-05-23T18:35:23Z',
      description: 'Shipment picked up',
      location: 'DOCKLANDS-GBR',
      signatory: '',
    },
  ],
  isEstimatedDeliveryDateTrusworthy: false,
  service: 'DOMESTIC EXPRESS',
  trackingNumber,
};
export const courierEntity = {
  id: courierId,
  name: 'DHL',
};
export const merchantEntity = { id: merchantId, name: 'merchant' };
export const orderItemEntity = {
  brand: 220482,
  id: orderItemId,
};
export const countryEntity = {
  id: countryId,
  name: 'Portugal',
};

export const mockState = {
  orders: {
    error: 'error: not loaded',
    isLoading: false,
    result: {
      entries: [`${orderId}`],
      number: 1,
      totalItems: 1,
      totalPages: 1,
    },
    ordersList: {
      error: 'error: not loaded',
      isLoading: false,
    },
    orderDetails: {
      error: { [orderId]: null },
      isLoading: { [orderId]: false },
    },
    orderReturns: {
      error: { [orderId]: null },
      isLoading: { [orderId]: false },
    },
    orderReturnOptions: {
      error: { [orderId]: null },
      isLoading: { [orderId]: false },
    },
    trackings: {
      error: null,
      isLoading: false,
    },
    documents: {
      error: null,
      isLoading: false,
    },
    orderAvailableItemsActivities: {
      error: null,
      isLoading: false,
    },
    orderItemAvailableActivities: {
      error: null,
      isLoading: false,
    },
  },
  entities: {
    courier: {
      [`${courierId}`]: courierEntity,
    },
    labelTracking: {
      [`${trackingNumber}`]: labelTrackingEntity,
    },
    orders: { [`${orderId}`]: orderEntity },
    merchants: {
      [`${merchantId}`]: merchantEntity,
    },
    orderItems: {
      [`${orderItemId}`]: orderItemEntity,
    },
    countries: {
      [`${countryId}`]: countryEntity,
    },
    returnOptions: {
      [`${returnOptionId}`]: returnOptionEntity,
    },
  },
};

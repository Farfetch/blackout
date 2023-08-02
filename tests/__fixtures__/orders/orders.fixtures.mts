import {
  AddressType,
  CustomerType,
  FpsOrderType,
  Gender,
  type MerchantOrderReturnOptions,
  MerchantOrderStatus,
  type Order,
  OrderDocumentRequestAction,
  OrderDocumentType,
  type OrderItemActivities,
  OrderItemActivityType,
  OrderItemCreationChannel,
  OrderItemStatus,
  OrderShippingAddressChangeRequestStatus,
  OrderStatus,
  type OrderSummaries,
  ProductType,
  ProductVariantAttributeType,
  ReturnItemStatus,
  ReturnOptionType,
  ReturnReferenceName,
  ReturnStatus,
  ReturnStatusCode,
  SaleIntent,
  ShipmentTrackingEventType,
} from '@farfetch/blackout-client';
import { mockResponse as userEntity } from '../authentication/index.mjs';
import type { OrderEntity, OrderSummaryEntity } from '@farfetch/blackout-redux';

export const checkoutId = 15338048;
export const checkoutOrderId = 15338048;
export const checkoutOrderItemId = 30380051;
export const countryId = 165;
export const countryCode = 'PT';
export const courierId = 2;
export const merchantId = 10537;
export const merchantId2 = 10538;
export const merchantOrderId = 100001339;
export const merchantOrderId2 = 100001340;
export const merchantOrderId3 = 118999819;
export const fileId = '98b1cb96-710e-437c-98b6-e904b91cf6f6';
export const orderId = '3558DS';
export const itemId = 3558;
export const orderId2 = 'QUJ9AC';
export const orderItemId = 10070161;
export const orderItemId2 = 10070162;
export const orderItemId3 = 10070163;
export const productId = 12091686;
export const productId2 = 12511241;
export const productId3 = 12092633;
export const trackingNumber = '4538009162';
export const trackingNumber2 = '4538009163';
export const userId = 29556478;
export const mockGuestUserEmail = 'qat5@farfetch.com';
export const merchantOrderCode = 'PZ1129361393';
export const merchantOrderCode2 = 'PZ1128781830';
export const merchantOrderCode3 = 'PZ1129361394';
export const changeAddressId = '367c55b3-ff52-40b7-a892-26649d010555';

export const mockGuestUserData = {
  guestUserEmail: mockGuestUserEmail,
};

export const mockOrdersResponse = {
  entries: [
    {
      checkoutOrderId,
      createdDate: '2018-10-16T11:07:09.817Z',
      fpsOrderType: FpsOrderType.Farfetch,
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
      fpsOrderType: FpsOrderType.Farfetch,
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
      fpsOrderType: FpsOrderType.Farfetch,
      id: orderId2,
      merchantId,
      merchantName: 'TOMAS MAIER MADISON',
      merchantOrderCode: 'PZ1129361394',
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
} as OrderSummaries;

export const mockOrdersResponse2 = {
  ...mockOrdersResponse,
  totalItems: 10005,
  number: 1,
  totalPages: 2,
} as OrderSummaries;

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
          type: ShipmentTrackingEventType.Pickup,
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
          type: ShipmentTrackingEventType.Pickup,
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
      type: ProductVariantAttributeType.Scale,
      value: '204',
    },
    {
      description: 'Size',
      type: ProductVariantAttributeType.Size,
      value: '24',
    },
    {
      description: 'SizeDescription',
      type: ProductVariantAttributeType.SizeDescription,
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
      gender: Gender.Woman,
      id: 136301,
      name: 'Shoes',
      parentId: 0,
    },
    {
      gender: Gender.Woman,
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
  creationChannel: OrderItemCreationChannel.Catalog,
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
  merchantId: merchantId,
  merchantOrderId,
  orderItemStatus: OrderItemStatus.None,
  orderStatus: MerchantOrderStatus.CheckingStock,
  isReturnAvailable: false,
  isExchangeAvailable: false,
  merchantOrderCode: merchantOrderCode,
  productSummary: {
    productId: '12091686',
    description: 'stud sandal',
    shortDescription: 'stud sandal',
  },
  productType: ProductType.Standard,
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
  productId,
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
      startDate: '2022-09-05T08:00:00+00:00',
      endDate: '2022-09-05T08:00:00+00:00',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
  shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
  gift: {
    to: 'to',
    from: 'from',
    message: 'message',
  },
  saleIntent: SaleIntent.ImmediateFulfilment,
};

export const mockOrderItem2 = {
  attributes: [
    {
      description: 'Scale',
      type: ProductVariantAttributeType.Scale,
      value: '125',
    },
    {
      description: 'Size',
      type: ProductVariantAttributeType.Size,
      value: '23',
    },
    {
      description: 'SizeDescription',
      type: ProductVariantAttributeType.SizeDescription,
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
      gender: Gender.Woman,
      id: 135967,
      name: 'Clothing',
      parentId: 0,
    },
    {
      gender: Gender.Woman,
      id: 135981,
      name: 'Trousers',
      parentId: 135967,
    },
    {
      gender: Gender.Woman,
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
  creationChannel: OrderItemCreationChannel.Catalog,
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
  merchantId: merchantId2,
  merchantOrderId: merchantOrderId2,
  orderItemStatus: OrderItemStatus.None,
  orderStatus: MerchantOrderStatus.CheckingStock,
  isReturnAvailable: false,
  isExchangeAvailable: false,
  merchantOrderCode: merchantOrderCode2,
  productSummary: {
    productId: '12511241',
    description: 'wide leg pant',
    shortDescription: 'wide leg pant',
  },
  productType: 'Standard' as const,
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
  productId: productId2,
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
      startDate: '2022-09-05T08:00:00+00:00',
      endDate: '2022-09-05T08:00:00+00:00',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
  shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
  gift: {
    to: 'to',
    from: 'from',
    message: 'message',
  },
  saleIntent: SaleIntent.Backorder,
};

export const mockOrderItem3 = {
  attributes: [
    {
      description: 'Scale',
      type: ProductVariantAttributeType.Scale,
      value: '14',
    },
    {
      description: 'Size',
      type: ProductVariantAttributeType.Size,
      value: '17',
    },
    {
      description: 'SizeDescription',
      type: ProductVariantAttributeType.SizeDescription,
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
      gender: Gender.Man,
      id: 135974,
      name: 'Lifestyle',
      parentId: 0,
    },
    {
      gender: Gender.Woman,
      id: 136383,
      name: 'Lifestyle',
      parentId: 0,
    },
    {
      gender: Gender.Man,
      id: 136380,
      name: 'Travel Accessories',
      parentId: 135974,
    },
    {
      gender: Gender.Woman,
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
  creationChannel: OrderItemCreationChannel.Mail,
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
  orderStatus: MerchantOrderStatus.CheckingStock,
  isReturnAvailable: false,
  isExchangeAvailable: false,
  merchantOrderCode: merchantOrderCode3,
  productSummary: {
    productId: '12092633',
    description: 'beach sheet',
    shortDescription: 'beach sheet',
  },
  productType: 'Standard',
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
  productId: productId3,
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
      startDate: '2022-09-05T08:00:00+00:00',
      endDate: '2022-09-05T08:00:00+00:00',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
  shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
  gift: {
    to: 'to',
    from: 'from',
    message: 'message',
  },
  saleIntent: SaleIntent.ImmediateFulfilment,
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
  formattedSubTotalAmountExclTaxes: '801,43 €',
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
  fpsOrderType: FpsOrderType.Farfetch,
} as Order;

export const mockOrderDetailsResponse2 = {
  id: 'DVN7EE',
  checkoutOrderId: 126892294,
  userId,
  paymentIntentIds: ['073257f2-11a8-4c24-8084-67a8d901b13e'],
  currency: 'EUR',
  shippingAddress: {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: 'Rua As Camponesas do Corvo 1',
    addressLine2: 'Arcozelo 1',
    city: {
      id: 0,
      name: 'Vila Nova de Gaia',
      countryId: 165,
    },
    state: {
      id: 0,
      code: 'Porto',
      name: 'Porto',
      countryId: 0,
    },
    country: {
      id: 165,
      name: 'Portugal',
      nativeName: 'Portugal',
      alpha2Code: 'PT',
      alpha3Code: 'PRT',
      culture: 'pt-PT',
      region: 'Europe',
      continentId: 3,
    },
    zipCode: '4410-432',
    phone: '32131231231',
    addressType: AddressType.Any,
    isCurrentShipping: false,
    isCurrentBilling: false,
    isCurrentPreferred: false,
    createdDate: '0001-01-01T00:00:00Z',
  },
  billingAddress: {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: 'Rua As Camponesas do Corvo 1',
    addressLine2: 'Arcozelo 1',
    city: {
      id: 0,
      name: 'Vila Nova de Gaia',
      countryId: 165,
    },
    state: {
      id: 0,
      code: 'Porto',
      name: 'Porto',
      countryId: 0,
    },
    country: {
      id: 165,
      name: 'Portugal',
      nativeName: 'Portugal',
      alpha2Code: 'PT',
      alpha3Code: 'PRT',
      culture: 'pt-PT',
      region: 'Europe',
      continentId: 3,
    },
    zipCode: '4410-432',
    phone: '32131231231',
    addressType: AddressType.Any,
    isCurrentShipping: false,
    isCurrentBilling: false,
    isCurrentPreferred: false,
    createdDate: '0001-01-01T00:00:00Z',
  },
  createdDate: '2021-03-15T15:50:52.567Z',
  updatedDate: '2021-03-15T15:50:52.567Z',
  items: [
    {
      id: 36898703,
      merchantId: 11554,
      merchantOrderId: 123095473,
      productId: 11831274,
      attributes: [
        {
          type: ProductVariantAttributeType.Scale,
          value: '16260',
          description: 'Scale',
        },
        {
          type: ProductVariantAttributeType.Size,
          value: '20',
          description: 'Size',
        },
        {
          type: ProductVariantAttributeType.SizeDescription,
          value: '48',
          description: 'SizeDescription',
        },
      ],
      orderStatus: MerchantOrderStatus.Cancelled,
      orderItemStatus: OrderItemStatus.None,
      creationChannel: OrderItemCreationChannel.Catalog,
      shippingService: {
        description: 'DHL Ground',
        id: 44,
        name: 'DHL Ground',
        type: 'DHL Ground',
        minEstimatedDeliveryHour: 72.0,
        maxEstimatedDeliveryHour: 168.0,
        trackingCodes: [],
      },
      customAttributes: '',
      isReturnAvailable: false,
      isExchangeAvailable: false,
      returnRestriction: 'BlockedByWorkflow',
      isCustomizable: false,
      isExclusive: false,
      size: '48',
      brand: {
        description: 'DOLCE & GABBANA',
        id: 3440,
        name: 'Dolce & Gabbana',
        priceType: 0,
        isActive: false,
      },
      shortDescription: 'logo crown blazer',
      images: {
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_54.jpg',
          },
          {
            order: 1,
            size: '58',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_58.jpg',
          },
          {
            order: 1,
            size: '70',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_70.jpg',
          },
          {
            order: 1,
            size: '80',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_80.jpg',
          },
          {
            order: 1,
            size: '114',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_114.jpg',
          },
          {
            order: 1,
            size: '120',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_120.jpg',
          },
          {
            order: 1,
            size: '170',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_170.jpg',
          },
          {
            order: 1,
            size: '180',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_180.jpg',
          },
          {
            order: 1,
            size: '190',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_190.jpg',
          },
          {
            order: 1,
            size: '200',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_200.jpg',
          },
          {
            order: 1,
            size: '240',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_240.jpg',
          },
          {
            order: 1,
            size: '250',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_250.jpg',
          },
          {
            order: 1,
            size: '255',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_255.jpg',
          },
          {
            order: 1,
            size: '300',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_300.jpg',
          },
          {
            order: 1,
            size: '322',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_322.jpg',
          },
          {
            order: 1,
            size: '330',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_330.jpg',
          },
          {
            order: 1,
            size: '350',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_350.jpg',
          },
          {
            order: 1,
            size: '400',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_400.jpg',
          },
          {
            order: 1,
            size: '480',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_480.jpg',
          },
          {
            order: 1,
            size: '500',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_500.jpg',
          },
          {
            order: 1,
            size: '600',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_600.jpg',
          },
          {
            order: 1,
            size: '800',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_800.jpg',
          },
          {
            order: 1,
            size: '1000',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_1000.jpg',
          },
          {
            order: 2,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_54.jpg',
          },
          {
            order: 2,
            size: '58',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_58.jpg',
          },
          {
            order: 2,
            size: '70',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_70.jpg',
          },
          {
            order: 2,
            size: '80',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_80.jpg',
          },
          {
            order: 2,
            size: '114',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_114.jpg',
          },
          {
            order: 2,
            size: '120',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_120.jpg',
          },
          {
            order: 2,
            size: '170',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_170.jpg',
          },
          {
            order: 2,
            size: '180',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_180.jpg',
          },
          {
            order: 2,
            size: '190',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_190.jpg',
          },
          {
            order: 2,
            size: '200',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_200.jpg',
          },
          {
            order: 2,
            size: '240',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_240.jpg',
          },
          {
            order: 2,
            size: '250',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_250.jpg',
          },
          {
            order: 2,
            size: '255',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_255.jpg',
          },
          {
            order: 2,
            size: '300',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_300.jpg',
          },
          {
            order: 2,
            size: '322',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_322.jpg',
          },
          {
            order: 2,
            size: '330',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_330.jpg',
          },
          {
            order: 2,
            size: '350',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_350.jpg',
          },
          {
            order: 2,
            size: '400',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_400.jpg',
          },
          {
            order: 2,
            size: '480',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_480.jpg',
          },
          {
            order: 2,
            size: '500',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_500.jpg',
          },
          {
            order: 2,
            size: '600',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_600.jpg',
          },
          {
            order: 2,
            size: '800',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_800.jpg',
          },
          {
            order: 2,
            size: '1000',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_1000.jpg',
          },
          {
            order: 3,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_54.jpg',
          },
          {
            order: 3,
            size: '58',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_58.jpg',
          },
          {
            order: 3,
            size: '70',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_70.jpg',
          },
          {
            order: 3,
            size: '80',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_80.jpg',
          },
          {
            order: 3,
            size: '114',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_114.jpg',
          },
          {
            order: 3,
            size: '120',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_120.jpg',
          },
          {
            order: 3,
            size: '170',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_170.jpg',
          },
          {
            order: 3,
            size: '180',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_180.jpg',
          },
          {
            order: 3,
            size: '190',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_190.jpg',
          },
          {
            order: 3,
            size: '200',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_200.jpg',
          },
          {
            order: 3,
            size: '240',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_240.jpg',
          },
          {
            order: 3,
            size: '250',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_250.jpg',
          },
          {
            order: 3,
            size: '255',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_255.jpg',
          },
          {
            order: 3,
            size: '300',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_300.jpg',
          },
          {
            order: 3,
            size: '322',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_322.jpg',
          },
          {
            order: 3,
            size: '330',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_330.jpg',
          },
          {
            order: 3,
            size: '350',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_350.jpg',
          },
          {
            order: 3,
            size: '400',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_400.jpg',
          },
          {
            order: 3,
            size: '480',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_480.jpg',
          },
          {
            order: 3,
            size: '500',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_500.jpg',
          },
          {
            order: 3,
            size: '600',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_600.jpg',
          },
          {
            order: 3,
            size: '800',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_800.jpg',
          },
          {
            order: 3,
            size: '1000',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_1000.jpg',
          },
          {
            order: 4,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_54.jpg',
          },
          {
            order: 4,
            size: '58',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_58.jpg',
          },
          {
            order: 4,
            size: '70',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_70.jpg',
          },
          {
            order: 4,
            size: '80',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_80.jpg',
          },
          {
            order: 4,
            size: '114',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_114.jpg',
          },
          {
            order: 4,
            size: '120',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_120.jpg',
          },
          {
            order: 4,
            size: '170',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_170.jpg',
          },
          {
            order: 4,
            size: '180',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_180.jpg',
          },
          {
            order: 4,
            size: '190',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_190.jpg',
          },
          {
            order: 4,
            size: '200',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_200.jpg',
          },
          {
            order: 4,
            size: '240',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_240.jpg',
          },
          {
            order: 4,
            size: '250',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_250.jpg',
          },
          {
            order: 4,
            size: '255',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_255.jpg',
          },
          {
            order: 4,
            size: '300',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_300.jpg',
          },
          {
            order: 4,
            size: '322',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_322.jpg',
          },
          {
            order: 4,
            size: '330',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_330.jpg',
          },
          {
            order: 4,
            size: '350',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_350.jpg',
          },
          {
            order: 4,
            size: '400',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_400.jpg',
          },
          {
            order: 4,
            size: '480',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_480.jpg',
          },
          {
            order: 4,
            size: '500',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_500.jpg',
          },
          {
            order: 4,
            size: '600',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_600.jpg',
          },
          {
            order: 4,
            size: '800',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_800.jpg',
          },
          {
            order: 4,
            size: '1000',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_1000.jpg',
          },
          {
            order: 5,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_54.jpg',
          },
          {
            order: 5,
            size: '58',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_58.jpg',
          },
          {
            order: 5,
            size: '70',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_70.jpg',
          },
          {
            order: 5,
            size: '80',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_80.jpg',
          },
          {
            order: 5,
            size: '114',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_114.jpg',
          },
          {
            order: 5,
            size: '120',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_120.jpg',
          },
          {
            order: 5,
            size: '170',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_170.jpg',
          },
          {
            order: 5,
            size: '180',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_180.jpg',
          },
          {
            order: 5,
            size: '190',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_190.jpg',
          },
          {
            order: 5,
            size: '200',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_200.jpg',
          },
          {
            order: 5,
            size: '240',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_240.jpg',
          },
          {
            order: 5,
            size: '250',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_250.jpg',
          },
          {
            order: 5,
            size: '255',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_255.jpg',
          },
          {
            order: 5,
            size: '300',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_300.jpg',
          },
          {
            order: 5,
            size: '322',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_322.jpg',
          },
          {
            order: 5,
            size: '330',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_330.jpg',
          },
          {
            order: 5,
            size: '350',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_350.jpg',
          },
          {
            order: 5,
            size: '400',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_400.jpg',
          },
          {
            order: 5,
            size: '480',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_480.jpg',
          },
          {
            order: 5,
            size: '500',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_500.jpg',
          },
          {
            order: 5,
            size: '600',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_600.jpg',
          },
          {
            order: 5,
            size: '800',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_800.jpg',
          },
          {
            order: 5,
            size: '1000',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_1000.jpg',
          },
        ],
        liveModelId: 0,
        liveModel: {
          id: 0,
          measurements: [],
          globalId: '00000000-0000-0000-0000-000000000000',
        },
        productSize: '26',
        tag: 'string',
      },
      categories: [
        {
          id: 136330,
          name: 'Clothing',
          parentId: 0,
          gender: Gender.Man,
        },
        {
          id: 136335,
          name: 'Jackets',
          parentId: 136330,
          gender: Gender.Man,
        },
        {
          id: 136402,
          name: 'Blazers',
          parentId: 136335,
          gender: Gender.Man,
        },
      ],
      productSummary: {
        productId: '11831274',
        description: 'logo crown blazer',
        shortDescription: 'logo crown blazer',
      },
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
            id: 35069,
            name: 'N0000',
          },
          tags: ['DesignerColor'],
        },
      ],
      productSlug: 'logo-crown-blazer-11831274',
      productType: 'Standard' as const,
      price: {
        priceExclTaxes: 0.81,
        priceInclTaxes: 1.0,
        priceInclTaxesWithoutDiscount: 1.0,
        discountExclTaxes: 0.0,
        discountInclTaxes: 0.0,
        discountRate: 0.0,
        taxesRate: 23.0,
        taxesValue: 0.19,
        tags: ['DDP', 'VAT'],
        formattedPrice: '1 €',
        formattedPriceWithoutDiscount: '1 €',
        formattedPriceWithoutCurrency: '1',
        formattedPriceWithoutDiscountAndCurrency: '1',
        taxType: 'VAT_DDP',
      },
      merchantOrderCode: 'PZ1123095473',
      tags: [],
      isPreOrder: false,
      shippingOrderId: '00000000-0000-0000-0000-000000000000',
      shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
    },
  ],
  totalQuantity: 1,
  subTotalAmount: 1.0,
  totalDiscount: 0.0,
  totalShippingFee: 2.0,
  totalTaxes: 0.0,
  totalDomesticTaxes: 0.0,
  grandTotal: 3.0,
  credit: 0.0,
  customerType: CustomerType.Normal,
  subTotalAmountExclTaxes: 1.0,
  formattedCredit: '0 €',
  formattedGrandTotal: '3 €',
  formattedSubTotalAmount: '1 €',
  formattedTotalDiscount: '0 €',
  formattedTotalShippingFee: '2 €',
  formattedTotalTaxes: '0 €',
  formattedTotalDomesticTaxes: '0 €',
  formattedSubTotalAmountExclTaxes: '1 €',
  taxType: 'DDP',
  customerEmail: mockGuestUserEmail,
  promotionOffers: [],
};

export const mockGuestOrderResponse = mockOrderDetailsResponse;

export const mockOrderReturnOptionsResponse = [
  {
    merchantId,
    merchantOrderId,
    options: [
      {
        type: ReturnOptionType.CourierPickUp,
        allowedCountries: [
          {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            culture: 'pt-PT',
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: 'Europe',
            subRegion: '',
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
    merchantId: merchantId2,
    merchantOrderId: merchantOrderId2,
    options: [
      {
        type: ReturnOptionType.InStore,
        allowedCountries: [
          {
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            culture: 'pt-PT',
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            region: 'Europe',
            subRegion: '',
            continentId: 3,
          },
        ],
        isNumberOfBoxesMandatory: false,
        isMerchantLocationMandatory: true,
        isAddressMandatory: false,
        isSchedulePickup: false,
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
  action: OrderDocumentRequestAction.SendToCustomer,
  documentTypes: [OrderDocumentType.ComercialInvoice],
};

export const mockOrderItemActivityPayload = {
  type: OrderItemActivityType.ConfirmDelivery,
};

export const expectedOrdersResponseNormalizedPayload = {
  entities: {
    orderSummaries: {
      [merchantOrderCode]: {
        checkoutOrderId: checkoutOrderId,
        merchantId,
        merchantName: 'TOMAS MAIER MADISON',
        fpsOrderType: FpsOrderType.Farfetch,
        createdDate: 1539688029817,
        merchantOrderCode,
        returnAvailable: false,
        returnId: 26821464,
        status: 'Reviewing order',
        tags: [],
        totalQuantity: 2,
        userId: userId,
        id: orderId,
      },
      [merchantOrderCode2]: {
        checkoutOrderId: checkoutOrderId,
        merchantId: merchantId2,
        merchantName: 'TOMAS MAIER BLEECKER',
        fpsOrderType: FpsOrderType.Farfetch,
        merchantOrderCode: merchantOrderCode2,
        returnAvailable: false,
        returnId: 26678630,
        status: 'Reviewing order',
        tags: [],
        totalQuantity: 1,
        userId: userId,
        createdDate: 1539688029817,
        id: orderId,
      },
      [merchantOrderCode3]: {
        checkoutOrderId: checkoutOrderId,
        merchantId: merchantId,
        merchantName: 'TOMAS MAIER MADISON',
        fpsOrderType: FpsOrderType.Farfetch,
        merchantOrderCode: merchantOrderCode3,
        returnAvailable: false,
        returnId: 26678892,
        status: OrderStatus.ReviewingOrder,
        tags: [],
        totalQuantity: 1,
        userId: userId,
        createdDate: 1534245134007,
        id: orderId2,
      },
    },
  },
  result: {
    entries: [merchantOrderCode, merchantOrderCode2, merchantOrderCode3],
    number: 1,
    totalItems: 3,
    totalPages: 1,
  },
};

export const expectedTrackingNormalizedPayload = {
  entities: {
    courier: {
      [courierId]: {
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
            type: ShipmentTrackingEventType.Pickup,
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
            type: ShipmentTrackingEventType.Pickup,
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

export const getExpectedOrderDetailsNormalizedPayload = (
  productImgQueryParam = '',
) => {
  return {
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
          gender: Gender.Woman,
          id: 135967,
          name: 'Clothing',
          parentId: 0,
        },
        135974: {
          gender: Gender.Man,
          id: 135974,
          name: 'Lifestyle',
          parentId: 0,
        },
        135981: {
          gender: Gender.Woman,
          id: 135981,
          name: 'Trousers',
          parentId: 135967,
        },
        136273: {
          gender: Gender.Woman,
          id: 136273,
          name: 'Palazzo Pants',
          parentId: 135981,
        },
        136301: {
          gender: Gender.Woman,
          id: 136301,
          name: 'Shoes',
          parentId: 0,
        },
        136308: {
          gender: Gender.Woman,
          id: 136308,
          name: 'Sandals',
          parentId: 136301,
        },
        136380: {
          gender: Gender.Man,
          id: 136380,
          name: 'Travel Accessories',
          parentId: 135974,
        },
        136383: {
          gender: Gender.Woman,
          id: 136383,
          name: 'Lifestyle',
          parentId: 0,
        },
        136392: {
          gender: Gender.Woman,
          id: 136392,
          name: 'Luggage & Travel Accessories',
          parentId: 136383,
        },
      },
      orderItems: {
        [orderItemId]: {
          attributes: mockOrderItem.attributes,
          brand: 220482,
          categories: [136301, 136308],
          colors: mockOrderItem.colors,
          creationChannel: OrderItemCreationChannel.Catalog,
          customAttributes: null,
          id: orderItemId,
          productType: 'Standard',
          saleIntent: SaleIntent.ImmediateFulfilment,
          images: [
            {
              order: 1,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
            },
            {
              order: 2,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
            },
            {
              order: 3,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
            },
            {
              order: 4,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
            },
            {
              order: 5,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
            },
          ],
          isCustomizable: false,
          isExclusive: false,
          isPreOrder: false,
          merchantId,
          merchantOrderId: merchantOrderId,
          orderItemStatus: OrderItemStatus.None,
          orderStatus: MerchantOrderStatus.CheckingStock,
          isReturnAvailable: false,
          isExchangeAvailable: false,
          merchantOrderCode: merchantOrderCode,
          productSummary: {
            productId: '12091686',
            description: 'stud sandal',
            shortDescription: 'stud sandal',
          },
          preOrder: {
            expectedFulfillmentDate: {
              startDate: 1662364800000,
              endDate: 1662364800000,
            },
            type: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          price: {
            discount: {
              excludingTaxes: 0,
              includingTaxes: 0,
              rate: 0,
            },
            excludingTaxes: 256.49,
            formatted: {
              includingTaxes: '375,00 €',
              includingTaxesWithoutDiscount: '375,00 €',
            },
            includingTaxes: 375,
            includingTaxesWithoutDiscount: 375,
            isFormatted: true,
            priceType: undefined,
            promotionType: undefined,
            taxes: {
              amount: 118.51,
              rate: 46.2071,
              type: 'DDP',
            },
            type: undefined,
            tags: ['DDP'],
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
          shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
          gift: {
            to: 'to',
            from: 'from',
            message: 'message',
          },
          tags: [],
          shortDescription: 'stud sandal',
          size: '7.5',
        },
        [orderItemId2]: {
          attributes: mockOrderItem2.attributes,
          brand: 220482,
          categories: [135967, 135981, 136273],
          colors: mockOrderItem2.colors,
          creationChannel: OrderItemCreationChannel.Catalog,
          customAttributes: null,
          id: orderItemId2,
          productType: 'Standard',
          saleIntent: SaleIntent.Backorder,
          images: [
            {
              order: 1,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg',
            },
            {
              order: 2,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg',
            },
            {
              order: 3,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg',
            },
            {
              order: 4,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg',
            },
            {
              order: 5,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg',
            },
          ],
          isCustomizable: false,
          isExclusive: false,
          isPreOrder: false,
          merchantId: merchantId2,
          merchantOrderId: merchantOrderId2,
          orderItemStatus: OrderItemStatus.None,
          orderStatus: MerchantOrderStatus.CheckingStock,
          isReturnAvailable: false,
          isExchangeAvailable: false,
          merchantOrderCode: merchantOrderCode2,
          productSummary: {
            productId: '12511241',
            description: 'wide leg pant',
            shortDescription: 'wide leg pant',
          },
          preOrder: {
            expectedFulfillmentDate: {
              startDate: 1662364800000,
              endDate: 1662364800000,
            },
            type: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          price: {
            discount: {
              excludingTaxes: 0,
              includingTaxes: 0,
              rate: 0,
            },
            excludingTaxes: 433.68,
            formatted: {
              includingTaxes: '690,00 €',
              includingTaxesWithoutDiscount: '690,00 €',
            },
            includingTaxes: 690,
            includingTaxesWithoutDiscount: 690,
            isFormatted: true,
            priceType: undefined,
            promotionType: undefined,
            tags: ['DDP'],
            taxes: {
              amount: 256.32,
              rate: 59.1032,
              type: 'DDP',
            },
            type: undefined,
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
          shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
          gift: {
            to: 'to',
            from: 'from',
            message: 'message',
          },
          tags: [],
          shortDescription: 'wide leg pant',
          size: '28',
        },
        [orderItemId3]: {
          attributes: mockOrderItem3.attributes,
          brand: 220482,
          categories: [135974, 136383, 136380, 136392],
          colors: mockOrderItem3.colors,
          creationChannel: OrderItemCreationChannel.Mail,
          customAttributes: null,
          id: orderItemId3,
          productType: 'Standard',
          saleIntent: SaleIntent.ImmediateFulfilment,
          images: [
            {
              order: 1,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg',
            },
            {
              order: 2,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg',
            },
            {
              order: 3,
              size: '200',
              sources: {
                200: `https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg${productImgQueryParam}`,
              },
              url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg',
            },
          ],
          isCustomizable: false,
          isExclusive: false,
          isPreOrder: false,
          merchantId,
          merchantOrderId: merchantOrderId2,
          orderItemStatus: OrderItemStatus.None,
          orderStatus: MerchantOrderStatus.CheckingStock,
          isReturnAvailable: false,
          isExchangeAvailable: false,
          merchantOrderCode: merchantOrderCode3,
          productSummary: {
            productId: '12092633',
            description: 'beach sheet',
            shortDescription: 'beach sheet',
          },
          preOrder: {
            expectedFulfillmentDate: {
              startDate: 1662364800000,
              endDate: 1662364800000,
            },
            type: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          price: {
            discount: {
              excludingTaxes: 0,
              includingTaxes: 0,
              rate: 0,
            },
            excludingTaxes: 111.26,
            formatted: {
              includingTaxes: '160,00 €',
              includingTaxesWithoutDiscount: '160,00 €',
            },
            includingTaxes: 160,
            includingTaxesWithoutDiscount: 160,
            isFormatted: true,
            priceType: undefined,
            promotionType: undefined,
            tags: ['DDP'],
            taxes: {
              amount: 48.74,
              rate: 43.8107,
              type: 'DDP',
            },
            type: undefined,
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
          shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
          gift: {
            to: 'to',
            from: 'from',
            message: 'message',
          },
          tags: [],
          shortDescription: 'beach sheet',
          size: 'OS',
        },
      },
      orders: {
        [orderId]: {
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
            isCurrentShipping: false,
            isCurrentPreferred: false,
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
          checkoutOrderId: 15338048,
          createdDate: 1539688029817,
          credit: 0,
          currency: 'EUR',
          customerType: 'Normal',
          formattedCredit: '0,00 €',
          formattedGrandTotal: '1 225,00 €',
          formattedSubTotalAmount: '1 225,00 €',
          formattedSubTotalAmountExclTaxes: '801,43 €',
          formattedTotalDiscount: '0,00 €',
          formattedTotalDomesticTaxes: '0,00 €',
          formattedTotalShippingFee: '0,00 €',
          formattedTotalTaxes: '423,57 €',
          grandTotal: 1225,
          id: orderId,
          items: [orderItemId, orderItemId2, orderItemId3],
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
            isCurrentShipping: false,
            isCurrentPreferred: false,
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
          updatedDate: 1539688029817,
          userId,
          fpsOrderType: FpsOrderType.Farfetch,
        },
      },
    },
    result: orderId,
  };
};

export const expectedOrderReturnOptionsNormalizedPayload = {
  entities: {
    returnOptions: {
      [merchantOrderId]: {
        options: [
          {
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
                subRegion: '',
              },
            ],
            isAddressMandatory: true,
            isMerchantLocationMandatory: false,
            isNumberOfBoxesMandatory: true,
            isSchedulePickup: true,
            type: ReturnOptionType.CourierPickUp,
          },
        ],
        merchantId: 10537,
        merchantOrderId,
        orderId: '3558DS',
      },
      [merchantOrderId2]: {
        options: [
          {
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
                subRegion: '',
              },
            ],
            type: ReturnOptionType.InStore,
            isAddressMandatory: false,
            isMerchantLocationMandatory: true,
            isNumberOfBoxesMandatory: false,
            isSchedulePickup: false,
          },
        ],
        merchantId: 10538,
        merchantOrderId: merchantOrderId2,
        orderId: '3558DS',
      },
    },
  },
  result: [merchantOrderId, merchantOrderId2],
};

export const expectedGuestOrdersNormalizedPayload = {
  entities: {
    brands: {
      '3440': {
        description: 'DOLCE & GABBANA',
        id: 3440,
        name: 'Dolce & Gabbana',
        priceType: 0,
        isActive: false,
      },
      '220482': {
        description: 'German born Tomas Maier headed to Paris.',
        id: 220482,
        name: 'Tomas Maier',
        priceType: 0,
      },
    },
    categories: {
      '135967': {
        gender: Gender.Woman,
        id: 135967,
        name: 'Clothing',
        parentId: 0,
      },
      '135974': {
        gender: Gender.Man,
        id: 135974,
        name: 'Lifestyle',
        parentId: 0,
      },
      '135981': {
        gender: Gender.Woman,
        id: 135981,
        name: 'Trousers',
        parentId: 135967,
      },
      '136273': {
        gender: Gender.Woman,
        id: 136273,
        name: 'Palazzo Pants',
        parentId: 135981,
      },
      '136301': {
        gender: Gender.Woman,
        id: 136301,
        name: 'Shoes',
        parentId: 0,
      },
      '136308': {
        gender: Gender.Woman,
        id: 136308,
        name: 'Sandals',
        parentId: 136301,
      },
      '136330': {
        id: 136330,
        name: 'Clothing',
        parentId: 0,
        gender: Gender.Man,
      },
      '136335': {
        id: 136335,
        name: 'Jackets',
        parentId: 136330,
        gender: Gender.Man,
      },
      '136380': {
        gender: Gender.Man,
        id: 136380,
        name: 'Travel Accessories',
        parentId: 135974,
      },
      '136383': {
        gender: Gender.Woman,
        id: 136383,
        name: 'Lifestyle',
        parentId: 0,
      },
      '136392': {
        gender: Gender.Woman,
        id: 136392,
        name: 'Luggage & Travel Accessories',
        parentId: 136383,
      },
      '136402': {
        id: 136402,
        name: 'Blazers',
        parentId: 136335,
        gender: Gender.Man,
      },
    },
    orderItems: {
      [orderItemId]: {
        customAttributes: null,
        productType: 'Standard',
        saleIntent: SaleIntent.ImmediateFulfilment,
        images: [
          {
            order: 1,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg?c=2',
            },
          },
          {
            order: 2,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg?c=2',
            },
          },
          {
            order: 3,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg?c=2',
            },
          },
          {
            order: 4,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg?c=2',
            },
          },
          {
            order: 5,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg?c=2',
            },
          },
        ],
        merchantId,
        price: {
          discount: { excludingTaxes: 0, includingTaxes: 0, rate: 0 },
          excludingTaxes: 256.49,
          formatted: {
            includingTaxes: '375,00 €',
            includingTaxesWithoutDiscount: '375,00 €',
          },
          includingTaxes: 375,
          includingTaxesWithoutDiscount: 375,
          priceType: undefined,
          promotionType: undefined,
          tags: ['DDP'],
          taxes: { amount: 118.51, rate: 46.2071, type: 'DDP' },
          type: undefined,
          isFormatted: true,
        },
        attributes: [
          {
            description: 'Scale',
            type: ProductVariantAttributeType.Scale,
            value: '204',
          },
          {
            description: 'Size',
            type: ProductVariantAttributeType.Size,
            value: '24',
          },
          {
            description: 'SizeDescription',
            type: ProductVariantAttributeType.SizeDescription,
            value: '7.5',
          },
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
        creationChannel: OrderItemCreationChannel.Catalog,
        id: orderItemId,
        isCustomizable: false,
        isExclusive: false,
        merchantOrderId: 100001339,
        orderItemStatus: 'None',
        orderStatus: 'CheckingStock',
        isReturnAvailable: false,
        isExchangeAvailable: false,
        merchantOrderCode: merchantOrderCode,
        productSummary: {
          productId: '12091686',
          description: 'stud sandal',
          shortDescription: 'stud sandal',
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
            endDate: 1662364800000,
            startDate: 1662364800000,
          },
          type: { type: 'string' },
          status: { type: 'string' },
        },
        shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
        shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
        gift: { to: 'to', from: 'from', message: 'message' },
      },
      [orderItemId2]: {
        customAttributes: null,
        productType: 'Standard',
        saleIntent: SaleIntent.Backorder,
        images: [
          {
            order: 1,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981398_200.jpg?c=2',
            },
          },
          {
            order: 2,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981399_200.jpg?c=2',
            },
          },
          {
            order: 3,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981401_200.jpg?c=2',
            },
          },
          {
            order: 4,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981402_200.jpg?c=2',
            },
          },
          {
            order: 5,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/51/12/41/12511241_11981404_200.jpg?c=2',
            },
          },
        ],
        merchantId: merchantId2,
        price: {
          discount: { excludingTaxes: 0, includingTaxes: 0, rate: 0 },
          excludingTaxes: 433.68,
          formatted: {
            includingTaxes: '690,00 €',
            includingTaxesWithoutDiscount: '690,00 €',
          },
          includingTaxes: 690,
          includingTaxesWithoutDiscount: 690,
          priceType: undefined,
          promotionType: undefined,
          tags: ['DDP'],
          taxes: { amount: 256.32, rate: 59.1032, type: 'DDP' },
          type: undefined,
          isFormatted: true,
        },
        attributes: [
          {
            description: 'Scale',
            type: ProductVariantAttributeType.Scale,
            value: '125',
          },
          {
            description: 'Size',
            type: ProductVariantAttributeType.Size,
            value: '23',
          },
          {
            description: 'SizeDescription',
            type: ProductVariantAttributeType.SizeDescription,
            value: '28',
          },
        ],
        brand: 220482,
        categories: [135967, 135981, 136273],
        colors: [
          {
            color: { id: 112495, name: 'Black' },
            tags: ['MainColor'],
          },
          {
            color: { id: 0, name: '9100 CHALK' },
            tags: ['DesignerColor'],
          },
        ],
        creationChannel: OrderItemCreationChannel.Catalog,
        id: orderItemId2,
        isCustomizable: false,
        isExclusive: false,
        merchantOrderId: 100001340,
        orderItemStatus: 'None',
        orderStatus: 'CheckingStock',
        isReturnAvailable: false,
        isExchangeAvailable: false,
        merchantOrderCode: merchantOrderCode2,
        productSummary: {
          productId: '12511241',
          description: 'wide leg pant',
          shortDescription: 'wide leg pant',
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
            endDate: 1662364800000,
            startDate: 1662364800000,
          },
          type: { type: 'string' },
          status: { type: 'string' },
        },
        shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
        shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
        gift: { to: 'to', from: 'from', message: 'message' },
      },
      [orderItemId3]: {
        customAttributes: null,
        productType: 'Standard',
        saleIntent: SaleIntent.ImmediateFulfilment,
        images: [
          {
            order: 1,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778720_200.jpg?c=2',
            },
          },
          {
            order: 2,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778718_200.jpg?c=2',
            },
          },
          {
            order: 3,
            size: '200',
            url: 'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg',
            sources: {
              '200':
                'https://cdn-images.farfetch.com/12/09/26/33/12092633_10778716_200.jpg?c=2',
            },
          },
        ],
        merchantId,
        price: {
          discount: { excludingTaxes: 0, includingTaxes: 0, rate: 0 },
          excludingTaxes: 111.26,
          formatted: {
            includingTaxes: '160,00 €',
            includingTaxesWithoutDiscount: '160,00 €',
          },
          includingTaxes: 160,
          includingTaxesWithoutDiscount: 160,
          priceType: undefined,
          promotionType: undefined,
          tags: ['DDP'],
          taxes: { amount: 48.74, rate: 43.8107, type: 'DDP' },
          type: undefined,
          isFormatted: true,
        },
        attributes: [
          {
            description: 'Scale',
            type: ProductVariantAttributeType.Scale,
            value: '14',
          },
          {
            description: 'Size',
            type: ProductVariantAttributeType.Size,
            value: '17',
          },
          {
            description: 'SizeDescription',
            type: ProductVariantAttributeType.SizeDescription,
            value: 'OS',
          },
        ],
        brand: 220482,
        categories: [135974, 136383, 136380, 136392],
        colors: [
          {
            color: { id: 112495, name: 'Black' },
            tags: ['MainColor'],
          },
          {
            color: { id: 0, name: 'GRAPHITE' },
            tags: ['DesignerColor'],
          },
        ],
        creationChannel: OrderItemCreationChannel.Mail,
        id: orderItemId3,
        isCustomizable: false,
        isExclusive: false,
        merchantOrderId: 100001340,
        orderItemStatus: 'None',
        orderStatus: 'CheckingStock',
        isReturnAvailable: false,
        isExchangeAvailable: false,
        merchantOrderCode: merchantOrderCode3,
        productSummary: {
          productId: '12511241',
          description: 'beach sheet',
          shortDescription: 'beach sheet',
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
            endDate: 1662364800000,
            startDate: 1662364800000,
          },
          type: { type: 'string' },
          status: { type: 'string' },
        },
        shippingOrderId: 'e04db551-23fb-43c4-8950-6aaee1dbae73',
        shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
        gift: { to: 'to', from: 'from', message: 'message' },
      },
      '36898703': {
        customAttributes: '',
        productType: 'Standard',
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_54.jpg',
            sources: {
              '54': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_54.jpg?c=2',
              '58': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_58.jpg?c=2',
              '70': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_70.jpg?c=2',
              '80': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_80.jpg?c=2',
              '114':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_114.jpg?c=2',
              '120':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_120.jpg?c=2',
              '170':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_170.jpg?c=2',
              '180':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_180.jpg?c=2',
              '190':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_190.jpg?c=2',
              '200':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_200.jpg?c=2',
              '240':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_240.jpg?c=2',
              '250':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_250.jpg?c=2',
              '255':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_255.jpg?c=2',
              '300':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_300.jpg?c=2',
              '322':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_322.jpg?c=2',
              '330':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_330.jpg?c=2',
              '350':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_350.jpg?c=2',
              '400':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_400.jpg?c=2',
              '480':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_480.jpg?c=2',
              '500':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_500.jpg?c=2',
              '600':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_600.jpg?c=2',
              '800':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_800.jpg?c=2',
              '1000':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585146_1000.jpg?c=2',
            },
          },
          {
            order: 2,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_54.jpg',
            sources: {
              '54': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_54.jpg?c=2',
              '58': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_58.jpg?c=2',
              '70': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_70.jpg?c=2',
              '80': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_80.jpg?c=2',
              '114':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_114.jpg?c=2',
              '120':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_120.jpg?c=2',
              '170':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_170.jpg?c=2',
              '180':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_180.jpg?c=2',
              '190':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_190.jpg?c=2',
              '200':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_200.jpg?c=2',
              '240':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_240.jpg?c=2',
              '250':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_250.jpg?c=2',
              '255':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_255.jpg?c=2',
              '300':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_300.jpg?c=2',
              '322':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_322.jpg?c=2',
              '330':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_330.jpg?c=2',
              '350':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_350.jpg?c=2',
              '400':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_400.jpg?c=2',
              '480':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_480.jpg?c=2',
              '500':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_500.jpg?c=2',
              '600':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_600.jpg?c=2',
              '800':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_800.jpg?c=2',
              '1000':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585148_1000.jpg?c=2',
            },
          },
          {
            order: 3,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_54.jpg',
            sources: {
              '54': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_54.jpg?c=2',
              '58': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_58.jpg?c=2',
              '70': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_70.jpg?c=2',
              '80': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_80.jpg?c=2',
              '114':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_114.jpg?c=2',
              '120':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_120.jpg?c=2',
              '170':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_170.jpg?c=2',
              '180':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_180.jpg?c=2',
              '190':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_190.jpg?c=2',
              '200':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_200.jpg?c=2',
              '240':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_240.jpg?c=2',
              '250':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_250.jpg?c=2',
              '255':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_255.jpg?c=2',
              '300':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_300.jpg?c=2',
              '322':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_322.jpg?c=2',
              '330':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_330.jpg?c=2',
              '350':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_350.jpg?c=2',
              '400':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_400.jpg?c=2',
              '480':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_480.jpg?c=2',
              '500':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_500.jpg?c=2',
              '600':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_600.jpg?c=2',
              '800':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_800.jpg?c=2',
              '1000':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585150_1000.jpg?c=2',
            },
          },
          {
            order: 4,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_54.jpg',
            sources: {
              '54': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_54.jpg?c=2',
              '58': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_58.jpg?c=2',
              '70': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_70.jpg?c=2',
              '80': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_80.jpg?c=2',
              '114':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_114.jpg?c=2',
              '120':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_120.jpg?c=2',
              '170':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_170.jpg?c=2',
              '180':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_180.jpg?c=2',
              '190':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_190.jpg?c=2',
              '200':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_200.jpg?c=2',
              '240':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_240.jpg?c=2',
              '250':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_250.jpg?c=2',
              '255':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_255.jpg?c=2',
              '300':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_300.jpg?c=2',
              '322':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_322.jpg?c=2',
              '330':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_330.jpg?c=2',
              '350':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_350.jpg?c=2',
              '400':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_400.jpg?c=2',
              '480':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_480.jpg?c=2',
              '500':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_500.jpg?c=2',
              '600':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_600.jpg?c=2',
              '800':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_800.jpg?c=2',
              '1000':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585151_1000.jpg?c=2',
            },
          },
          {
            order: 5,
            size: '54',
            url: 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_54.jpg',
            sources: {
              '54': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_54.jpg?c=2',
              '58': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_58.jpg?c=2',
              '70': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_70.jpg?c=2',
              '80': 'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_80.jpg?c=2',
              '114':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_114.jpg?c=2',
              '120':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_120.jpg?c=2',
              '170':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_170.jpg?c=2',
              '180':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_180.jpg?c=2',
              '190':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_190.jpg?c=2',
              '200':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_200.jpg?c=2',
              '240':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_240.jpg?c=2',
              '250':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_250.jpg?c=2',
              '255':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_255.jpg?c=2',
              '300':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_300.jpg?c=2',
              '322':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_322.jpg?c=2',
              '330':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_330.jpg?c=2',
              '350':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_350.jpg?c=2',
              '400':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_400.jpg?c=2',
              '480':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_480.jpg?c=2',
              '500':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_500.jpg?c=2',
              '600':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_600.jpg?c=2',
              '800':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_800.jpg?c=2',
              '1000':
                'https://cdn-images.farfetch-contents.com/11/83/12/74/11831274_14585153_1000.jpg?c=2',
            },
          },
        ],
        merchantId: 11554,
        price: {
          discount: { excludingTaxes: 0, includingTaxes: 0, rate: 0 },
          excludingTaxes: 0.81,
          formatted: {
            includingTaxes: '1 €',
            includingTaxesWithoutDiscount: '1 €',
          },
          includingTaxes: 1,
          includingTaxesWithoutDiscount: 1,
          priceType: undefined,
          promotionType: undefined,
          tags: ['DDP', 'VAT'],
          taxes: { amount: 0.19, rate: 23, type: 'VAT_DDP' },
          type: undefined,
          isFormatted: true,
        },
        id: 36898703,
        merchantOrderId: 123095473,
        productId: 11831274,
        attributes: [
          {
            type: ProductVariantAttributeType.Scale,
            value: '16260',
            description: 'Scale',
          },
          {
            type: ProductVariantAttributeType.Size,
            value: '20',
            description: 'Size',
          },
          {
            type: ProductVariantAttributeType.SizeDescription,
            value: '48',
            description: 'SizeDescription',
          },
        ],
        orderStatus: 'Cancelled',
        orderItemStatus: 'None',
        creationChannel: 'Catalog',
        shippingService: {
          description: 'DHL Ground',
          id: 44,
          name: 'DHL Ground',
          type: 'DHL Ground',
          minEstimatedDeliveryHour: 72,
          maxEstimatedDeliveryHour: 168,
          trackingCodes: [],
        },
        isReturnAvailable: false,
        isExchangeAvailable: false,
        returnRestriction: 'BlockedByWorkflow',
        isCustomizable: false,
        isExclusive: false,
        size: '48',
        brand: 3440,
        shortDescription: 'logo crown blazer',
        categories: [136330, 136335, 136402],
        productSummary: {
          productId: '11831274',
          description: 'logo crown blazer',
          shortDescription: 'logo crown blazer',
        },
        colors: [
          {
            color: { id: 112495, name: 'Black' },
            tags: ['MainColor'],
          },
          {
            color: { id: 35069, name: 'N0000' },
            tags: ['DesignerColor'],
          },
        ],
        productSlug: 'logo-crown-blazer-11831274',
        merchantOrderCode: 'PZ1123095473',
        tags: [],
        isPreOrder: false,
        shippingOrderId: '00000000-0000-0000-0000-000000000000',
        shippingOrderLineId: '380709f9-2ce0-4a22-8ea9-d01666088fb8',
      },
    },
    orders: {
      '3558DS': {
        checkoutOrderId: 15338048,
        billingAddress: {
          addressLine1: 'Uma rua em Gaia',
          addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
          city: { countryId: 165, id: 0, name: 'Canidelo' },
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
          state: { code: 'Porto', countryId: 0, id: 0, name: 'Porto' },
          useShippingAsBillingAddress: false,
          userId: 0,
          vatNumber: '123456789',
          zipCode: '1234-567',
        },
        createdDate: 1539688029817,
        credit: 0,
        currency: 'EUR',
        customerType: 'Normal',
        formattedCredit: '0,00 €',
        formattedGrandTotal: '1 225,00 €',
        formattedSubTotalAmount: '1 225,00 €',
        formattedTotalDiscount: '0,00 €',
        formattedTotalDomesticTaxes: '0,00 €',
        formattedTotalShippingFee: '0,00 €',
        formattedTotalTaxes: '423,57 €',
        grandTotal: 1225,
        id: '3558DS',
        items: [10070161, 10070162, 10070163],
        newsletterSubscriptionOptionDefault: false,
        paymentId: 'TMADRWWJX2DPH2M7CTUX',
        shippingAddress: {
          addressLine1: 'Uma rua em Gaia',
          addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
          city: { countryId: 165, id: 0, name: 'Canidelo' },
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
          state: { code: 'Porto', countryId: 0, id: 0, name: 'Porto' },
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
        updatedDate: 1539688029817,
        userId,
      },
      DVN7EE: {
        id: 'DVN7EE',
        checkoutOrderId: 126892294,
        userId,
        paymentIntentIds: ['073257f2-11a8-4c24-8084-67a8d901b13e'],
        currency: 'EUR',
        shippingAddress: {
          id: '00000000-0000-0000-0000-000000000000',
          firstName: 'John',
          lastName: 'Doe',
          addressLine1: 'Rua As Camponesas do Corvo 1',
          addressLine2: 'Arcozelo 1',
          city: { id: 0, name: 'Vila Nova de Gaia', countryId: 165 },
          state: { id: 0, code: 'Porto', name: 'Porto', countryId: 0 },
          country: {
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            culture: 'pt-PT',
            region: 'Europe',
            continentId: 3,
          },
          zipCode: '4410-432',
          phone: '32131231231',
          addressType: AddressType.Any,
          isCurrentShipping: false,
          isCurrentBilling: false,
          isCurrentPreferred: false,
          createdDate: '0001-01-01T00:00:00Z',
        },
        billingAddress: {
          id: '00000000-0000-0000-0000-000000000000',
          firstName: 'John',
          lastName: 'Doe',
          addressLine1: 'Rua As Camponesas do Corvo 1',
          addressLine2: 'Arcozelo 1',
          city: { id: 0, name: 'Vila Nova de Gaia', countryId: 165 },
          state: { id: 0, code: 'Porto', name: 'Porto', countryId: 0 },
          country: {
            id: 165,
            name: 'Portugal',
            nativeName: 'Portugal',
            alpha2Code: 'PT',
            alpha3Code: 'PRT',
            culture: 'pt-PT',
            region: 'Europe',
            continentId: 3,
          },
          zipCode: '4410-432',
          phone: '32131231231',
          addressType: AddressType.Any,
          isCurrentShipping: false,
          isCurrentBilling: false,
          isCurrentPreferred: false,
          createdDate: '0001-01-01T00:00:00Z',
        },
        createdDate: 1615823452567,
        updatedDate: 1615823452567,
        items: [36898703],
        totalQuantity: 1,
        subTotalAmount: 1,
        totalDiscount: 0,
        totalShippingFee: 2,
        totalTaxes: 0,
        totalDomesticTaxes: 0,
        grandTotal: 3,
        credit: 0,
        customerType: 'Normal',
        subTotalAmountExclTaxes: 1,
        formattedCredit: '0 €',
        formattedGrandTotal: '3 €',
        formattedSubTotalAmount: '1 €',
        formattedTotalDiscount: '0 €',
        formattedTotalShippingFee: '2 €',
        formattedTotalTaxes: '0 €',
        formattedTotalDomesticTaxes: '0 €',
        formattedSubTotalAmountExclTaxes: '1 €',
        taxType: 'DDP',
        customerEmail: mockGuestUserEmail,
        promotionOffers: [],
      },
    },
  },
  result: ['3558DS', 'DVN7EE'],
};

export const merchantEntity = { id: merchantId, name: 'merchant' };

export const merchantEntity2 = {
  id: merchantId2,
  name: 'TOMAS MAIER BLEECKER',
};

export const returnOptionEntity = {
  ...(mockOrderReturnOptionsResponse[0] as MerchantOrderReturnOptions),
  orderId,
};

export const returnOptionEntity2 = {
  ...(mockOrderReturnOptionsResponse[1] as MerchantOrderReturnOptions),
  orderId,
};

export const returnOptionEntity3 = {
  ...(mockOrderReturnOptionsResponse[1] as MerchantOrderReturnOptions),
  merchantOrderId: merchantOrderId3,
  orderId: orderId2,
};

export const returnOptionEntityDenormalized = {
  ...returnOptionEntity,
  orderId,
  merchant: merchantEntity,
};

export const returnOptionEntity2Denormalized = {
  ...returnOptionEntity2,
  merchant: merchantEntity2,
  orderId,
};

export const returnOptionEntity3Denormalized = {
  ...returnOptionEntity2,
  merchant: merchantEntity2,
  merchantOrderId: merchantOrderId3,
  orderId: orderId2,
};

export const returnId = 25741579;
export const returnId2 = 25741580;

export const returnEntity = {
  id: returnId,
  availableDates: [],
  orderId,
  merchantId,
  userId,
  type: ReturnOptionType.Courier,
  status: ReturnStatus.Accepted,
  courier: 'NotKnown',
  numberOfBoxes: 0,
  numberOfItems: 1,
  maximumDateForPickup: 1641654613690,
  items: [orderItemId],
  createdDate: 1641222613660,
  awbUrl: '/account/v1/returns/25741579/AWB',
  invoiceUrl: '/account/v1/returns/25741579/Invoice',
  references: [
    {
      name: ReturnReferenceName.ReturnNote,
      url: '/account/v1/returns/25741579/references/ReturnNote',
    },
  ],
  returnStatus: {
    code: ReturnStatusCode.Accepted,
  },
};

export const returnEntity2 = {
  id: returnId2,
  availableDates: [],
  orderId,
  merchantId: merchantId2,
  userId,
  type: ReturnOptionType.Courier,
  status: ReturnStatus.Accepted,
  courier: 'NotKnown',
  numberOfBoxes: 0,
  numberOfItems: 1,
  maximumDateForPickup: 1641654613690,
  items: [orderItemId2],
  createdDate: 1641222613660,
  awbUrl: '/account/v1/returns/25741579/AWB',
  invoiceUrl: '/account/v1/returns/25741579/Invoice',
  references: [
    {
      name: ReturnReferenceName.ReturnNote,
      url: '/account/v1/returns/25741579/references/ReturnNote',
    },
  ],
  returnStatus: {
    code: ReturnStatusCode.Accepted,
  },
};

export const returnItemId = 32283248;
export const returnItemId2 = 32283249;

export const returnItemEntity = {
  id: returnItemId,
  orderItemId,
  reason: "Item doesn't fit",
  description: 'Fits too big',
  status: ReturnItemStatus.Created,
  itemStatus: {
    code: ReturnItemStatus.Created,
  },
};

export const returnItemEntity2 = {
  id: returnItemId2,
  orderItemId: orderItemId2,
  reason: "Item doesn't fit",
  description: 'Fits too big',
  status: ReturnItemStatus.Created,
  itemStatus: {
    code: ReturnItemStatus.Created,
  },
};

export const orderEntity: OrderEntity = {
  ...mockOrderDetailsResponse,
  createdDate: 1539688029817,
  updatedDate: 1539688029817,
  items: [orderItemId, orderItemId2],
  shippingAddress: {
    ...mockOrderDetailsResponse.shippingAddress,
  },
  billingAddress: {
    ...mockOrderDetailsResponse.billingAddress,
  },
};

export const orderEntity2: OrderEntity = {
  ...mockOrderDetailsResponse,
  createdDate: 1539688029817,
  updatedDate: 1539688029817,
  items: [orderItemId, orderItemId2],
  shippingAddress: {
    ...mockOrderDetailsResponse.shippingAddress,
  },
  billingAddress: {
    ...mockOrderDetailsResponse.billingAddress,
  },
  id: orderId2,
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

const mockOrderItemEntityImages = [
  {
    order: 1,
    size: '200',
    url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
    sources: {
      '200':
        'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099951_200.jpg',
    },
  },
  {
    order: 2,
    size: '200',
    url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
    sources: {
      '200':
        'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099952_200.jpg',
    },
  },
  {
    order: 3,
    size: '200',
    url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
    sources: {
      '200':
        'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099953_200.jpg',
    },
  },
  {
    order: 4,
    size: '200',
    url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
    sources: {
      '200':
        'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099954_200.jpg',
    },
  },
  {
    order: 5,
    size: '200',
    url: 'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
    sources: {
      '200':
        'https://cdn-images.farfetch.com/12/09/16/86/12091686_11099955_200.jpg',
    },
  },
];

export const orderItemEntity = {
  ...mockOrderItem,
  brand: 220482,
  categories: [136301, 136308],
  images: mockOrderItemEntityImages,
  price: {
    ...mockOrderItem.price,
    formatted: {
      includingTaxes: '375 €',
      includingTaxesWithoutDiscount: '375 €',
    },
    includingTaxes: 375,
    includingTaxesWithoutDiscount: 375,
    isFormatted: true,
    taxes: {
      type: 'DDP',
      rate: 46.2071,
      amount: 118.51,
    },
  },
  merchant: merchantId,
  productAggregator: { images: mockOrderItemEntityImages },
  preOrder: {
    expectedFulfillmentDate: {
      startDate: 1662544285853,
      endDate: 1662544285853,
    },
  },
};

export const orderItemEntity2 = {
  ...mockOrderItem2,
  brand: 220482,
  categories: [136301, 136308],
  images: mockOrderItemEntityImages,
  price: {
    ...mockOrderItem2.price,
    formatted: {
      includingTaxes: '375 €',
      includingTaxesWithoutDiscount: '375 €',
    },
    includingTaxes: 375,
    includingTaxesWithoutDiscount: 375,
    isFormatted: true,
    taxes: {
      amount: 0,
      rate: 0,
      type: 'DAP',
    },
  },
  merchant: merchantId2,
  productAggregator: { images: mockOrderItemEntityImages },
  preOrder: {
    expectedFulfillmentDate: {
      startDate: 1662544285853,
      endDate: 1662544285853,
    },
  },
};

export const orderSummary: OrderSummaryEntity = {
  checkoutOrderId: checkoutOrderId,
  merchantId,
  merchantName: 'TOMAS MAIER MADISON',
  fpsOrderType: FpsOrderType.Farfetch,
  createdDate: 1539688029817,
  merchantOrderCode,
  returnAvailable: false,
  returnId,
  status: OrderStatus.ReviewingOrder,
  tags: [],
  totalQuantity: 2,
  userId,
  id: orderId,
};

export const orderSummary2: OrderSummaryEntity = {
  checkoutOrderId: checkoutOrderId,
  merchantId: merchantId2,
  merchantName: 'TOMAS MAIER BLEECKER',
  fpsOrderType: FpsOrderType.Farfetch,
  merchantOrderCode: merchantOrderCode2,
  returnAvailable: false,
  returnId: 26678630,
  status: OrderStatus.ReviewingOrder,
  tags: [],
  totalQuantity: 1,
  userId,
  createdDate: 1539688029817,
  id: orderId,
};

export const orderSummary3: OrderSummaryEntity = {
  checkoutOrderId: checkoutOrderId,
  merchantId: 123456,
  merchantName: 'FAKE MERCHANT',
  fpsOrderType: FpsOrderType.Farfetch,
  merchantOrderCode: merchantOrderCode3,
  returnAvailable: false,
  status: OrderStatus.ReviewingOrder,
  tags: [],
  totalQuantity: 1,
  userId,
  createdDate: 1534245134007,
  id: orderId2,
};

export const countryEntity = {
  code: countryCode,
  name: 'Portugal',
  nativeName: 'Portugal',
  structures: ['/en-pt'],
  platformId: 165,
  isDefault: false,
  newsletterSubscriptionOptionDefault: true,
  isCountryDefault: false,
  continentId: 3,
  currencies: [
    {
      id: 1,
      name: 'Euro Member Countries',
      isoCode: 'EUR',
      cultureCode: 'de-DE',
      symbol: '€',
    },
  ],
  cultures: ['en-US'],
  defaultSubfolder: '/en-pt',
  defaultCulture: 'en-US',
};

export const defaultHashedQuery = `${userId}|1|60`;

export const mockState = {
  orders: {
    error: { [defaultHashedQuery]: null },
    isLoading: { [defaultHashedQuery]: false },
    result: {
      [defaultHashedQuery]: {
        entries: [merchantOrderCode, merchantOrderCode2, merchantOrderCode3],
        number: 1,
        totalItems: 3,
        totalPages: 1,
      },
    },
    orderDetails: {
      error: { [orderId]: null },
      isLoading: { [orderId]: false },
    },
    orderReturnOptions: {
      error: { [orderId]: null },
      isLoading: { [orderId]: false },
      result: {
        [orderId]: [merchantOrderId, merchantOrderId2],
        [orderId2]: [merchantOrderId3],
      },
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
    brands: {
      220482: {
        description: 'German born Tomas Maier headed to Paris.',
        id: 220482,
        name: 'Tomas Maier',
        priceType: 0,
      },
    },
    categories: {
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
    },
    courier: {
      [courierId]: courierEntity,
    },
    labelTracking: {
      [trackingNumber]: labelTrackingEntity,
    },
    orderSummaries: {
      [merchantOrderCode]: orderSummary,
      [merchantOrderCode2]: orderSummary2,
      [merchantOrderCode3]: orderSummary3,
    },
    orders: {
      [orderId]: orderEntity,
      [orderId2]: orderEntity2,
    },
    merchants: {
      [merchantId]: merchantEntity,
      [merchantId2]: merchantEntity2,
    },
    orderItems: {
      [orderItemId]: orderItemEntity,
      [orderItemId2]: orderItemEntity2,
    },
    countries: {
      [countryCode]: countryEntity,
    },
    returnOptions: {
      [merchantOrderId]: returnOptionEntity,
      [merchantOrderId2]: returnOptionEntity2,
      [merchantOrderId3]: returnOptionEntity3,
    },
    returnItems: {
      [returnItemId]: returnItemEntity,
      [returnItemId2]: returnItemEntity2,
    },
    returns: { [returnId]: returnEntity, [returnId2]: returnEntity2 },
    user: userEntity,
  },
};

export const mockOrderItemEntityDenormalized = {
  ...orderItemEntity,
  brand: mockState.entities?.brands?.[220482],
  categories: [
    mockState.entities?.categories?.[136301],
    mockState.entities?.categories?.[136308],
  ],
  merchant: mockState.entities?.merchants?.[merchantId],
};

export const mockOrderItemEntity2Denormalized = {
  ...orderItemEntity2,
  brand: mockState.entities?.brands?.[220482],
  categories: [
    mockState.entities?.categories?.[136301],
    mockState.entities?.categories?.[136308],
  ],
  merchant: mockState.entities?.merchants?.[merchantId2],
};

export const orderEntityDenormalized = {
  billingAddress: {
    addressLine1: 'Uma rua em Gaia',
    addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
    city: { countryId: 165, id: 0, name: 'Canidelo' },
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
    state: { code: 'Porto', countryId: 0, id: 0, name: 'Porto' },
    useShippingAsBillingAddress: false,
    userId: 0,
    vatNumber: '123456789',
    zipCode: '1234-567',
  },
  checkoutOrderId: 15338048,
  createdDate: 1539688029817,
  credit: 0,
  currency: 'EUR',
  customerType: 'Normal',
  formattedCredit: '0,00 €',
  formattedGrandTotal: '1 225,00 €',
  formattedSubTotalAmount: '1 225,00 €',
  formattedSubTotalAmountExclTaxes: '801,43 €',
  formattedTotalDiscount: '0,00 €',
  formattedTotalDomesticTaxes: '0,00 €',
  formattedTotalShippingFee: '0,00 €',
  formattedTotalTaxes: '423,57 €',
  grandTotal: 1225,
  newsletterSubscriptionOptionDefault: false,
  paymentId: 'TMADRWWJX2DPH2M7CTUX',
  subTotalAmount: 1225,
  taxType: 'DDP',
  totalDiscount: 0,
  totalDomesticTaxes: 0,
  totalQuantity: 3,
  totalShippingFee: 0,
  totalTaxes: 423.57,
  updatedDate: 1539688029817,
  userId,
  id: '3558DS',
  items: [mockOrderItemEntityDenormalized, mockOrderItemEntity2Denormalized],
  shippingAddress: {
    addressLine1: 'Uma rua em Gaia',
    addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
    city: { countryId: 165, id: 0, name: 'Canidelo' },
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
    state: { code: 'Porto', countryId: 0, id: 0, name: 'Porto' },
    useShippingAsBillingAddress: false,
    userId: 0,
    vatNumber: '123456789',
    zipCode: '1234-567',
  },
  fpsOrderType: FpsOrderType.Farfetch,
};

export const orderEntityDenormalized2 = {
  ...orderEntityDenormalized,
  id: orderId2,
};

export const orderSummaryEntityDenormalized = {
  checkoutOrderId,
  createdDate: 1539688029817,
  id: orderId,
  merchantId,
  merchantName: 'TOMAS MAIER MADISON',
  fpsOrderType: FpsOrderType.Farfetch,
  merchantOrderCode: 'PZ1129361393',
  returnAvailable: false,
  returnId,
  merchant: merchantEntity,
  status: 'Reviewing order',
  tags: [],
  totalQuantity: 2,
  userId,
};

export const orderSummaryEntityDenormalized2 = {
  checkoutOrderId,
  createdDate: 1539688029817,
  id: orderId,
  merchantId: merchantId2,
  merchantName: 'TOMAS MAIER BLEECKER',
  fpsOrderType: FpsOrderType.Farfetch,
  merchantOrderCode: 'PZ1128781830',
  returnId: 26678630,
  merchant: merchantEntity2,
  returnAvailable: false,
  status: 'Reviewing order',
  tags: [],
  totalQuantity: 1,
  userId,
};

export const orderSummaryEntityDenormalized3 = {
  checkoutOrderId,
  createdDate: 1534245134007,
  id: orderId2,
  merchantId: 123456,
  merchantName: 'FAKE MERCHANT',
  fpsOrderType: FpsOrderType.Farfetch,
  merchantOrderCode: 'PZ1129361394',
  merchant: undefined,
  returnAvailable: false,
  status: 'Reviewing order',
  tags: [],
  totalQuantity: 1,
  userId,
};

export const expectedGetUserOrdersResultByOrderId = {
  ...mockState?.orders?.result[defaultHashedQuery],
  totalOrders: 2,
  entries: [
    {
      orderId,
      orderSummaries: [
        orderSummaryEntityDenormalized,
        orderSummaryEntityDenormalized2,
      ],
    },
    { orderId: orderId2, orderSummaries: [orderSummaryEntityDenormalized3] },
  ],
};

export const expectedGetUserOrdersResult = {
  ...mockState?.orders?.result[defaultHashedQuery],
  totalOrders: 2,
  entries: [
    orderSummaryEntityDenormalized,
    orderSummaryEntityDenormalized2,
    orderSummaryEntityDenormalized3,
  ],
};

export const mockOrderAvailableItemsActivities = [
  { itemId: orderItemId, activities: [{ type: OrderItemActivityType.None }] },
  {
    itemId: orderItemId2,
    activities: [{ type: OrderItemActivityType.Cancel }],
  },
];

export const mockOrderItemAvailableActivities = [
  mockOrderAvailableItemsActivities[0],
] as OrderItemActivities[];

export const mockOrderShippingAddressChangeRequestsResponse = [
  {
    id: changeAddressId,
    checkoutOrderId,
    orderId,
    status: OrderShippingAddressChangeRequestStatus.Approved,
    createdDate: '2023-02-22T10:07:42.91+00:00',
    updatedDate: '2023-02-22T10:07:49.05+00:00',
    merchantOrders: [
      {
        id: merchantOrderCode,
      },
    ],
    shippingAddress: {
      id: '00000000-0000-0000-0000-000000000000' as const,
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: 'Rua As Camponesas do Corvo 1',
      addressLine2: 'Arcozelo 1',
      city: { id: 0, name: 'Vila Nova de Gaia', countryId: 165 },
      state: { id: 0, code: 'Porto', name: 'Porto', countryId: 0 },
      country: {
        id: 165,
        name: 'Portugal',
        nativeName: 'Portugal',
        alpha2Code: 'PT',
        alpha3Code: 'PRT',
        culture: 'pt-PT',
        region: 'Europe',
        continentId: 3,
      },
      zipCode: '4410-432',
      phone: '32131231231',
      addressType: AddressType.Any,
      createdDate: '0001-01-01T00:00:00Z',
    },
    isForcedUpdate: false,
  },
];

export const mockOrderShippingAddressChangeRequestsPayload = {
  merchantOrders: [
    {
      id: merchantOrderCode,
    },
  ],
  shippingAddress: {
    id: '00000000-0000-0000-0000-000000000000' as const,
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: 'Rua As Camponesas do Corvo 1',
    addressLine2: 'Arcozelo 1',
    city: { id: 0, name: 'Vila Nova de Gaia', countryId: 165 },
    state: { id: 0, code: 'Porto', name: 'Porto', countryId: 0 },
    country: {
      id: 165,
      name: 'Portugal',
      nativeName: 'Portugal',
      alpha2Code: 'PT',
      alpha3Code: 'PRT',
      culture: 'pt-PT',
      region: 'Europe',
      continentId: 3,
    },
    zipCode: '4410-432',
    phone: '32131231231',
    addressType: AddressType.Any,
    createdDate: '0001-01-01T00:00:00Z',
  },
  isForcedUpdate: false,
};

import {
  adaptAttributes,
  adaptPrice,
  type PriceAdapted,
} from '@farfetch/blackout-redux/src/helpers/adapters';
import {
  type BlackoutError,
  type Category,
  ChargeDeclineCode,
  ChargeStatus,
  CheckoutOrderDeliveryWindowType,
  CheckoutOrderItemStatus,
  CheckoutOrderStatus,
  type CheckoutShippingAddress,
  CustomerTypeLegacy,
  GenderCode,
  OrderItemCreationChannelLegacy,
  OrderStatusError,
  type PatchCheckoutOrderItemsData,
  ShippingCostType,
  ShippingMode,
  UserGender,
  UserStatus,
} from '@farfetch/blackout-client';
import { mockLocaleState } from '../locale/locale.fixtures.mjs';
import type {
  CheckoutOrderDeliveryBundleEntity,
  UserEntity,
} from '@farfetch/blackout-redux';

export const checkoutId = 15338048;
export const transactionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const checkoutOrderId = 15338048;
export const checkoutOrderItemId = 30380051;
export const itemId = 987654321;
export const id = 123456;
export const operationId = '987654321';
export const upgradeId = '123456';
export const chargeId = 'eb92d414-68de-496e-96db-a0c6582b74d4';
export const deliveryBundleId = '1234';
export const merchantLocationId = 1212121212;
export const collectPointId = 999;
export const itemId1 = 0;
export const itemId2 = 1;
export const deliveryBundleUpgradeId_1 = '111';
export const deliveryBundleUpgradeId_2 = '222';
export const contextId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

const merchantId = 10658;

export const productId = 12640693;

const brandId = 121212;

const address: CheckoutShippingAddress = {
  addressLine1: 'Rua da Lionesa 446, G12',
  addressLine2: ' Teste',
  addressLine3: '',
  city: {
    countryId: 0,
    id: 0,
    name: 'Leça do Balio',
    stateId: undefined,
  },
  country: {
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    region: 'Europe',
    subRegion: undefined,
    subfolder: '/pt-PT',
    regionId: 0,
    continentId: 3,
  },
  ddd: undefined,
  firstName: 'tester',
  id: '00000000-0000-0000-0000-000000000000',
  lastName: 'teste',
  neighbourhood: undefined,
  phone: '121525125',
  state: {
    code: undefined,
    countryId: 0,
    id: 0,
    name: '',
  },
  vatNumber: undefined,
  zipCode: '4465-761',
};

const storeAddress = {
  latitude: '',
  longitude: '',
  lastName: 'last',
  addressLine1: 'Rua do Instituto Industrial 7',
  city: {
    countryId: 0,
    id: 207,
    name: 'Lisbon',
  },
  country: {
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    region: 'Portugal',
    regionId: 0,
    subfolder: 'PT',
    continentId: 0,
  },
  firstName: 'Lisbon Office',
  id: '00000000-0000-0000-0000-000000000000',
  phone: '+351 915233992',
  zipCode: '1200-225 ',
  userId: 0,
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: false,
};

export const mockItemDeliveryPorvisioningResponse = [
  {
    itemId: 95097041,
    provisioning: {
      merchantId: 9206,
      merchantLocationId: 92061,
      quantity: 1,
      deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
      deliveryDateEstimateMaximum: '2020-02-13T14:38:22.228Z',
      deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
    },
  },
  {
    itemId: 95097042,
    provisioning: {
      merchantId: 9689,
      merchantLocationId: 96891,
      quantity: 1,
      deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
      deliveryDateEstimateMaximum: '2020-02-14T14:38:22.228Z',
      deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
    },
  },
];

export const mockDeliveryBundlesResponse = [
  {
    id: '12345678',
    name: 'Basic',
    isSelected: true,
    price: 10,
    formattedPrice: '10',
    discount: 0,
    currency: 'EUR',
    rank: 1,
    finalPrice: 10,
    formattedFinalPrice: '10',
    itemsDeliveryOptions: [
      {
        itemId: 95097041,
        name: 'Standard',
        deliveryWindow: {
          type: CheckoutOrderDeliveryWindowType.Estimated,
          min: '2020-02-10T14:38:22.228Z',
          max: '2020-02-13T14:38:22.228Z',
        },
      },
      {
        itemId: 95097042,
        name: 'Standard',
        deliveryWindow: {
          type: CheckoutOrderDeliveryWindowType.Estimated,
          min: '2020-02-10T14:38:22.228Z',
          max: '2020-02-14T14:38:22.228Z',
        },
      },
    ],
    itemDeliveryProvisioning: mockItemDeliveryPorvisioningResponse,
  } as CheckoutOrderDeliveryBundleEntity,
];

const mockCheckoutOrderItem = {
  attributes: [
    {
      type: 0,
      value: '17',
      description: 'Size',
    },
    {
      type: 1,
      value: 'One Size',
      description: 'SizeDescription',
    },
  ],
  id: checkoutOrderItemId,
  brandId,
  productId: productId,
  brandName: '78 Stitches',
  checkoutOrderId: 122,
  status: CheckoutOrderItemStatus.Available,
  tags: ['GIFT'],
  quantity: 1,
  creationChannel: OrderItemCreationChannelLegacy.Mail,
  fulfillmentInfo: {
    isPreOrder: false,
    fulfillmentDate: '2020-11-06T14:19:14.4398538Z',
  },
  promocodeDiscountPercentage: 123,
  scale: '',
  sizeDescription: '',
  size: {
    id: 1,
    name: '',
    scale: 1,
    scaleDescription: '',
    scaleAbbreviation: '',
    globalQuantity: 1,
  },
  price: {
    priceExclTaxes: 185442.9802,
    priceInclTaxes: 265596.9995,
    priceInclTaxesWithoutDiscount: 265596.9995,
    discountExclTaxes: 0,
    discountInclTaxes: 0,
    discountRate: 0.0,
    taxesRate: 43.223,
    taxesValue: 80154.0193,
    tags: ['DDP'],
    taxType: 'DDP',
    formattedPrice: '$265,597.00',
    formattedPriceWithoutCurrency: '265597.00',
    formattedPriceWithoutDiscount: '$265,597.00',
    formattedPriceWithoutDiscountAndCurrency: '265597.00',
  },
  categories: [
    {
      color: {
        id: 112495,
        name: 'Black',
      },
      tags: ['MainColor'],
      id: 136301,
      name: 'Shoes',
      gender: GenderCode.Man,
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
  customAttributes: '',
  images: {
    images: [
      {
        order: 1,
        size: '54',
        url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
      },
    ],
    liveModel: null,
    liveModelId: 0,
    productSize: '1',
    tag: null,
  },
  isCustomizable: true,
  isExclusive: true,
  merchantId: 12455,
  merchantName: 'Test Merchant',
  merchantShoppingUrl: 'http://www.merchant.com',
  productAggregator: {
    id: 0,
    images: {
      images: [
        {
          order: 1,
          size: '54',
          url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
        },
      ],
      liveModelId: 0,
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
      productSize: 'M',
      tag: 'string',
    },
    bundleSlug: 'string',
  },
  productName: 'Navy Treated Bonded Cotton Dry Bag',
  productSlug: 'navy-treated-bonded-cotton-dry-bag-12640693',
  variants: [],
  promotionDetail: {
    totalDiscountValue: 0,
    isProductOffer: false,
    formattedTotalDiscountValue: '0,00 €',
    promotionEvaluationItemId: undefined,
    totalDiscountPercentage: undefined,
  },
  variantId: 'f4e60000-3a25-000d-0998-08d48da399fa',
  summary: {
    formattedGrandTotal: '265,00 €',
    formattedSubTotalAmount: '265,00 €',
    formattedSubTotalOriginalAmount: '530,00 €',
    grandTotal: 265,
    subTotalAmount: 265,
    subTotalOriginalAmount: 530,
  },
};

export const mockResponse = {
  id: checkoutId,
  checkoutOrder: {
    bagId: '187639899',
    id: checkoutOrderId,
    shippingAddress: address,
    billingAddress: address,
    checkoutOrderMerchants: [
      {
        merchantId: merchantId,
        merchantName: 'ACME WH NELSON FG',
        salesTax: 0,
        shipping: {
          currency: 'EUR',
          discount: 0,
          merchants: [merchantId],
          price: 2,
          formattedPrice: '100 €',
          shippingCostType: 5,
          shippingService: {
            description: 'abc',
            id: 187639899,
            name: 'DHL Express',
            type: 'Express',
            minEstimatedDeliveryHour: 0,
            maxEstimatedDeliveryHour: 0,
            trackingCodes: [],
          },
          shippingWithoutCapped: 0,
          baseFlatRate: 0,
        },
      },
    ],
    items: [mockCheckoutOrderItem],
    currency: 'EUR',
    customerType: CustomerTypeLegacy.Normal,
    paymentIntentId: '123',
    countryId: 165,
    createdDate: '2022-07-12T15:05:58.402Z',
    credits: [
      {
        sourceCreditValue: 0,
        sourceCurrencyId: 0,
        storeId: 0,
        targetCreditValue: 0,
        targetCurrencyId: 0,
        userId: '1234',
      },
    ],
    grandTotal: 102,
    locale: 'en-US',
    orderId: 'D7XM6Y',
    subTotalAmount: 100,
    subTotalAmountExclTaxes: 100,
    totalQuantity: 1,
    totalDiscount: 0,
    totalShippingFee: 2,
    totalTaxes: 0,
    totalDomesticTaxes: 0,
    totalCredit: 0,
    formattedGrandTotal: '102 €',
    formattedSubTotalAmount: '100 €',
    formattedSubTotalAmountExclTaxes: '100 €',
    formattedTotalDiscount: '0 €',
    formattedTotalShippingFee: '2 €',
    formattedTotalTaxes: '0 €',
    formattedTotalDomesticTaxes: '0 €',
    formattedTotalCredit: '0 €',
    taxType: 'VAT',
    updatedDate: '2022-07-12T15:05:58.8369638Z',
    userId: 0,
    clickAndCollect: {
      collectPointId: 0,
      merchantLocationId: 0,
    },
    tags: ['CLEAN_BAG'],
    hadUnavailableItems: false,
    isGuestUser: true,
    shippingMode: ShippingMode.ByMerchant,
    status: CheckoutOrderStatus.Opened,
  },
  deliveryBundles: mockDeliveryBundlesResponse,
  shippingOptions: [],
  paymentMethods: {
    customerAccounts: [],
    creditCard: {
      type: '',
      creditCards: [{ id: '', description: '', code: '' }],
      supportsInstallments: false,
      installments: [],
    },
  },
  userPaymentTokens: undefined,
  orderStatus: 0,
  '@controls': {
    operation: {
      href: `/v1/orders/${checkoutId}/operations/${operationId}`,
    },
  },
};

export const mockCharges = {
  id: '00000000-0000-0000-0000-000000000000',
  status: 'Processing',
  redirectUrl: 'some url',
  returnUrl: 'some url',
  cancelUrl: 'some url',
};

export const mockDetailsResponse = {
  checkoutOrder: {
    id: checkoutOrderId,
    shippingAddress: address,
    billingAddress: address,
    checkoutOrderMerchants: [
      {
        merchantId: merchantId,
        merchantName: 'ACME WH NELSON FG',
      },
    ],
    items: [mockCheckoutOrderItem],
  },
  registered: true,
  shippingOptions: [],
};

export const mockCollectPoint = {
  storeAddress,
  clickAndCollect: {
    collectPointId,
    merchantLocationId,
  },
  businessDays: [
    {
      hours: [
        {
          close: '17:00:00',
          open: '12:00:00',
        },
      ],
      weekday: 0,
    },
  ],
};

export const mockCollectPointsResponse = [mockCollectPoint];

export const mockCompletePaymentResponse = {
  billingAddressUsed: {},
  cancelUrl: null,
  checkoutOrderId: 0,
  confirmationRedirectUrl: null,
  createdDate: '/Date(12345)/',
  creditCard: {},
  numberOfInstallments: 0,
  paymentMethodId: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
  paymentStatus: {},
  recurringPayment: {},
  redirectUrl: null,
  savePaymentMethodAsToken: true,
  transactionId: 'MTADRWG2ZYQ3SERXJ87G',
};

export const mockDeliveryBundleUpgradesResponse = {
  95097041: {
    Estimated: [
      {
        index: 1,
        formattedPrice: '10',
        id: '123456789',
        name: 'Fast',
        isSelected: false,
        price: 10,
        currency: 'EUR',
        rank: 1,
        itemId: 95097041,
        deliveryWindow: {
          type: CheckoutOrderDeliveryWindowType.Estimated,
          min: '2019-10-09T16:20:32.303Z',
          max: '2019-10-12T16:20:32.303Z',
        },
      },
    ],
  },
  95097042: {
    Estimated: [
      {
        index: 1,
        formattedPrice: '10',
        id: '123456788',
        name: '90 min',
        isSelected: false,
        price: 10,
        currency: 'EUR',
        rank: 1,
        itemId: 95097042,
        deliveryWindow: {
          type: CheckoutOrderDeliveryWindowType.Estimated,
          min: '2019-10-09T16:20:32.303Z',
          max: '2019-10-11T16:20:32.303Z',
        },
      },
    ],
  },
};

export const operation = {
  id: 'ee8d4602-e0cf-11ec-85eb-74d29fa32cbf',
  createdDate: '2022-05-31T10:53:40.6730754Z',
  changes: [
    {
      changeType: 'ItemDiscountChanged',
      itemId: 12343,
      newValue: '0.96',
      oldValue: '0',
    },
    {
      changeType: 'TotalDiscountChanged',
      newValue: '1.92',
      oldValue: '0',
    },
  ],
  violations: [],
};

export const mockGetOperationsResponse = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [operation],
};

export const mockGetOperationActionPayload = {
  entities: {
    checkoutOrderOperations: {
      [operation.id]: operation,
    },
  },
  result: operation.id,
};

export const mockGetOperationsActionPayload = {
  entities: {
    checkoutOrderOperations: {
      [operation.id]: operation,
    },
  },
  result: {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [operation.id],
  },
};

export const expectedNormalizedPayload = {
  entities: {
    checkout: {
      [checkoutId]: { checkoutOrder: checkoutOrderId },
    },
    checkoutOrders: {
      [checkoutOrderId]: {
        id: checkoutOrderId,
        items: [checkoutOrderItemId],
      },
    },
    checkoutOrderItems: {
      [checkoutOrderItemId]: {
        id: checkoutOrderItemId,
        product: productId,
        brandName: '78 Stitches',
        tags: ['GIFT'],
      },
    },
    checkoutOrderItemProducts: {
      [productId]: {
        id: productId,
        images: [
          {
            order: 1,
            size: '54',
            sources: {
              54: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg?c=2',
            },
            url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
          },
        ],
      },
    },
  },
  result: checkoutId,
};

export const expectedItemDeliveryProvisioningNormalizedPayload = {
  entities: {
    itemDeliveryProvisioning: {
      95097041: {
        itemId: 95097041,
        provisioning: {
          merchantId: 9206,
          merchantLocationId: 92061,
          quantity: 1,
          deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
          deliveryDateEstimateMaximum: '2020-02-13T14:38:22.228Z',
          deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
        },
      },
      95097042: {
        itemId: 95097042,
        provisioning: {
          merchantId: 9689,
          merchantLocationId: 96891,
          quantity: 1,
          deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
          deliveryDateEstimateMaximum: '2020-02-14T14:38:22.228Z',
          deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
        },
      },
    },
  },
  result: [95097041, 95097042],
};

export const expectedUpgradesNormalizedPayload = {
  entities: {
    deliveryBundleUpgrades: {
      12345678: {
        95097041: {
          Estimated: [
            {
              index: 1,
              formattedPrice: '10',
              id: '123456789',
              name: 'Fast',
              isSelected: false,
              price: 10,
              currency: 'EUR',
              rank: 1,
              itemId: 95097041,
              deliveryWindow: {
                type: CheckoutOrderDeliveryWindowType.Estimated,
                min: '2019-10-09T16:20:32.303Z',
                max: '2019-10-12T16:20:32.303Z',
              },
            },
          ],
        },
        95097042: {
          Estimated: [
            {
              index: 1,
              formattedPrice: '10',
              id: '123456788',
              name: '90 min',
              isSelected: false,
              price: 10,
              currency: 'EUR',
              rank: 1,
              itemId: 95097042,
              deliveryWindow: {
                type: CheckoutOrderDeliveryWindowType.Estimated,
                min: '2019-10-09T16:20:32.303Z',
                max: '2019-10-11T16:20:32.303Z',
              },
            },
          ],
        },
      },
    },
  },
};

export const expectedUpgradesNormalizedProvisioningPayload = {
  deliveryBundleUpgrades: {
    123: {
      95097041: {
        Estimated: [
          {
            index: 1,
            formattedPrice: '10',
            id: '123456789',
            name: 'Fast',
            isSelected: false,
            price: 10,
            currency: 'EUR',
            rank: 1,
            itemId: 95097041,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Estimated,
              min: '2019-10-09T16:20:32.303Z',
              max: '2019-10-12T16:20:32.303Z',
            },
          },
        ],
        provisioning: {
          merchantId: 9206,
          merchantLocationId: 92061,
          quantity: 1,
          upgradeId: 5555,
          deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
          deliveryDateEstimateMaximum: '2020-02-13T14:38:22.228Z',
          deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
        },
      },
      95097042: {
        Estimated: [
          {
            index: 1,
            formattedPrice: '10',
            id: '123456788',
            name: '90 min',
            isSelected: false,
            price: 10,
            currency: 'EUR',
            rank: 1,
            itemId: 95097042,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Estimated,
              min: '2019-10-09T16:20:32.303Z',
              max: '2019-10-11T16:20:32.303Z',
            },
          },
        ],
        provisioning: {
          merchantId: 9689,
          merchantLocationId: 96891,
          quantity: 1,
          upgradeId: 5555,
          deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
          deliveryDateEstimateMaximum: '2020-02-14T14:38:22.228Z',
          deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
        },
      },
    },
  },
};

export const mockCheckoutDetailsEntity = {
  checkoutOrder: checkoutOrderId,
  registered: true,
  shippingOptions: [],
};

// export const checkoutOrderItemEntity = {
//   id: checkoutOrderItemId,
//   product: productId,
//   tags: ['GIFT'],
// };

export const mockCheckoutOrderItemEntity = {
  // Since a lot of properties are ommited for the CheckoutOrderItemEntity type,
  // we didn't spread the properties from the original mockCheckoutOrderItem (...mockCheckoutOrderItem)
  brandId: mockCheckoutOrderItem.brandId,
  brandName: mockCheckoutOrderItem.brandName,
  checkoutOrderId: mockCheckoutOrderItem.checkoutOrderId,
  creationChannel: mockCheckoutOrderItem.creationChannel,
  fulfillmentInfo: mockCheckoutOrderItem.fulfillmentInfo,
  id: mockCheckoutOrderItem.id,
  promocodeDiscountPercentage:
    mockCheckoutOrderItem.promocodeDiscountPercentage,
  quantity: mockCheckoutOrderItem.quantity,
  scale: mockCheckoutOrderItem.scale,
  sizeDescription: mockCheckoutOrderItem.sizeDescription,
  status: mockCheckoutOrderItem.status,
  tags: mockCheckoutOrderItem.tags,
  // CheckoutOrderItemEntity new properties
  price: adaptPrice(mockCheckoutOrderItem.price) as PriceAdapted,
  size: adaptAttributes(mockCheckoutOrderItem.attributes),
  merchant: mockCheckoutOrderItem.merchantId,
  product: productId,
  promotionDetail: {
    totalDiscountPercentage: undefined,
    totalDiscountValue: 0,
    formattedTotalDiscountValue: '0,00 €',
    isProductOffer: false,
    promotionEvaluationItemId: undefined,
  },
  variantId: 'f4e60000-3a25-000d-0998-08d48da399fa',
  summary: {
    formattedGrandTotal: '265,00 €',
    formattedSubTotalAmount: '265,00 €',
    formattedSubTotalOriginalAmount: '530,00 €',
    grandTotal: 265,
    subTotalAmount: 265,
    subTotalOriginalAmount: 530,
  },
};

export const expectedDetailsNormalizedPayload = {
  entities: {
    checkoutOrders: {
      [checkoutOrderId]: {
        id: checkoutOrderId,
        items: [checkoutOrderItemId],
      },
    },
    checkoutOrderItems: {
      [checkoutOrderItemId]: mockCheckoutOrderItemEntity,
    },
    checkoutDetails: {
      [checkoutOrderId]: mockCheckoutDetailsEntity,
    },
    checkoutOrderItemProducts: { [productId]: { id: productId } },
  },
  result: checkoutId,
};

export const mockResponsePatchOrderItemsGiftMessage: PatchCheckoutOrderItemsData =
  [
    {
      checkoutOrderItemId: 1,
      checkoutItemPatchDocument: [
        {
          value: {
            from: 'string',
            to: 'string',
            message: 'string',
          },
          path: 'string',
          op: 'replace',
        },
      ],
    },
    {
      checkoutOrderItemId: 2,
      checkoutItemPatchDocument: [
        {
          value: {
            from: 'string',
            to: 'string',
            message: 'string',
          },
          path: 'string',
          op: 'add',
        },
      ],
    },
  ];

export const mockUpdateCheckoutResponse = {
  checkout: {
    1: {
      checkoutOrder: checkoutId,
      shippingOptions: [
        {
          currency: 'EUR',
          discount: 0,
          merchants: [merchantId],
          price: 12,
          formattedPrice: '12',
          shippingCostType: ShippingCostType.FlatRateInternational,
          shippingService: {
            description: 'abc',
            id: 187639899,
            name: 'DHL Express',
            type: 'Express',
            minEstimatedDeliveryHour: 0,
            maxEstimatedDeliveryHour: 0,
            trackingCodes: [],
          },
          shippingWithoutCapped: 0,
          baseFlatRate: 0,
        },
      ],
      paymentMethods: {
        customerAccounts: [
          {
            type: '',
            id: '',
            description: '',
            code: '',
            paymentOptions: [''],
          },
        ],
        creditCard: {
          type: '',
          creditCards: [
            {
              id: '',
              description: '',
              code: '',
            },
          ],
          supportsInstallments: false,
          installments: [],
        },
      },
      orderStatus: OrderStatusError.NoError,
      id: 123,
    },
  },
};

export const mockCheckoutOrderItemProductsEntity = {
  categories: [mockCheckoutOrderItem.categories[0]?.id] as Array<
    Category['id']
  >,
  colors: [],
  tags: [''],
  customAttributes: '',
  description: '',
  id: productId,
  isCustomizable: true,
  isExclusive: true,
  merchant: mockCheckoutOrderItem.merchantId,
  name: '',
  price: {
    isFormatted: true,
    includingTaxes: 123,
    includingTaxesWithoutDiscount: 123,
    formatted: {
      includingTaxes: '123',
      includingTaxesWithoutDiscount: '123',
    },
    taxes: {
      rate: 0,
      amount: 0,
      type: 'VAT',
    },
  },
  sizes: undefined,
  slug: '',
  variants: undefined,
  images: undefined,
};

export const shippingOption = {
  currency: 'string',
  discount: 0,
  merchants: [merchantLocationId],
  price: 0,
  formattedPrice: 'string',
  shippingCostType: ShippingCostType.PerStoreFlatRate,
  shippingService: {
    description: 'string',
    id: 0,
    name: 'string',
    type: 'string',
    minEstimatedDeliveryHour: 10,
    maxEstimatedDeliveryHour: 30,
    trackingCodes: ['string'],
  },
  shippingWithoutCapped: 0,
  baseFlatRate: 0,
};

export const checkoutEntity = {
  checkoutOrder: checkoutOrderId,
  id: checkoutId,
  shippingOptions: [shippingOption],
  deliveryBundles: [deliveryBundleId],
  orderStatus: OrderStatusError.NoError,
};

const selectedCollectPoint = { collectPointId, merchantLocationId };

export const checkoutOrderEntity = {
  ...mockResponse.checkoutOrder,
  clickAndCollect: selectedCollectPoint,
  id: checkoutOrderId,
  items: [mockCheckoutOrderItem['id']],
};

const deliveryBundle = {
  id: deliveryBundleId,
  name: 'Basic',
  isSelected: true,
  price: 25,
  itemsDeliveryOptions: [
    {
      itemId: itemId1,
      name: 'Standard',
      deliveryWindow: {
        type: CheckoutOrderDeliveryWindowType.Estimated,
        min: '2020-02-09T14:38:22.228Z',
        max: '2020-02-13T14:38:22.228Z',
      },
    },
    {
      itemId: itemId2,
      name: 'Standard',
      deliveryWindow: {
        type: CheckoutOrderDeliveryWindowType.Nominated,
        min: '2020-02-14T14:38:22.228Z',
        max: '2020-02-14T14:38:22.228Z',
      },
    },
  ],
  formattedPrice: '25 €',
  discount: 0,
  currency: '€',
  rank: 1,
  finalPrice: 25,
  formattedFinalPrice: '25 €',
  itemDeliveryProvisioning: [],
};

export const deliveryBundlesEntity = {
  [deliveryBundleId]: deliveryBundle,
  '090998': {
    ...deliveryBundle,
    id: '090998',
    name: 'fake bundle',
    isSelected: false,
  },
};

export const deliveryBundleUpgradesEntity = {
  [deliveryBundleId]: {
    [itemId1]: {
      Estimated: [
        {
          ...mockDeliveryBundleUpgradesResponse[95097041].Estimated[0]!,
          id: deliveryBundleUpgradeId_1,
          name: 'Fast',
          itemId: itemId1,
          index: 0,
          isSelected: false,
          price: 1,
          formattedPrice: '1,00 €',
          currency: '€',
          rank: 1,
          deliveryWindow: {
            type: CheckoutOrderDeliveryWindowType.Estimated,
            min: '2020-02-10T14:38:22.228Z',
            max: '2020-02-13T14:38:22.228Z',
          },
        },
      ],
    },
    [itemId2]: {
      Nominated: [
        {
          ...mockDeliveryBundleUpgradesResponse[95097042].Estimated[0]!,
          id: deliveryBundleUpgradeId_2,
          name: 'NDD',
          itemId: itemId2,
          index: 1,
          isSelected: false,
          price: 1,
          formattedPrice: '1,00 €',
          currency: '€',
          rank: 2,
          deliveryWindow: {
            type: CheckoutOrderDeliveryWindowType.Nominated,
            min: '2020-02-10T14:38:22.228Z',
            max: '2020-02-13T14:38:22.228Z',
          },
        },
      ],
    },
  },
};

export const checkoutOrderContext = {
  id: contextId,
  context: 'string',
  value: 'string',
  createdAt: '2023-05-05T17:54:29.565Z',
};

export const mockGetCheckoutOrderContextResponse = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  context: 'string',
  value: 'string',
  createdAt: '2023-05-05T17:54:29.565Z',
};

export const mockGetCheckoutOrderContextsResponse = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    context: 'context1',
    value: 'value1',
    createdAt: '2023-05-05T17:54:29.565Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66aaaa',
    context: 'context2',
    value: 'value2',
    createdAt: '2023-05-16T17:54:29.565Z',
  },
];

export const mockGetContextActionPayload = {
  entities: {
    checkoutOrderContexts: {
      [contextId]: checkoutOrderContext,
    },
  },
  result: contextId,
};

export const mockGetContextsActionPayload = {
  entities: {
    checkoutOrderContexts: {
      [contextId]: checkoutOrderContext,
    },
  },
  result: [contextId],
};

export const mockDeleteContextActionPayload = {
  '@controls': null,
};

export const checkoutOrderContextEntity = {
  [contextId]: checkoutOrderContext,
};

export const mockPostCheckoutOrderContext = {
  headers: {
    location: `http://localhost:9699/v1/checkout/${checkoutOrderId}/contexts/${contextId}`,
  },
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    context: 'string',
    value: 'string',
    createdAt: '2023-05-05T17:54:29.565Z',
  },
};
export const mockPostCheckoutOrderContextWithoutHeaders = {
  headers: {},
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    context: 'string',
    value: 'string',
    createdAt: '2023-05-05T17:54:29.565Z',
  },
};

export const mockInitialState = {
  checkout: {
    error: null,
    id: null,
    isLoading: false,
    completePaymentCheckout: {
      error: null,
      isLoading: false,
    },
    checkoutOrderDetails: {
      error: null,
      isLoading: false,
    },
    collectPoints: {
      '': {
        result: undefined,
        isLoading: false,
        error: null,
      },
    },
    checkoutOrderTags: {
      error: null,
      isLoading: false,
    },
    checkoutOrderPromocodes: {
      error: null,
      isLoading: false,
    },
    checkoutOrderItemTags: {
      error: null,
      isLoading: false,
    },
    checkoutOrderItems: {
      error: null,
      isLoading: false,
    },
    checkoutOrderCharge: {
      error: null,
      isLoading: false,
      result: null,
    },
    checkoutOrderDeliveryBundleUpgrades: {
      error: null,
      isLoading: false,
      result: null,
    },
    checkoutOrderDeliveryBundleProvisioning: {
      error: null,
      isLoading: false,
    },
    checkoutOrderDeliveryBundleUpgradeProvisioning: {
      error: null,
      isLoading: false,
    },
    operation: {
      error: null,
      isLoading: false,
    },
    operations: {
      error: null,
      isLoading: false,
      result: null,
    },
    removeOrderItem: {
      error: null,
      isLoading: false,
    },
    updateOrderItem: {
      error: null,
      isLoading: false,
    },
    context: {
      error: null,
      isLoading: false,
      result: null,
    },
    contexts: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  users: {
    error: null,
    isLoading: false,
    id: 56681854,
    addresses: {
      error: null,
      isLoading: false,
      result: null,
      addresses: {
        error: null,
        isLoading: false,
      },
      address: {
        error: {},
        isLoading: {},
      },
      defaultAddressDetails: {
        error: null,
        isLoading: false,
        result: null,
      },
    },
    attributes: {
      result: null,
      error: null,
      isLoading: false,
    },
    authentication: {
      login: {
        error: null,
        isLoading: false,
      },
      logout: {
        error: null,
        isLoading: false,
      },
      register: {
        error: null,
        isLoading: false,
      },
      changePassword: {
        error: null,
        isLoading: false,
      },
      resetPassword: {
        error: null,
        isLoading: false,
      },
      recoverPassword: {
        error: null,
        isLoading: false,
      },
      validateEmail: {
        error: null,
        isLoading: false,
      },
      refreshEmailToken: {
        error: null,
        isLoading: false,
      },
      token: {
        result: null,
        error: null,
        isLoading: false,
      },
    },
    benefits: {
      error: null,
      isLoading: false,
    },
    contacts: {
      error: null,
      isLoading: false,
    },
    credits: {
      error: null,
      isLoading: false,
    },
    creditMovements: {
      error: null,
      isLoading: false,
    },
    preferences: {
      error: null,
      isLoading: false,
    },
    returns: {
      error: null,
      isLoading: false,
      result: null,
    },
    titles: {
      error: null,
      isLoading: false,
    },
    updatePreferences: {
      error: null,
      isLoading: false,
    },
    personalIds: {
      error: null,
      isLoading: false,
      result: null,
      defaultPersonalId: {
        error: null,
        isLoading: false,
        result: null,
      },
    },
    closets: {
      error: null,
      isLoading: false,
      result: null,
      closetItems: {
        error: null,
        isLoading: false,
        result: null,
      },
    },
  },
  payments: {
    paymentIntentCharge: {
      error: null,
      isLoading: false,
      result: null,
    },
    userCreditBalance: {
      error: null,
      isLoading: false,
      result: null,
    },
    giftCardBalance: {
      error: null,
      isLoading: false,
      result: null,
    },
    paymentIntentInstruments: {
      error: null,
      isLoading: false,
      result: null,
    },
    paymentIntent: {
      error: null,
      isLoading: false,
      result: null,
    },
    paymentMethods: {
      error: null,
      isLoading: false,
      result: null,
    },
    paymentTokens: {
      error: null,
      result: null,
      isLoading: false,
    },
  },
  ...mockLocaleState,
  entities: {
    user: {
      bagId: 'ada57d80-62a7-4cb4-8de4-f8937fe53213',
      dateOfBirth: '/Date(636854400000)/',
      email: 'user.name@test.com',
      gender: UserGender.Male,
      id: 56681854,
      name: 'User Name',
      phoneNumber: '',
      phoneNumberConfirmed: false,
      segments: [],
      username: 'user.name@test.com',
      wishlistId: '5d5ac3ee-62f3-46e3-a243-d7bc1d0c328d',
      isExternalLogin: false,
      isGuest: false,
      guestBagItemsMerged: 0,
      status: UserStatus.PendingEmailConfirmation,
      lastName: 'Name',
      firstName: 'User',
      bag: null,
      wishlist: null,
      membership: undefined,
      loyalty: null,
      createdDate: '/Date(1601300185332)/',
      updatedDate: '/Date(1655722263553)/',
      countryCode: 'PT',
    } as UserEntity,
    countries: mockLocaleState.entities.countries,
    countriesAddressSchemas: {
      ...mockLocaleState.entities.countriesAddressSchemas,
    },
  },
};

export const mockCheckoutState = {
  ...mockInitialState,
  checkout: {
    ...mockInitialState.checkout,
    id: checkoutId,
    checkoutOrderCharge: {
      error: null,
      isLoading: false,
      result: {
        id: chargeId,
        status: ChargeStatus.Processing,
        redirectUrl: 'some url',
        returnUrl: 'some url',
        cancelUrl: 'some url',
        chargeInstruments: [
          {
            id: '00000000-0000-0000-0000-000000000000',
            operationStatus: ChargeStatus.Processing,
            declineCode: ChargeDeclineCode.NotApplicable,
          },
        ],
      },
    },
    collectPoints: {
      [`${checkoutId}|false|false`]: {
        result: [mockCollectPoint],
        error: null,
        isLoading: false,
      },
    },
    context: {
      isLoading: false,
      error: null,
      result: contextId,
    },
    contexts: {
      isLoading: false,
      error: null,
      result: [contextId],
    },
  },
  payments: {
    ...mockInitialState.payments,
    paymentIntentInstruments: {
      error: null,
      isLoading: false,
      result: [],
    },
  },
  entities: {
    ...mockInitialState.entities,
    checkout: { [checkoutId]: checkoutEntity },
    checkoutOrders: { [checkoutOrderId]: checkoutOrderEntity },
    checkoutOrderItems: {
      [checkoutOrderItemId]: mockCheckoutOrderItemEntity,
    },
    checkoutOrderItemProducts: {
      [productId]: mockCheckoutOrderItemProductsEntity,
    },
    checkoutDetails: {
      [checkoutId]: mockCheckoutDetailsEntity,
    },
    checkoutOrderContext: {
      [contextId]: checkoutOrderContext,
    },
    deliveryBundles: deliveryBundlesEntity,
    deliveryBundleUpgrades: deliveryBundleUpgradesEntity,
    merchants: {
      [mockCheckoutOrderItem.merchantId]: {
        id: 12455,
        name: 'Test Merchant',
        shoppingUrl: 'http://www.merchant.com',
      },
    },
    categories: {
      136301: {
        color: {
          id: 112495,
          name: 'Black',
        },
        tags: ['MainColor'],
        id: 136301,
        name: 'Shoes',
        gender: GenderCode.Man,
      },
    },
  },
};

export const mockCheckoutStateWithoutDetails = {
  ...mockCheckoutState,
  entities: {
    ...mockCheckoutState.entities,
    checkoutDetails: {},
  },
};

export const mockLoadingState = {
  ...mockInitialState,
  checkout: {
    ...mockInitialState.checkout,
    isLoading: true,
    collectPoints: {
      '': {
        isLoading: true,
        error: null,
        result: undefined,
      },
    },
    checkoutOrderCharge: {
      ...mockInitialState.checkout.checkoutOrderCharge,
      isLoading: true,
    },
    checkoutOrderDetails: {
      ...mockInitialState.checkout.checkoutOrderDetails,
      isLoading: true,
    },
    checkoutOrderPromocodes: {
      ...mockInitialState.checkout.checkoutOrderPromocodes,
      isLoading: true,
    },
  },
};

export const mockErrorState = {
  ...mockInitialState,
  checkout: {
    ...mockInitialState.checkout,
    error: new Error('dummy error') as BlackoutError,
    collectPoints: {
      '': {
        result: undefined,
        isLoading: false,
        error: new Error('dummy error') as BlackoutError,
      },
    },
    checkoutOrderCharge: {
      ...mockInitialState.checkout.checkoutOrderCharge,
      error: new Error('dummy error') as BlackoutError,
    },
    checkoutOrderDetails: {
      ...mockInitialState.checkout.checkoutOrderDetails,
      error: new Error('dummy error') as BlackoutError,
    },
    checkoutOrderPromocodes: {
      ...mockInitialState.checkout.checkoutOrderPromocodes,
      error: new Error('dummy error') as BlackoutError,
    },
  },
};

export const mockInitialStateWithoutUser = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: undefined,
  },
};

export const mockInitialStateWithGuestUser = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: {
      ...mockInitialState.entities.user,
      isGuest: true,
    },
  },
};

export const mockCheckoutStateWithGuestUser = {
  ...mockCheckoutState,
  entities: {
    ...mockCheckoutState.entities,
    user: mockInitialStateWithGuestUser.entities.user,
  },
};

export const mockCheckoutOrderResultDenormalized = {
  ...checkoutEntity,
  checkoutOrder: {
    ...checkoutOrderEntity,
    items: [
      {
        ...mockCheckoutOrderItemEntity,
        merchant:
          mockCheckoutState.entities.merchants[
            mockCheckoutOrderItemEntity.merchant
          ],
        product: {
          ...mockCheckoutOrderItemProductsEntity,
          categories: [mockCheckoutState.entities.categories[136301]],
          merchant:
            mockCheckoutState.entities.merchants[
              mockCheckoutOrderItemEntity.merchant
            ],
          labels: [],
        },
      },
    ],
  },
};

export const mockCheckoutDetailsEntityDenormalized = {
  checkoutOrder: mockCheckoutOrderResultDenormalized.checkoutOrder,
  registered: true,
  shippingOptions: [],
};

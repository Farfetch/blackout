export const checkoutId = 15338048;
export const transactionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const checkoutOrderId = 15338048;
export const checkoutOrderItemId = 30380051;
export const itemId = 987654321;
export const id = 123456;
export const operationId = '987654321';
export const upgradeId = '123456';
export const chargeId = 'eb92d414-68de-496e-96db-a0c6582b74d4';
const merchantId = 10658;
const productId = 12640693;
const brandId = 121212;

const address = {
  addressLine1: 'Rua da Lionesa 446, G12',
  addressLine2: ' Teste',
  addressLine3: '',
  city: {
    countryId: 0,
    id: 0,
    name: 'Leça do Balio',
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
  firstName: 'tester',
  id: 'c9ce5410-58d9-4298-a385-231a79373e4a',
  lastName: 'teste',
  neighbourhood: null,
  phone: '121525125',
  state: {
    code: null,
    countryId: 0,
    id: 0,
    name: null,
  },
  vatNumber: null,
  zipCode: '4465-761',
  userId: 0,
  isDefaultBillingAddress: true,
  isDefaultShippingAddress: true,
};

export const mockDeliveryBundlesResponse = [
  {
    id: '12345678',
    name: 'Basic',
    isSelected: true,
    price: 10,
    discount: 0,
    currency: 'EUR',
    rank: 1,
    itemsDeliveryOptions: [
      {
        itemId: 95097041,
        name: 'Standard',
        deliveryWindow: {
          type: 'Estimated',
          min: '2020-02-10T14:38:22.228Z',
          max: '2020-02-13T14:38:22.228Z',
        },
      },
      {
        itemId: 95097042,
        name: 'Standard',
        deliveryWindow: {
          type: 'Estimated',
          min: '2020-02-10T14:38:22.228Z',
          max: '2020-02-14T14:38:22.228Z',
        },
      },
    ],
  },
  {
    id: '87654321',
    name: 'Fast',
    isSelected: false,
    price: 15,
    discount: 0,
    currency: 'EUR',
    rank: 2,
    itemsDeliveryOptions: [
      {
        itemId: 95097041,
        name: 'Fast',
        deliveryWindow: {
          type: 'Estimated',
          min: '2020-02-09T14:38:22.228Z',
          max: '2019-10-12T14:38:22.228Z',
        },
      },
      {
        itemId: 95097042,
        name: 'Fast',
        deliveryWindow: {
          type: 'Estimated',
          min: '2020-02-09T14:38:22.228Z',
          max: '2019-10-11T14:38:22.228Z',
        },
      },
    ],
  },
];

export const mockItemDeliveryPorvisioningResponse = [
  {
    itemId: 95097041,
    provisioning: [
      {
        merchantId: 9206,
        merchantLocationId: 92061,
        quantity: 1,
        deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
        deliveryDateEstimateMaximum: '2020-02-13T14:38:22.228Z',
        deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
      },
    ],
  },
  {
    itemId: 95097042,
    provisioning: [
      {
        merchantId: 9689,
        merchantLocationId: 96891,
        quantity: 1,
        deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
        deliveryDateEstimateMaximum: '2020-02-14T14:38:22.228Z',
        deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
      },
    ],
  },
];

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
    items: [
      {
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
        brandName: '78 Stitches',
        brandId,
        productId: productId,
        productName: 'Navy Treated Bonded Cotton Dry Bag',
        productSlug: 'navy-treated-bonded-cotton-dry-bag-12640693',
        tags: ['GIFT'],
        price: {
          priceExclTaxes: 1.26,
          priceInclTaxes: 1.51,
          priceInclTaxesWithoutDiscount: 1.53,
        },
        prices: [],
        merchantId: 12455,
        merchantName: 'Test Merchant',
        merchantShoppingUrl: 'http://www.merchant.com',
      },
    ],
    currency: 'EUR',
    customerType: '0',
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
    promocode: '123',
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
    shippingMode: 'ByMerchant',
    status: 'Opened',
  },
  deliveryBundles: mockDeliveryBundlesResponse,
  shippingOptions: [],
  paymentMethods: {},
  userPaymentTokens: null,
  orderStatus: 0,
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
    items: [
      {
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
        productId: productId,
        productName: 'Navy Treated Bonded Cotton Dry Bag',
        productSlug: 'navy-treated-bonded-cotton-dry-bag-12640693',
        tags: ['GIFT'],
      },
    ],
  },
  registered: true,
};

export const mockCollectPointsResponse = [
  {
    storeAddress: {
      location: {
        latitude: '51.5121368',
        longitude: '-0.14222780000000057',
        name: null,
        componentTypeName: null,
        tag: null,
        visualizationComponents: {},
      },
      addressLine1: '19 Conduit Street',
      addressLine2: '',
      addressLine3: null,
      city: {
        countryId: 0,
        id: 0,
        name: 'London',
        stateId: null,
      },
      country: {
        alpha2Code: 'GB',
        alpha3Code: 'GBR',
        culture: 'en-GB',
        id: 215,
        name: 'United Kingdom',
        nativeName: 'United Kingdom',
        region: 'Europe',
        subRegion: null,
        regionId: 0,
        subfolder: '/en-gb',
        continentId: 3,
      },
      ddd: null,
      firstName: 'ACME LONDON',
      id: '00000000-0000-0000-0000-000000000000',
      lastName: null,
      neighbourhood: null,
      phone: '02074934667',
      state: null,
      vatNumber: null,
      zipCode: 'W1S 2BH',
      userId: 0,
      isCurrentBilling: false,
      isCurrentShipping: false,
    },
    clickAndCollect: {
      collectPointId: 3195,
      merchantLocationId: 10534,
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
  },
  {
    storeAddress: {
      location: {
        latitude: '40.7700246',
        longitude: '-73.96643059999997',
        name: null,
        componentTypeName: null,
        tag: null,
        visualizationComponents: {},
      },
      addressLine1: '833 Madison Avenue',
      addressLine2: '',
      addressLine3: null,
      city: {
        countryId: 0,
        id: 0,
        name: 'New York',
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
        subfolder: '/en-us',
        continentId: 5,
      },
      ddd: null,
      firstName: 'ACME NEW YORK',
      id: '00000000-0000-0000-0000-000000000000',
      lastName: null,
      neighbourhood: null,
      phone: '+1 646 524 5401',
      state: {
        code: null,
        countryId: 0,
        id: 46,
        name: null,
      },
      vatNumber: null,
      zipCode: '10021',
      userId: 0,
      isCurrentBilling: false,
      isCurrentShipping: false,
    },
    clickAndCollect: {
      collectPointId: 3196,
      merchantLocationId: 10649,
    },
    businessDays: [
      {
        hours: [
          {
            close: '18:00:00',
            open: '10:00:00',
          },
        ],
        weekday: 1,
      },
    ],
  },
];

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
        id: '123456789',
        name: 'Fast',
        isSelected: false,
        price: 10,
        currency: 'EUR',
        rank: 1,
        itemId: 95097041,
        deliveryWindow: {
          type: 'Estimated',
          min: '2019-10-09T16:20:32.303Z',
          max: '2019-10-12T16:20:32.303Z',
        },
      },
    ],
  },
  95097042: {
    Estimated: [
      {
        id: '123456788',
        name: '90 min',
        isSelected: false,
        price: 10,
        currency: 'EUR',
        rank: 1,
        itemId: 95097042,
        deliveryWindow: {
          type: 'Estimated',
          min: '2019-10-09T16:20:32.303Z',
          max: '2019-10-11T16:20:32.303Z',
        },
      },
    ],
  },
  95097043: {
    Nominated: [
      {
        id: '123456787',
        name: 'NDD',
        isSelected: false,
        price: 0,
        currency: 'EUR',
        rank: 1,
        itemId: 95097043,
        deliveryWindow: {
          type: 'Nominated',
          min: '2019-10-09T16:20:32.303Z',
          max: '2019-10-09T16:20:32.303Z',
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
    checkoutOrderItemProducts: { [productId]: { id: productId } },
  },
  result: checkoutId,
};

export const expectedItemDeliveryProvisioningNormalizedPayload = {
  entities: {
    itemDeliveryProvisioning: {
      95097041: {
        itemId: 95097041,
        provisioning: [
          {
            merchantId: 9206,
            merchantLocationId: 92061,
            quantity: 1,
            deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
            deliveryDateEstimateMaximum: '2020-02-13T14:38:22.228Z',
            deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
          },
        ],
      },
      95097042: {
        itemId: 95097042,
        provisioning: [
          {
            merchantId: 9689,
            merchantLocationId: 96891,
            quantity: 1,
            deliveryDateEstimateMinimum: '2020-02-10T14:38:22.228Z',
            deliveryDateEstimateMaximum: '2020-02-14T14:38:22.228Z',
            deliveryDateEstimate: '2020-02-11T14:38:22.228Z',
          },
        ],
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
              id: '123456789',
              name: 'Fast',
              isSelected: false,
              price: 10,
              currency: 'EUR',
              rank: 1,
              itemId: 95097041,
              deliveryWindow: {
                type: 'Estimated',
                min: '2019-10-09T16:20:32.303Z',
                max: '2019-10-12T16:20:32.303Z',
              },
            },
          ],
        },
        95097042: {
          Estimated: [
            {
              id: '123456788',
              name: '90 min',
              isSelected: false,
              price: 10,
              currency: 'EUR',
              rank: 1,
              itemId: 95097042,
              deliveryWindow: {
                type: 'Estimated',
                min: '2019-10-09T16:20:32.303Z',
                max: '2019-10-11T16:20:32.303Z',
              },
            },
          ],
        },
        95097043: {
          Nominated: [
            {
              id: '123456787',
              name: 'NDD',
              isSelected: false,
              price: 0,
              currency: 'EUR',
              rank: 1,
              itemId: 95097043,
              deliveryWindow: {
                type: 'Nominated',
                min: '2019-10-09T16:20:32.303Z',
                max: '2019-10-09T16:20:32.303Z',
              },
            },
          ],
        },
      },
    },
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
      [checkoutOrderItemId]: {
        id: checkoutOrderItemId,
        product: productId,
        tags: ['GIFT'],
      },
    },
    checkoutDetails: {
      [checkoutOrderId]: {
        checkoutOrder: checkoutOrderId,
        registered: true,
      },
    },
    checkoutOrderItemProducts: { [productId]: { id: productId } },
  },
  result: checkoutId,
};

export const mockResponsePatchOrderItemsGiftMessage = [
  {
    checkoutOrderItemId: 1,
    checkoutItemPatchDocument: {
      operations: [
        {
          value: {
            from: 'string',
            to: 'string',
            message: 'string',
          },
          path: 'string',
          op: 'string',
          from: 'string',
        },
      ],
    },
  },
  {
    checkoutOrderItemId: 2,
    checkoutItemPatchDocument: {
      operations: [
        {
          value: {
            from: 'string',
            to: 'string',
            message: 'string',
          },
          path: 'string',
          op: 'string',
          from: 'string',
        },
      ],
    },
  },
];

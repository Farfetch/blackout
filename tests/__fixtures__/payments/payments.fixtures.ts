import {
  ChargeStatus,
  Classification,
  DeclineCode,
  LineItemsType,
  PaymentInstrumentStatus,
  PaymentIntentStatus,
  ShopperInteraction,
} from '@farfetch/blackout-client';

export const chargeId = '43b059df-898e-4407-8347-b075b645bf6c';
export const id = '123456';
export const instrumentId = '316bc538-e7e5-4f6c-943f-686350fac5ae';
export const checkoutId = 15338048;
export const transactionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const checkoutOrderItemId = 30380051;
export const checkoutOrderId = 15338048;
export const merchantId = 10658;
export const productId = 12640693;
export const brandId = 121212;
export const orderId = 1;
export const paymentTokenId = '5ccbb098-e4ef-cb30-701b-4cbbd347c472';
export const paymentTokenId2 = '0a1cbb02-091f-ef49-1c75-2239b9c361b1';
export const intentId = '123123';

export const paymentIntentChargeData = {
  returnUrl: '',
  cancelUrl: '',
};

export const address = {
  addressLine1: 'Rua da Lionesa 446, G12',
  addressLine2: ' Teste',
  city: {
    countryId: 0,
    id: 0,
    name: 'Leça do Balio',
    stateId: 0,
  },
  country: {
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    region: 'Europe',
    subRegion: '',
    regionId: 0,
    subfolder: '/en-pt',
    continentId: 3,
  },
  ddd: '351',
  title: null,
  firstName: 'tester',
  id: 'c9ce5410-58d9-4298-a385-231a79373e4a',
  lastName: 'teste',
  neighbourhood: 'Centro',
  phone: '121525125',
  state: {
    code: 'Braga',
    countryId: 0,
    id: 0,
    name: 'Braga',
  },
  vatNumber: '50',
  zipCode: '4465-761',
  userId: 0,
  isDefaultBillingAddress: true,
  isDefaultShippingAddress: true,
};

export const mockCharge = {
  headers: {
    location: `http://localhost:9699/v1/intents/acb66f64-b2af-4ad5-8d32-d2323cc535f8/charges/${chargeId}`,
  },
  data: {
    status: ChargeStatus.Processing,
    returnUrl: 'string',
    redirectUrl: 'string',
    cancelUrl: 'string',
    chargeInstruments: [
      {
        id: '',
        operationStatus: ChargeStatus.Processing,
        declineCode: DeclineCode.NotApplicable,
      },
    ],
  },
};
export const mockChargeWithoutHeaders = {
  headers: {},
  data: {
    status: 'Processing',
    returnUrl: 'string',
    cancelUrl: 'string',
  },
};
export const mockCreditBalanceResponse = {
  currency: 'EUR',
  value: 200,
};
export const mockInstrumentData = {
  id: instrumentId,
  method: 'CreditCard',
  option: 'credit card',
  amounts: [
    {
      value: 27,
      settledValue: 0,
      refundedValue: 0,
    },
  ],
  status: PaymentInstrumentStatus.Created,
  payer: {
    id: '1213',
    firstName: 'João',
    lastName: 'Batista',
    email: 'joao@mail.com',
    address,
  },
  data: {
    cardHolderName: 'Joao Baptista',
    cardFirstDigits: '411111',
    cardLastDigits: '111111',
    cardExpiryMonth: 10,
    cardExpiryYear: 2020,
    creditUserId: '',
    giftCardNumber: '1232211',
    giftCardCsc: '111212',
    cardCvv: '037',
    cardNumber: '123',
  },
  installments: {
    quantity: 0,
  },
  shopperInteraction: ShopperInteraction.Ecommerce,
};
export const mockFetchInstrumentsResponse = [mockInstrumentData];
export const mockFetchInstrumentsNormalizedPayload = {
  entities: {
    paymentInstruments: {
      [mockFetchInstrumentsResponse[0]?.id as string]:
        mockFetchInstrumentsResponse[0],
    },
  },
  result: [mockFetchInstrumentsResponse[0]?.id],
};
export const mockFetchInstrumentResponse = mockInstrumentData;
export const mockFetchInstrumentNormalizedPayload = {
  entities: {
    paymentInstruments: {
      [mockFetchInstrumentResponse?.id as string]: mockFetchInstrumentResponse,
    },
  },
  result: mockFetchInstrumentResponse?.id,
};
export const mockFetchIntentResponse = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  reference: 'string',
  currency: 'string',
  dateCreated: '2020-08-12T14:03:28.538Z',
  totalValue: 0,
  totalValueFormattedPrice: 'string',
  fingerprint: 'string',
  status: PaymentIntentStatus.Created,
  totalShippingFee: 0,
  formattedTotalShippingFee: 'string',
  lineItems: [
    {
      id: 'string',
      productId: 'string',
      classification: Classification.Standard,
      unitValue: 0,
      formattedUnitValue: 'string',
      type: LineItemsType.Item,
      quantity: 0,
      totalExtraTaxes: 0,
      formattedTotalExtraTaxes: 'string',
      description: 'string',
    },
  ],
  receiver: {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    address: {
      id: '00000000-0000-0000-0000-000000000000',
      addressLine1: 'string',
      addressLine2: 'string',
      addressLine3: 'string',
      vatNumber: 'string',
      zipCode: 'string',
      phone: 'string',
      neighbourhood: 'string',
      ddd: 'string',
      userId: 0,
      city: {
        countryId: 0,
        id: 0,
        name: 'string',
        stateId: 0,
      },
      state: {
        code: 'string',
        countryId: 0,
        id: 0,
        name: 'string',
      },
      country: {
        alpha2Code: 'string',
        alpha3Code: 'string',
        culture: 'string',
        id: 0,
        name: 'string',
        nativeName: 'string',
        region: 'string',
        subRegion: 'string',
        regionId: 0,
        subfolder: 'string',
        continentId: 0,
      },
      continent: {
        id: 0,
        name: 'string',
        countries: [
          {
            alpha2Code: 'string',
            alpha3Code: 'string',
            culture: 'string',
            id: 0,
            name: 'string',
            nativeName: 'string',
            region: 'string',
            subRegion: 'string',
            regionId: 0,
            subfolder: 'string',
            continentId: 0,
          },
        ],
      },
      isDefaultBillingAddress: true,
      isDefaultShippingAddress: true,
    },
  },
};
export const mockFetchPaymentMethodsResponse = {
  customerAccounts: [
    {
      type: 'CustomerAccount',
      id: '0ea4a071-1268-4530-93ab-10f10964d7d1',
      description: 'Alipay',
      code: 'Alipay',
      paymentOptions: ['WEB'],
    },
    {
      type: 'CustomerAccount',
      id: '764d2815-157f-498a-b0ac-d6311cc8f476',
      description: 'Alipay WAP',
      code: 'AlipayWAP',
      paymentOptions: ['WAP'],
    },
    {
      type: 'CustomerAccount',
      id: 'f56d6086-f08d-4c2e-b55b-63b2d32aa645',
      description: 'PPE',
      code: 'PayPalExp',
      paymentOptions: [],
    },
  ],
  creditCard: {
    type: 'CreditCard',
    creditCards: [
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'American Express',
        code: 'AMEX',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Diners Club International',
        code: 'DC',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Visa Debit Delta',
        code: 'DELTA',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Discover',
        code: 'DISCOVER',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'JCB',
        code: 'JCB',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'MasterCard',
        code: 'MC',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'UnionPay',
        code: 'UP',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Visa',
        code: 'VISA',
      },
    ],
  },
};
export const mockFetchPaymentIntentChargeResponse = {
  status: ChargeStatus.Processing,
  redirectUrl: 'string',
  returnUrl: 'string',
  cancelUrl: 'string',
  chargeInstruments: [
    {
      id: '00000000-0000-0000-0000-000000000000',
      operationStatus: ChargeStatus.Processing,
      declineCode: DeclineCode.NotApplicable,
    },
  ],
};
export const mockFetchTransaction = {
  id: transactionId,
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
        merchantId: 12455,
        merchantName: 'Test Merchant',
        merchantShoppingUrl: 'http://www.merchant.com',
      },
    ],
  },
  shippingOptions: [],
  deliveryBundles: [],
  paymentMethods: {},
  paymentLink: 'mockPaymentLink',
};
export const expectedFetchTransactionNormalizedPayload = {
  entities: {
    transaction: {
      [transactionId]: { checkoutOrder: checkoutOrderId },
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
  result: transactionId,
};
export const mockGiftCardBalanceResponse = {
  currency: 'USD',
  value: 200,
};
export const mockPaymentTokensResponse = [
  {
    id: paymentTokenId,
    paymentMethodId: 'e6cf3307-f421-4c23-8438-86e8c6d7a56a',
    userId: '29528565',
    cardLast4Numbers: '0002',
    expiryYear: 2020,
    expiryMonth: 10,
    holderName: 'tester',
    forceCvvRequest: false,
    billingAddress: {
      addressLine1: 'teste',
      addressLine2: 'string',
      addressLine3: 'string',
      city: {
        countryId: 0,
        id: 0,
        name: 'londres',
        stateId: 0,
      },
      country: {
        alpha2Code: 'GB',
        alpha3Code: 'GBR',
        culture: 'en-GB',
        id: 215,
        name: 'United Kingdom',
        nativeName: 'United Kingdom',
        region: 'Europe',
        subRegion: '',
        regionId: 0,
        continentId: 3,
      },
      ddd: '',
      firstName: 'tester',
      id: '00000000-0000-0000-0000-000000000000',
      lastName: 'matos',
      neighbourhood: '',
      phone: '7171717',
      state: {
        code: null,
        countryId: 0,
        id: 0,
        name: '',
      },
      vatNumber: '111111',
      zipCode: '71717',
      userId: 0,
      isCurrentBilling: false,
      isCurrentShipping: false,
    },
    tokenExpired: false,
    usedDate: '/Date(1555508011933)/',
    createdDate: '/Date(1547046383000)/',
    paymentOption: 'AMEX',
  },
  {
    id: paymentTokenId2,
    paymentMethodId: '96051ad5-ebc3-48ee-a741-5e84654e1605',
    userId: '29528565',
    cardLast4Numbers: '1111',
    expiryYear: 2020,
    expiryMonth: 10,
    holderName: 'tester',
    forceCvvRequest: false,
    billingAddress: {
      addressLine1: 'teste',
      addressLine2: undefined,
      addressLine3: undefined,
      city: {
        countryId: 0,
        id: 0,
        name: 'londres',
        stateId: undefined,
      },
      country: {
        alpha2Code: 'GB',
        alpha3Code: 'GBR',
        culture: 'en-GB',
        id: 215,
        name: 'United Kingdom',
        nativeName: 'United Kingdom',
        region: 'Europe',
        subRegion: undefined,
        regionId: 0,
        subfolder: null,
        continentId: 3,
      },
      ddd: undefined,
      firstName: 'tester',
      id: '00000000-0000-0000-0000-000000000000',
      lastName: 'matos',
      neighbourhood: undefined,
      phone: '7171717',
      state: {
        code: undefined,
        countryId: 0,
        id: 0,
        name: '',
      },
      vatNumber: undefined,
      zipCode: '71717',
      userId: 0,
      isCurrentBilling: false,
      isCurrentShipping: false,
    },
    tokenExpired: false,
    usedDate: '/Date(-62135596800000)/',
    createdDate: '/Date(1547037124000)/',
    paymentOption: 'MC',
  },
];
export const mockRemovePaymentTokenResponse = {
  success: true,
};
export const expectedPaymentTokensNormalizedPayload = {
  entities: {
    paymentTokens: {
      [paymentTokenId]: {
        ...mockPaymentTokensResponse[0],
      },
      [paymentTokenId2]: {
        ...mockPaymentTokensResponse[1],
      },
    },
  },
  result: [paymentTokenId, paymentTokenId2],
};
export const mockPayTransaction = {
  billingAddressUsed: {},
  cancelUrl: 'string',
  checkoutOrderId: 0,
  confirmationParameters: {},
  confirmationRedirectUrl: 'string',
  confirmationRedirectUrlPostValues: {},
  createdDate: '2020-03-05T16:01:39.076Z',
  numberOfInstallments: 0,
  paymentMethodId: 'string',
  paymentStatus: {},
  recurringPayment: {},
  redirectUrl: 'string',
};
export const mockPaymentsResponse = {
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

export const mockPaymentIntentInstrumentResponse = {
  data: {},
  headers: { location: 'https://somelocation.com' },
};

export const mockInitialState = {
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
    paymentInstruments: {
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
  entities: {
    paymentInstruments: {},
    paymentTokens: {},
  },
};

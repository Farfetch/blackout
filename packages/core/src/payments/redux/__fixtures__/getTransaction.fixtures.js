export const checkoutId = 15338048;
export const transactionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
const checkoutOrderId = 15338048;
export const checkoutOrderItemId = 30380051;
const merchantId = 10658;
const productId = 12640693;
const brandId = 121212;

const address = {
  addressLine1: 'Rua da Lionesa 446, G12',
  addressLine2: ' Teste',
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
  title: null,
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

export const mockGetTransaction = {
  id: transactionId,
  checkoutOrder: {
    id: checkoutOrderId,
    shippingAddress: address,
    billingAddress: address,
    checkoutOrderMerchants: [
      {
        merchantId: merchantId,
        merchantName: 'MACKINTOSH WH NELSON FG',
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

export const expectedGetTransactionNormalizedPayload = {
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

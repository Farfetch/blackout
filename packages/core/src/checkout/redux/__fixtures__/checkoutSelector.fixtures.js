export const checkoutId = 1;
export const checkoutOrderId = 1;
export const checkoutOrderItemId = 101;
export const productId = 1001;
export const collectPointId = 999;
export const merchantLocationId = 1212121212;
export const deliveryBundleId = '1234';
export const deliveryBundleUpgradeId_1 = 111;
export const deliveryBundleUpgradeId_2 = 222;
export const itemId1 = 0;
export const itemId2 = 1;

const collectPoint = {
  clickAndCollect: { collectPointId },
  storeAdress: { firstName: 'MACKINTOSH LONDON' },
};

export const shippingOption = {
  currency: 'string',
  discount: 0,
  merchants: [merchantLocationId],
  price: 0,
  formattedPrice: 'string',
  shippingCostType: 'PerStoreFlatRate',
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

const selectedCollectPoint = { id: collectPointId, merchantLocationId };

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
        type: 'Estimated',
        min: '2020-02-09T14:38:22.228Z',
        max: '2020-02-13T14:38:22.228Z',
      },
    },
    {
      itemId: itemId2,
      name: 'Standard',
      deliveryWindow: {
        type: 'Nominated',
        min: '2020-02-14T14:38:22.228Z',
        max: '2020-02-14T14:38:22.228Z',
      },
    },
  ],
};

export const checkoutEntity = {
  checkoutOrder: checkoutOrderId,
  id: checkoutId,
  shippingOptions: [shippingOption],
  deliveryBundles: [deliveryBundleId],
};

export const deliveryBundlesEntity = {
  [deliveryBundleId]: deliveryBundle,
  '090998': {
    id: '090998',
    name: 'fake bundle',
    isSelected: false,
  },
};

export const checkoutOrderEntity = {
  clickAndCollect: selectedCollectPoint,
  collectpoints: [collectPoint],
  id: checkoutOrderId,
  items: [checkoutOrderItemId],
};

export const checkoutDetailEntity = {
  checkoutOrder: checkoutOrderId,
  registered: true,
};

export const checkoutOrderItemEntity = {
  id: checkoutOrderItemId,
  product: productId,
};

export const deliveryBundleUpgradesEntity = {
  [deliveryBundleId]: {
    [itemId1]: {
      Estimated: [
        {
          id: deliveryBundleUpgradeId_1,
          name: 'Fast',
          itemId: itemId1,
        },
      ],
    },
    [itemId2]: {
      Nominated: [
        {
          id: deliveryBundleUpgradeId_2,
          name: 'NDD',
          itemId: itemId2,
        },
      ],
    },
  },
};

export const productEntity = { id: productId, description: 'foo product' };

export const checkoutOrderItemProductEntity = {
  id: productId,
  description: 'foo product',
};

export default {
  checkout: {
    error: 'error: not loaded',
    id: checkoutId,
    isLoading: false,
    completePaymentCheckout: {
      error: null,
      isLoading: false,
    },
    checkoutDetails: {
      error: null,
      isLoading: false,
    },
    collectPoints: {
      error: null,
      isLoading: false,
    },
    itemTags: {
      error: null,
      isLoading: false,
    },
    promoCode: {
      error: null,
      isLoading: false,
    },
    tags: {
      error: null,
      isLoading: false,
    },
    giftMessage: {
      error: null,
      isLoading: false,
    },
    charges: {
      error: null,
      isLoading: false,
      result: {
        id: '00000000-0000-0000-0000-000000000000',
        status: 'Processing',
        redirectUrl: 'some url',
        returnUrl: 'some url',
        cancelUrl: 'some url',
      },
    },
    deliveryBundleUpgrades: {
      error: null,
      isLoading: false,
    },
    itemDeliveryProvisioning: {
      error: null,
      isLoading: false,
    },
    upgradeItemDeliveryProvisioning: {
      error: null,
      isLoading: false,
    },
    operations: {
      error: null,
      isLoading: false,
    },
    operation: {
      error: null,
      isLoading: false,
    },
    orderItem: {
      error: null,
      isLoading: false,
    },
  },
  entities: {
    checkout: { [checkoutId]: checkoutEntity },
    checkoutOrders: { [checkoutOrderId]: checkoutOrderEntity },
    checkoutOrderItems: {
      [checkoutOrderItemId]: checkoutOrderItemEntity,
    },
    checkoutOrderItemProducts: {
      [productId]: checkoutOrderItemProductEntity,
    },
    checkoutDetails: {
      [checkoutId]: {
        checkoutOrder: checkoutOrderId,
        registered: true,
      },
    },
    products: { [productId]: productEntity },
    deliveryBundles: deliveryBundlesEntity,
    deliveryBundleUpgrades: deliveryBundleUpgradesEntity,
  },
};

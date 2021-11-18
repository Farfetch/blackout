// @TODO: Remove this file in version 2.0.0.
export const siteFeatures = [
  {
    id: '0016bf30-4721-4bcf-9f59-a3fea221d319',
    name: 'domain.area',
    status: true,
    siteId: 34,
    type: 'Theme',
  },
  {
    id: '4bfbfbcf-4c44-4623-9a96-7710f96e0dc1',
    name: 'checkout.payments.useMultiplePaymentMethods',
    status: true,
    siteId: 34,
    type: 'Theme',
  },
  {
    id: 'f93a631f-eb9c-4d04-9c06-56598965cf3b',
    name: 'checkout.shippingMode.byBundle',
    status: false,
    siteId: 34,
    type: 'Theme',
  },
  {
    id: 'd27245d8-60ca-446f-9121-1e58a0acfcba',
    name: 'checkout.payments.shouldUsePaymentGateway',
    status: true,
    siteId: 34,
    type: 'Theme',
  },
];

export default {
  siteFeatures: {
    error: null,
    result: siteFeatures,
    isLoading: false,
  },
};

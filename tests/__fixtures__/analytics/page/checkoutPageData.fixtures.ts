import { pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  event: pageTypes.CHECKOUT,
  properties: {
    total: 100,
    shipping: 10,
    checkoutOrderId: 12345678,
    orderId: 'ASH12',
  },
};

export default fixtures;

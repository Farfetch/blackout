import { PageType } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures.mjs';

const fixtures = {
  ...basePageData,
  event: PageType.Checkout,
  properties: {
    total: 100,
    shipping: 10,
    checkoutOrderId: 12345678,
    orderId: 'ASH12',
  },
};

export default fixtures;

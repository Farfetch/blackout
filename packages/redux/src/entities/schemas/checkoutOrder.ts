import { schema } from 'normalizr';
import checkoutOrderItem from './checkoutOrderItem.js';
import merchant from './merchant.js';
import preprocessOrder from '../../helpers/preprocessOrder.js';

export default new schema.Entity(
  'checkoutOrders',
  {
    checkoutOrderMerchants: [{ merchant }],
    items: [checkoutOrderItem],
  },
  {
    processStrategy: value => {
      const { checkoutOrderMerchants, ...order } = value;

      const orderMerchants = checkoutOrderMerchants.map((order: any) => {
        const { merchantId, merchantName, ...item } = order;

        item.merchant = {
          id: merchantId,
          name: merchantName,
        };

        return item;
      });

      order.checkoutOrderMerchants = orderMerchants;

      return preprocessOrder(order);
    },
  },
);

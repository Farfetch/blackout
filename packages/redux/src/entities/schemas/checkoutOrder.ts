import { adaptDate } from '../../helpers/adapters';
import { schema } from 'normalizr';
import checkoutOrderItem from './checkoutOrderItem';
import merchant from './merchant';
import trim from 'lodash/trim';

export default new schema.Entity(
  'checkoutOrders',
  {
    checkoutOrderMerchants: [{ merchant }],
    items: [checkoutOrderItem],
  },
  {
    processStrategy: value => {
      const { checkoutOrderMerchants, createdDate, updatedDate, ...order } =
        value;

      const orderMerchants = checkoutOrderMerchants.map((order: any) => {
        const { merchantId, merchantName, ...item } = order;

        item.merchant = {
          id: merchantId,
          name: merchantName,
        };

        return item;
      });

      order.createdDate = adaptDate(createdDate);
      order.updatedDate = adaptDate(updatedDate);
      order.checkoutOrderMerchants = orderMerchants;

      return {
        ...order,
        billingAddress: {
          ...order.billingAddress,
          addressLine1: trim(order.billingAddress.addressLine1),
          addressLine2: trim(order.billingAddress.addressLine2),
        },
        shippingAddress: {
          ...order.shippingAddress,
          addressLine1: trim(order.shippingAddress.addressLine1),
          addressLine2: trim(order.shippingAddress.addressLine2),
        },
      };
    },
  },
);

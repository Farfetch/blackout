import { schema } from 'normalizr';
import checkoutOrder from './checkoutOrder';
import deliveryBundles from './deliveryBundles';

export default new schema.Entity(
  'checkout',
  {
    checkoutOrder,
    deliveryBundles,
  },
  {
    processStrategy: value => {
      const {
        checkoutOrder,
        shippingOptions,
        deliveryBundles,
        paymentMethods,
        userPaymentTokens,
        orderStatus,
        ...rest
      } = value;

      const result = {
        checkoutOrder,
        ...rest,
      };

      if (shippingOptions !== null) {
        result['shippingOptions'] = shippingOptions;
      }

      if (deliveryBundles !== null) {
        result['deliveryBundles'] = deliveryBundles;
      }

      if (paymentMethods !== null) {
        result['paymentMethods'] = paymentMethods;
      }

      if (userPaymentTokens !== null) {
        result['userPaymentTokens'] = userPaymentTokens;
      }

      if (orderStatus !== null) {
        result['orderStatus'] = orderStatus;
      }

      return result;
    },
  },
);

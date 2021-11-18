import { schema } from 'normalizr';
import checkoutOrder from './checkoutOrder';

export default new schema.Entity(
  'transaction',
  {
    checkoutOrder,
  },
  {
    processStrategy: value => {
      const {
        checkoutOrder,
        shippingOptions,
        deliveryBundles,
        paymentMethods,
        paymentLink,
        ...rest
      } = value;

      const result = {
        checkoutOrder: checkoutOrder,
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

      return result;
    },
  },
);

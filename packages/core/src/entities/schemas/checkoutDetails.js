import { schema } from 'normalizr';
import checkoutOrder from './checkoutOrder';

export default new schema.Entity(
  'checkoutDetails',
  {
    checkoutOrder,
  },
  {
    idAttribute: value => value.checkoutOrder.id,
  },
);

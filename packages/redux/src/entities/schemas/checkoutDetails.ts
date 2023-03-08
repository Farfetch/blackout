import { schema } from 'normalizr';
import checkoutOrder from './checkoutOrder.js';

export default new schema.Entity(
  'checkoutDetails',
  {
    checkoutOrder,
  },
  {
    idAttribute: value => value.checkoutOrder.id,
  },
);

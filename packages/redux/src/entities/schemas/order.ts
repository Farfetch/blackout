import { schema } from 'normalizr';
import orderItem from './orderItem';
import preprocessOrder from '../../helpers/preprocessOrder';
import type { Order } from '@farfetch/blackout-client';

export default new schema.Entity(
  'orders',
  { items: [orderItem] },
  {
    processStrategy: (order: Order) => {
      // This is needed since the Farfetch Checkout service is merging
      // both Address Line 2 and Address Line 3 not checking correctly if the
      // second is empty, when the user fills the third address line but not
      // the second it adds a space when merging the values and returns it
      // in the second line.
      // This only occurs in the order details not in the address book.
      return preprocessOrder(order);
    },
  },
);

import { adaptDate } from './adapters';
import trim from 'lodash/trim';
import type { Order } from '@farfetch/blackout-client';

/**
 * Preprocesses the order mainly to fix addresses and convert dates
 * giving a "semi" normalized order because it still has the "items"
 * property intact, which will be normalized after.
 *
 * @param order - Order to be preprocessed
 * @returns - Order semi normalized.
 */
export default function preprocessOrder(order: Order) {
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
    createdDate: adaptDate(order.createdDate),
    updatedDate: adaptDate(order.updatedDate),
  };
}

import { adaptDate } from './adapters';
import omit from 'lodash/omit';
import trim from 'lodash/trim';
import type {
  Order,
  OrderLegacy,
  UserAddress,
  UserAddressLegacy,
} from '@farfetch/blackout-client';

/**
 * Preprocesses the order mainly to fix addresses and convert dates
 * giving a "semi" normalized order because it still has the "items"
 * property intact, which will be normalized after.
 *
 * @param order - Order to be preprocessed
 * @returns - Order semi normalized.
 */
export default function preprocessOrder(order: Order | OrderLegacy) {
  const billingAddress = order.billingAddress;
  const shippingAddress = order.shippingAddress;

  return {
    ...order,
    billingAddress: billingAddress
      ? {
          ...omit(billingAddress, [
            'isDefaultShippingAddress',
            'isDefaultBillingAddress',
            'isPreferredAddress',
          ]),
          addressLine1: trim(billingAddress.addressLine1),
          addressLine2: trim(billingAddress.addressLine2),
          isCurrentShipping:
            !!(billingAddress as UserAddress).isCurrentShipping ||
            !!(billingAddress as UserAddressLegacy).isDefaultShippingAddress,
          isCurrentBilling:
            !!(billingAddress as UserAddress).isCurrentBilling ||
            !!(billingAddress as UserAddressLegacy).isDefaultBillingAddress,
          isCurrentPreferred:
            !!(billingAddress as UserAddress).isCurrentPreferred ||
            !!(billingAddress as UserAddressLegacy).isPreferredAddress,
        }
      : undefined,
    shippingAddress: shippingAddress
      ? {
          ...omit(shippingAddress, [
            'isDefaultShippingAddress',
            'isDefaultBillingAddress',
            'isPreferredAddress',
          ]),
          addressLine1: trim(shippingAddress.addressLine1),
          addressLine2: trim(shippingAddress.addressLine2),
          isCurrentShipping:
            !!(shippingAddress as UserAddress).isCurrentShipping ||
            !!(shippingAddress as UserAddressLegacy).isDefaultShippingAddress,
          isCurrentBilling:
            !!(shippingAddress as UserAddress).isCurrentBilling ||
            !!(shippingAddress as UserAddressLegacy).isDefaultBillingAddress,
          isCurrentPreferred:
            !!(shippingAddress as UserAddress).isCurrentPreferred ||
            !!(shippingAddress as UserAddressLegacy).isPreferredAddress,
        }
      : undefined,
    createdDate: adaptDate(order.createdDate),
    updatedDate: adaptDate(order.updatedDate),
  };
}

import type { CheckoutAddress } from '../../types/index.js';
import type { CheckoutOrder } from '../../checkout/index.js';
import type { Order } from './order.types.js';

export type OrderShippingAddressChangeRequests =
  Array<OrderShippingAddressChangeRequest>;

export type OrderShippingAddressChangeRequest = {
  id: string;
  checkoutOrderId: CheckoutOrder['id'];
  orderId: Order['id'];
  status: OrderShippingAddressChangeRequestStatus;
  createdDate: string;
  updatedDate: string;
  merchantOrders: Array<{ id: string }>;
  shippingAddress: CheckoutAddress;
  isForcedUpdate: boolean;
};

export enum OrderShippingAddressChangeRequestStatus {
  Requested = 'Requested',
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
  TimedOut = 'TimedOut',
  Cancelled = 'Cancelled',
}

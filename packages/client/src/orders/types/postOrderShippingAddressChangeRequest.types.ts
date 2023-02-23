import type { Config } from '../../types';
import type { Order, OrderShippingAddressChangeRequest } from '.';

export type PostOrderShippingAddressChangeRequest = (
  orderId: Order['id'],
  data: OrderShippingAddressChangeRequestData,
  config?: Config,
) => Promise<number>;

export type OrderShippingAddressChangeRequestData = Pick<
  OrderShippingAddressChangeRequest,
  'merchantOrders' | 'shippingAddress' | 'isForcedUpdate'
>;

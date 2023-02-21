import type { Config } from '../../types/index.js';
import type { Order, OrderShippingAddressChangeRequest } from './index.js';

export type PostOrderShippingAddressChangeRequest = (
  orderId: Order['id'],
  data: OrderShippingAddressChangeRequestData,
  config?: Config,
) => Promise<number>;

export type OrderShippingAddressChangeRequestData = Pick<
  OrderShippingAddressChangeRequest,
  'merchantOrders' | 'shippingAddress' | 'isForcedUpdate'
>;

import type { Config } from '../../types/index.js';
import type { Order, OrderShippingAddressChangeRequest } from './index.js';

export type PostOrderShippingAddressChangeRequest = (
  orderId: Order['id'],
  data: PostOrderShippingAddressChangeRequestData,
  config?: Config,
) => Promise<number>;

export type PostOrderShippingAddressChangeRequestData = Pick<
  OrderShippingAddressChangeRequest,
  'merchantOrders' | 'shippingAddress' | 'isForcedUpdate'
>;

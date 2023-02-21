import type { Config } from '../../types/index.js';
import type { Order, OrderShippingAddressChangeRequests } from './index.js';

export type GetOrderShippingAddressChangeRequests = (
  orderId: Order['id'],
  config?: Config,
) => Promise<OrderShippingAddressChangeRequests>;

import type { Config } from '../../types';
import type { Order, OrderShippingAddressChangeRequests } from '.';

export type GetOrderShippingAddressChangeRequests = (
  orderId: Order['id'],
  config?: Config,
) => Promise<OrderShippingAddressChangeRequests>;

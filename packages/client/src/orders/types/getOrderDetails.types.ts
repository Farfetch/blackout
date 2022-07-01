import type { Config } from '../../types';
import type { Order } from './order.types';

export type GetOrderDetails = (id: string, config?: Config) => Promise<Order>;

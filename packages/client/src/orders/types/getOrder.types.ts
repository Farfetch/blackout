import type { Config } from '../../types';
import type { Order } from './order.types';

export type GetOrder = (id: string, config?: Config) => Promise<Order>;

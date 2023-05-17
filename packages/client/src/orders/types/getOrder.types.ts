import type { Config } from '../../types/index.js';
import type { Order } from './order.types.js';

export type GetOrder = (id: string, config?: Config) => Promise<Order>;

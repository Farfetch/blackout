import type { Config } from '../../types/index.js';
import type { Order } from './index.js';

export type GetGuestOrders = (config?: Config) => Promise<Order[]>;

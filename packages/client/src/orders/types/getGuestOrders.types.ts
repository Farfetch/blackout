import type { Config } from '../../types';
import type { Order } from '.';

export type GetGuestOrders = (config?: Config) => Promise<Order[]>;

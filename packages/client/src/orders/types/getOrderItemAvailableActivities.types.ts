import type { Config } from '../..';

export type GetOrderItemAvailableActivities = (
  id: string,
  itemId: string,
  config?: Config,
) => Promise<string>;

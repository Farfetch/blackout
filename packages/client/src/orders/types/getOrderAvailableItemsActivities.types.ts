import type { Config } from '../..';

export type GetOrderAvailableItemsActivities = (
  id: string,
  config?: Config,
) => Promise<string>;

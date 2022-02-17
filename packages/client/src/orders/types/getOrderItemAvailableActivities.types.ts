export type GetOrderItemAvailableActivities = (
  id: string,
  itemId: string,
  config?: Record<string, unknown>,
) => Promise<string>;

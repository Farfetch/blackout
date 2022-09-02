export type ReturnItem = {
  id: number;
  orderItemId: number;
  reason: string;
  description?: string;
  status: string;
};

export type PostReturnItemData = Omit<ReturnItem, 'id' | 'status'>;

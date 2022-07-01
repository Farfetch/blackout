export type OrdersResponse = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: OrderSummary[];
};

export type OrderSummary = {
  id: string;
  userId: number;
  merchantId: number;
  merchantName: string;
  totalQuantity: number;
  status: string;
  createdDate: string;
  returnAvailable: boolean;
  checkoutOrderId: number;
  returnId: number;
  deliveryDate?: string;
  maxReturnDate?: string;
  tags: string[];
  merchantOrderCode: string;
};

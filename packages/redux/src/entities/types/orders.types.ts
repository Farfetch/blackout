export type OrdersEntity = {
  id: number;
  createdDate: number;
  totalItems: number;
  byMerchant: Record<Merchant['merchant'], Merchant>;
};

type Merchant = {
  userId: number;
  totalQuantity: number;
  status: string;
  returnAvailable: boolean;
  checkoutOrderId: number;
  tags: string[];
  merchantOrderCode: string;
  merchant: number;
};

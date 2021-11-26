export type MerchantAdapted =
  | {
      id: number;
      name: string | undefined;
      shoppingUrl: string | undefined;
    }
  | undefined;

export type AdaptMerchant = (merchant: {
  merchantId?: number;
  merchantName?: string;
  merchantShoppingUrl?: string;
}) => MerchantAdapted;

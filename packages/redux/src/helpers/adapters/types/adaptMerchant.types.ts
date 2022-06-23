export type MerchantAdapted =
  | {
      id: number;
      name: string | undefined;
      shoppingUrl: string | undefined;
    }
  | undefined;

export type AdaptMerchant = (merchant: {
  // Merchant id to adapt.
  merchantId?: number;
  // Merchant name to adapt.
  merchantName?: string;
  // Merchant shopping url to adapt.
  merchantShoppingUrl?: string;
}) => MerchantAdapted;

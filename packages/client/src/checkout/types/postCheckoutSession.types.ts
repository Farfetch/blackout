import type { Bag } from '../../bags/types/bag.types.js';
import type {
  CheckoutSession,
  CheckoutSessionMetadata,
} from './checkoutSession.types.js';
import type { Config } from '../../types/index.js';
import type { PostCheckoutOrderItem } from './postCheckoutOrder.types.js';

export type PostCheckoutSessionData = {
  email?: string;
  metadata?: CheckoutSessionMetadata;
  successUrl: string;
  cancelUrl: string;
  tenantId?: number;
  customerId?: number;
  isGuestUser?: boolean;
};

export type PostCheckoutSessionItem = Omit<
  PostCheckoutOrderItem,
  'customAttributes' | 'productAggregatorId'
> & {
  customAttributes?: PostCheckoutOrderItem['customAttributes'];
  productAggregatorId?: PostCheckoutOrderItem['productAggregatorId'];
};

export type PostCheckoutSessionDataWithItems = PostCheckoutSessionData & {
  items: PostCheckoutSessionItem[];
};

export type PostCheckoutSessionDataWithPaymentLink = PostCheckoutSessionData & {
  paymentLink: string;
  removePurchasedItemsFromBag?: boolean;
};

export type PostCheckoutSessionDataWithBagId = PostCheckoutSessionData & {
  bagId: Bag['id'];
};

export type PostCheckoutSession = (
  data:
    | PostCheckoutSessionDataWithItems
    | PostCheckoutSessionDataWithPaymentLink
    | PostCheckoutSessionDataWithBagId,
  config?: Config,
) => Promise<CheckoutSession>;

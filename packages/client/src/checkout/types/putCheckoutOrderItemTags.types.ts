import type {
  CheckoutOrder,
  CheckoutOrderItem,
  GetCheckoutOrderResponse,
} from './index.js';
import type { Config } from '../../types/index.js';

export type PutCheckoutOrderItemTags = (
  checkoutOrderId: CheckoutOrder['id'],
  orderItemId: CheckoutOrderItem['id'],
  data: string[],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;

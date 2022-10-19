import type {
  CheckoutOrder,
  CheckoutOrderItem,
  GetCheckoutOrderResponse,
} from '.';
import type { Config } from '../../types';

export type PutCheckoutOrderItemTags = (
  checkoutOrderId: CheckoutOrder['id'],
  orderItemId: CheckoutOrderItem['id'],
  data: string[],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;

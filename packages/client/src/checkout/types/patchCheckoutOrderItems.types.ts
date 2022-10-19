import type { CheckoutOrder } from './checkoutOrder.types';
import type { Config } from '../../types';

type GiftMessage = {
  from: string;
  to: string;
  message?: string;
};

type Operation = {
  value: GiftMessage;
  path: string;
  op: string;
  from: string;
};

export type PatchCheckoutOrderItemsData = {
  checkoutOrderItemId: number;
  checkoutItemPatchDocument: {
    operations: Operation[];
  };
}[];

export type PatchCheckoutOrderItems = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PatchCheckoutOrderItemsData,
  config?: Config,
) => Promise<number>;

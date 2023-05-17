import type { AddPatch, RemovePatch, ReplacePatch } from 'json-patch';
import type { CheckoutOrder } from './checkoutOrder.types.js';
import type { CheckoutOrderItem } from './checkoutOrderItem.types.js';
import type { Config } from '../../types/index.js';

export type GiftMessage = {
  from: string;
  to: string;
  message?: string;
};

export type AddPatchGiftMessage = Omit<AddPatch, 'value'> & {
  value: GiftMessage;
};

export type ReplacePatchGiftMessage = Omit<ReplacePatch, 'value'> & {
  value: GiftMessage;
};

export type PatchCheckoutOrderItemsOperation =
  | AddPatchGiftMessage
  | ReplacePatchGiftMessage
  | RemovePatch;

export type PatchCheckoutOrderItemsData = {
  checkoutOrderItemId: CheckoutOrderItem['id'];
  checkoutItemPatchDocument: PatchCheckoutOrderItemsOperation[];
}[];

export type PatchCheckoutOrderItems = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PatchCheckoutOrderItemsData,
  config?: Config,
) => Promise<number>;

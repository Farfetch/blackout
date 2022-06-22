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
  id: number,
  data: PatchCheckoutOrderItemsData,
  config?: Config,
) => Promise<number>;

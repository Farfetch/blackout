import type { Config } from '../../types';

type GiftMessage = {
  from: string;
  to: string;
  message: string;
};

type Operation = {
  value: GiftMessage;
  path: string;
  op: string;
  from: string;
};

export type PatchGiftMessageData = {
  checkoutOrderItemId: number;
  checkoutItemPatchDocument: {
    operations: Operation[];
  };
}[];

export type PatchGiftMessage = (
  id: number,
  data: PatchGiftMessageData,
  config?: Config,
) => Promise<number>;

import type { CheckoutOrderItem } from './checkoutOrderItem.types.js';

enum Action {
  DecreaseQuantity = 'DecreaseQuantity',
}

type CheckoutViolationFixSuggestion = {
  action: Action;
  value: string;
};

export type CheckoutViolation = {
  itemsIds?: Array<CheckoutOrderItem['id']>;
  fixSuggestion?: CheckoutViolationFixSuggestion;
};

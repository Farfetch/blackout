import type { Item } from './item.types';

enum Action {
  DecreaseQuantity = 'DecreaseQuantity',
}

type CheckoutViolationFixSuggestion = {
  action: Action;
  value: string;
};

export type CheckoutViolation = {
  itemsIds?: Array<Item['id']>;
  fixSuggestion?: CheckoutViolationFixSuggestion;
};

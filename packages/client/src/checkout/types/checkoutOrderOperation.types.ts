import type { CheckoutOrderOperationChange } from './checkoutOrderOperationChange.types';
import type { CheckoutViolation } from './checkoutViolation.types';

export type CheckoutOrderOperation = {
  id?: string;
  createdDate?: string;
  changes?: Array<CheckoutOrderOperationChange>;
  violations?: Array<CheckoutViolation>;
};

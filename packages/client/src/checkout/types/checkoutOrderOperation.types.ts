import type { CheckoutOrderOperationChange } from './checkoutOrderOperationChange.types.js';
import type { CheckoutViolation } from './checkoutViolation.types.js';

export type CheckoutOrderOperation = {
  id: string;
  createdDate: string;
  changes: Array<CheckoutOrderOperationChange>;
  violations: Array<CheckoutViolation>;
};

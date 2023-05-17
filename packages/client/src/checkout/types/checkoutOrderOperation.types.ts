import {
  OperationChangeReason as CheckoutOrderOperationChangeReason,
  OperationChangeType as CheckoutOrderOperationChangeType,
  OperationViolationFixSuggestionType as CheckoutViolationFixSuggestionType,
  type OperationChange,
  type OperationViolation,
  type OperationViolationFixSuggestion,
} from '../../types/common/operation.types.js';

export { CheckoutOrderOperationChangeReason };

export { CheckoutOrderOperationChangeType };

export { CheckoutViolationFixSuggestionType };

export type CheckoutViolationFixSuggestion = Omit<
  OperationViolationFixSuggestion,
  'action'
> & {
  action: CheckoutViolationFixSuggestionType;
};

export type CheckoutViolation = Omit<OperationViolation, 'fixSuggestion'> & {
  fixSuggestion?: CheckoutViolationFixSuggestion;
};

export type CheckoutOrderOperationChange = Omit<
  OperationChange,
  'changeType' | 'reason'
> & {
  changeType: CheckoutOrderOperationChangeType;
  reason: CheckoutOrderOperationChangeReason;
};

export type CheckoutOrderOperation = {
  id: string;
  createdDate: string;
  changes: Array<CheckoutOrderOperationChange>;
  violations: Array<CheckoutViolation>;
};

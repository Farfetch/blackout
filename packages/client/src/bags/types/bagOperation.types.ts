import {
  OperationChangeReason as BagOperationChangeReason,
  OperationChangeType as BagOperationChangeType,
  OperationViolationFixSuggestionType as BagViolationFixSuggestionType,
  type OperationChange,
  type OperationViolation,
  type OperationViolationFixSuggestion,
} from '../../types/common/operation.types.js';

export { BagOperationChangeReason };

export { BagOperationChangeType };

export { BagViolationFixSuggestionType };

export type BagViolationFixSuggestion = Omit<
  OperationViolationFixSuggestion,
  'action'
> & {
  action: BagViolationFixSuggestionType;
};

export type BagViolation = Omit<OperationViolation, 'fixSuggestion'> & {
  fixSuggestion?: BagViolationFixSuggestion;
};

export type BagOperationChange = Omit<
  OperationChange,
  'changeType' | 'reason'
> & {
  changeType: BagOperationChangeType;
  reason: BagOperationChangeReason;
};

export type BagOperation = {
  id: string;
  createdDate: string;
  changes: Array<BagOperationChange>;
  violations: Array<BagViolation>;
};

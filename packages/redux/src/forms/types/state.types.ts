import type { BlackoutError, FormSchema } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type FormsState = CombinedState<{
  result: FormsResult;
  error: Record<string, BlackoutError | undefined | null>;
  isLoading: Record<string, boolean>;
  isSubmitFormLoading: Record<string, boolean>;
  submitFormError: Record<string, BlackoutError | undefined | null>;
}>;

export type FormsResult = Record<string, FormSchema>;

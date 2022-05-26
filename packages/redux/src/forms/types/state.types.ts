import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { FormSchema } from '@farfetch/blackout-client/forms/types';

export type State = CombinedState<{
  result: FormResult;
  error: Record<string, BlackoutError | undefined | null>;
  isLoading: Record<string, boolean>;
  isSubmitFormLoading: Record<string, boolean>;
  submitFormError: Record<string, BlackoutError | undefined | null>;
}>;

export type FormResult = Record<string, FormSchema>;

import type { Dispatch } from 'redux';
import type { PostFormData } from '@farfetch/blackout-client';
import type { SubmitFormDataAction } from '../../../types/index.js';

export type SubmitFormDataFactory<T extends PostFormData> = (
  postFormData: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<SubmitFormDataAction>) => ReturnType<T>;

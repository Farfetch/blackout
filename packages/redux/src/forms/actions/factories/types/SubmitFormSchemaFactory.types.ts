import type { Dispatch } from 'redux';
import type { PostFormSchema } from '@farfetch/blackout-client/forms/types';
import type { SubmitFormSchemaAction } from '../../../types';

export type SubmitFormSchemaFactory<T extends PostFormSchema> = (
  postFormData: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<SubmitFormSchemaAction>) => ReturnType<T>;

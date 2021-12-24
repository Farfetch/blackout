import type { Dispatch } from 'redux';
import type { FetchFormSchemaAction } from '../../../types';
import type { GetFormSchema } from '@farfetch/blackout-client/forms/types';

export type FetchFormSchemaFactory<T extends GetFormSchema> = (
  getFormSchema: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<FetchFormSchemaAction>) => ReturnType<T>;

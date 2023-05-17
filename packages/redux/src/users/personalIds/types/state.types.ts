import type { StateWithResult } from '../../../types/subAreaState.types.js';
import type { UserPersonalId } from '@farfetch/blackout-client';

export type DefaultPersonalIdSliceState = StateWithResult<UserPersonalId>;

export type UserPersonalIdsState = StateWithResult<UserPersonalId[]> & {
  defaultPersonalId: DefaultPersonalIdSliceState;
};

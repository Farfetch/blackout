import type { BlackoutError } from '@farfetch/blackout-client';
import type { StaffMember } from '@farfetch/blackout-client/staffMembers/types';

export type State = {
  error: Record<StaffMember['id'], BlackoutError | undefined>;
  isLoading: Record<StaffMember['id'], boolean | undefined>;
  result: Record<StaffMember['id'], StaffMember>;
};

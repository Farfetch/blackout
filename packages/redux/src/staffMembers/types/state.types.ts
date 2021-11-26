import type { Error } from '@farfetch/blackout-client/types';
import type { StaffMember } from '@farfetch/blackout-client/staffMembers/types';

export type State = {
  error: Record<StaffMember['id'], Error | undefined>;
  isLoading: Record<StaffMember['id'], boolean | undefined>;
  result: Record<StaffMember['id'], StaffMember>;
};

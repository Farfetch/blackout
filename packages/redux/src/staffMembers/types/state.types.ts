import type { BlackoutError, StaffMember } from '@farfetch/blackout-client';

export type StaffMembersState = {
  error: Record<StaffMember['id'], BlackoutError | undefined>;
  isLoading: Record<StaffMember['id'], boolean | undefined>;
  result: Record<StaffMember['id'], StaffMember>;
};

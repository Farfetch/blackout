import type { ProgramMembership } from '@farfetch/blackout-client/loyalty/types';

export type MembershipEntity =
  | Record<ProgramMembership['id'], ProgramMembership>
  | undefined;

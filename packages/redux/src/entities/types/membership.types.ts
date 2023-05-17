import type { ProgramMembership } from '@farfetch/blackout-client';

export type MembershipEntity =
  | Record<ProgramMembership['id'], ProgramMembership>
  | undefined;

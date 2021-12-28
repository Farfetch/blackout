import type { ProgramMembershipReplacement } from '@farfetch/blackout-client/loyalty/types';

export type ReplacementEntity = ProgramMembershipReplacement;

export type ReplacementsEntity =
  | Record<ProgramMembershipReplacement['id'], ProgramMembershipReplacement>
  | undefined;

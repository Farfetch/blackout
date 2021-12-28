import type { ProgramMembershipStatement } from '@farfetch/blackout-client/loyalty/types';

export type StatementEntity = ProgramMembershipStatement;

export type StatementsEntity =
  | Record<ProgramMembershipStatement['id'], ProgramMembershipStatement>
  | undefined;

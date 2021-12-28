import type { ProgramMembershipConvert } from '@farfetch/blackout-client/loyalty/types';

export type ConvertEntity = ProgramMembershipConvert;

export type ConvertsEntity =
  | Record<ProgramMembershipConvert['id'], ProgramMembershipConvert>
  | undefined;

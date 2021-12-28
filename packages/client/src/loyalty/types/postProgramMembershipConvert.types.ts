import type { Config } from '../../types';
import type { Program, ProgramMembership, ProgramMembershipConvert } from '.';

export type PostProgramMembershipConvert = (
  programId: Program['id'],
  membershipId: ProgramMembership['id'],
  config?: Config,
) => Promise<ProgramMembershipConvert>;

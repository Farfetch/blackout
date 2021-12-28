import type { Config } from '../../types';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipReplacement,
} from '.';

export type PostProgramMembershipReplacement = (
  programId: Program['id'],
  membershipId: ProgramMembership['id'],
  data: ProgramMembershipReplacement,
  config?: Config,
) => Promise<ProgramMembershipReplacement>;

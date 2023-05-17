import type { Config } from '../../types/index.js';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipReplacement,
} from './index.js';

export type PostProgramMembershipReplacement = (
  programId: Program['id'],
  membershipId: ProgramMembership['id'],
  data: ProgramMembershipReplacement,
  config?: Config,
) => Promise<ProgramMembershipReplacement>;

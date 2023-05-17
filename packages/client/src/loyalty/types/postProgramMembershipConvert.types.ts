import type { Config } from '../../types/index.js';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
} from './index.js';

export type PostProgramMembershipConvert = (
  programId: Program['id'],
  membershipId: ProgramMembership['id'],
  config?: Config,
) => Promise<ProgramMembershipConvert>;

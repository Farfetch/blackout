import type { Config } from '../../types/index.js';
import type { Program, ProgramMembership } from './index.js';

export type PostProgramMembership = (
  programId: Program['id'],
  data: ProgramMembership,
  config?: Config,
) => Promise<ProgramMembership>;

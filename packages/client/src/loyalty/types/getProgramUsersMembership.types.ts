import type { Config } from '../../types/index.js';
import type { Program, ProgramMembership } from './index.js';

export type GetProgramUsersMembership = (
  programId: Program['id'],
  config?: Config,
) => Promise<ProgramMembership>;

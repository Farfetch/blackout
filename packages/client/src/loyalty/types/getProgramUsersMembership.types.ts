import type { Config } from '../../types';
import type { Program, ProgramMembership } from '.';

export type GetProgramUsersMembership = (
  programId: Program['id'],
  config?: Config,
) => Promise<ProgramMembership>;

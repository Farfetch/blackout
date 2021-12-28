import type { Config } from '../../types';
import type { Program, ProgramMembership } from '.';

export type PostProgramMembership = (
  programId: Program['id'],
  data: ProgramMembership,
  config?: Config,
) => Promise<ProgramMembership>;

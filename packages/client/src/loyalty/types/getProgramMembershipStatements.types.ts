import type { Config } from '../../types/index.js';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipStatement,
  ProgramMembershipStatementCategory,
} from './index.js';

export type GetProgramMembershipStatementsQuery = {
  category?: ProgramMembershipStatementCategory;
  initialDate?: string;
  finalDate?: string;
  'pageFilter.pageIndex'?: number;
  'pageFilter.pageSize'?: number;
};

export type GetProgramMembershipStatements = (
  programId: Program['id'],
  membershipId: ProgramMembership['id'],
  query?: GetProgramMembershipStatementsQuery,
  config?: Config,
) => Promise<ProgramMembershipStatement[]>;

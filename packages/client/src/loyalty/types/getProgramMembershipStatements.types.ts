import type { Config } from '../../types';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipStatement,
  ProgramMembershipStatementCategory,
} from '.';

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

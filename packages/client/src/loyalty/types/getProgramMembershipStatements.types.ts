import type { Config } from '../../types';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipStatement,
  ProgramMembershipStatementCategory,
} from '.';

export type PageFilter = {
  pageIndex?: number;
  pageSize?: number;
};

export type GetProgramMembershipStatementsQuery = {
  category?: ProgramMembershipStatementCategory;
  initialDate?: string;
  finalDate?: string;
  pageFilter?: PageFilter;
};

export type GetProgramMembershipStatements = (
  programId: Program['id'],
  membershipId: ProgramMembership['id'],
  query?: GetProgramMembershipStatementsQuery,
  config?: Config,
) => Promise<ProgramMembershipStatement[]>;

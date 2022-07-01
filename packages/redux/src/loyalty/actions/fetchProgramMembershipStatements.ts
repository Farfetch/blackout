import { fetchProgramMembershipStatementsFactory } from './factories';
import { getProgramMembershipStatements } from '@farfetch/blackout-client';

/**
 * Load program membership statements.
 */
export default fetchProgramMembershipStatementsFactory(
  getProgramMembershipStatements,
);

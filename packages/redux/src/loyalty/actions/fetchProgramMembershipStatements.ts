import { fetchProgramMembershipStatementsFactory } from './factories';
import { getProgramMembershipStatements } from '@farfetch/blackout-client/loyalty';

/**
 * Load program membership statements.
 */
export default fetchProgramMembershipStatementsFactory(
  getProgramMembershipStatements,
);

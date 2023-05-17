import { fetchProgramMembershipStatementsFactory } from './factories/index.js';
import { getProgramMembershipStatements } from '@farfetch/blackout-client';

/**
 * Load program membership statements.
 */
export default fetchProgramMembershipStatementsFactory(
  getProgramMembershipStatements,
);

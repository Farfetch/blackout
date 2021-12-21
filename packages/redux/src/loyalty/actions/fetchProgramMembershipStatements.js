import { fetchProgramMembershipStatementsFactory } from './factories';
import { getProgramMembershipStatements } from '@farfetch/blackout-client/loyalty';

/**
 * Load program membership statements.
 *
 * @memberof module:loyalty/actions
 *
 * @name fetchProgramMembershipStatements
 *
 * @type {FetchProgramMembershipStatementsThunkFactory}
 */
export default fetchProgramMembershipStatementsFactory(
  getProgramMembershipStatements,
);

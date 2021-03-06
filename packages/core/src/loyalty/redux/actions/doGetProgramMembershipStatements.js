import {
  GET_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE,
  GET_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST,
  GET_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import statementSchema from '../../../entities/schemas/statement';

/**
 * @typedef {object} GetProgramMembershipStatementsQuery
 * @property {string} Category - Gets/Sets the Category Add or Convert
 * statement.Possible Values: Purchase, Misc, Transfer, Bonus, Partner, Convert.
 * @property {string} InitialDate- Gets/Sets the InitialDate (Ex. 2017-07-20).
 * @property {string} FinalDate - Gets or sets the FinalDate (Ex. 2017-07-21).
 * @property {object} PageFilter - Page filter parameters.
 * @property {string} PageFilter.PageIndex - Gets or sets the
 * PageIndex (The default is 1).
 * @property {string} PageFilter.PageSize - Gets or sets the
 * PageSize (The default is 60).
 */

/**
 * @callback GetProgramMembershipStatementsThunkFactory
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Memberhip identifier.
 * @param {GetProgramMembershipStatementsQuery} query - Data to retrieve
 * memberships statements.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load program membership statements.
 *
 * @function doGetProgramMembershipStatements
 * @memberof module:loyalty/actions
 *
 * @param {Function} getProgramMembershipStatements - Get program membership
 * statements client.
 *
 * @returns {GetProgramMembershipStatementsThunkFactory} Thunk factory.
 */
export default getProgramMembershipStatements =>
  (programId, membershipId, query = {}, config) =>
  async dispatch => {
    dispatch({
      type: GET_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST,
    });

    try {
      const result = await getProgramMembershipStatements(
        programId,
        membershipId,
        query,
        config,
      );

      dispatch({
        payload: normalize(result, [statementSchema]),
        type: GET_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE,
      });

      throw error;
    }
  };

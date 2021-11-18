import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetProgramMembershipStatementsQuery
 *
 * @alias GetProgramMembershipStatementsQuery
 * @memberof module:loyalty/client
 *
 * @property {string} Category - Gets/Sets the Category Add or Convert
 * statement.Possible Values: Purchase, Misc, Transfer, Bonus, Partner, Convert.
 * @property {string} InitialDate- Gets/Sets the InitialDate (Ex. 2017-07-20).
 * @property {string} FinalDate - Gets or sets the FinalDate (Ex. 2017-07-21).
 * @property {object} PageFilter - PageFilter data.
 * @property {string} PageFilter.PageIndex - Gets or sets the
 * PageIndex (The default is 1).
 * @property {string} PageFilter.PageSize - Gets or sets the
 * PageSize (The default is 60).
 */

/**
 * Method responsible for loading the statements for a membership.
 *
 * @function getProgramMembershipStatements
 * @memberof module:loyalty/client
 *
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Memberhip identifier.
 * @param {GetProgramMembershipStatementsQuery} query - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (programId, membershipId, query, config) =>
  client
    .get(
      join(
        '/loyalty/v1/programs',
        programId,
        'memberships',
        membershipId,
        'statements',
        {
          query,
        },
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostProgramMembership } from './types';

/**
 * @typedef {object} CreateMembershipData
 * @property {string} id - Membership identifier.
 * @property {string} externalId - External identifier.
 * @property {number} userId - User identifier.
 * @property {number} rewardPoints - Reward Points.
 * @property {number} cashBalance - Cash balance.
 * @property {('Unverified'|'Activated'|'Invalid'|'Canceled')} status - Membership status.
 */

/**
 * Method responsible for creating a membership for a program.
 *
 * @function postProgramMembership
 * @memberof module:loyalty/client
 *
 * @param {string} programId - Program identifier.
 * @param {CreateMembershipData} data - Membership to be created.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postProgramMembership: PostProgramMembership = (
  programId,
  data,
  config,
) =>
  client
    .post(join('/loyalty/v1/programs', programId, 'memberships'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postProgramMembership;

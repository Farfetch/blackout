import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetStaffMember } from './types';

/**
 * Method responsible for getting the staff member given its identifier.
 *
 * @memberof module:staffMembers/client
 *
 * @param {string} id - Staff member identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getStaffMember: GetStaffMember = (id, config) =>
  client
    .get(join('/account/v1/staffMembers', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getStaffMember;

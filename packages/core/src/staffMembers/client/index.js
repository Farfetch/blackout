import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/staffMembers/client',
  '@farfetch/blackout-core/staffMembers',
);

/**
 * Staff Members clients.
 *
 * @module staffMembers/client
 * @category Staff Members
 * @subcategory Clients
 */

export { default as getStaffMember } from './getStaffMember';

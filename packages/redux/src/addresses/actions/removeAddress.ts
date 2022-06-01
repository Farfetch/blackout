import { deleteAddress } from '@farfetch/blackout-client/addresses';
import { removeAddressFactory } from './factories';

/**
 * Responsible for removing the address with the specified 'addressId'.
 */

export default removeAddressFactory(deleteAddress);

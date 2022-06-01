import { putAddress } from '@farfetch/blackout-client/addresses';
import { updateAddressFactory } from './factories';

/**
 * Updates the address information with the specified 'addressId'.
 */

export default updateAddressFactory(putAddress);

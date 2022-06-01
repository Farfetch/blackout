import { putUserAttribute } from '@farfetch/blackout-client/users';
import { setUserAttributeFactory } from './factories';

/**
 * Sets user attribute with given id.
 */
export default setUserAttributeFactory(putUserAttribute);

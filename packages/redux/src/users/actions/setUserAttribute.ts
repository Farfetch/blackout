import { putUserAttribute } from '@farfetch/blackout-client/users';
import { setUserAttributeFactory } from './factories';

/**
 * Sets user attribute with given id.
 *
 * @memberof module:users/actions
 *
 * @function setUserAttribute
 *
 * @type {SetUserAttributeThunkFactory}
 */
export default setUserAttributeFactory(putUserAttribute);

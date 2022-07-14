import { putUserAttribute } from '@farfetch/blackout-client';
import { setUserAttributeFactory } from './factories';

/**
 * Sets user attribute with given id.
 */
export const setUserAttribute = setUserAttributeFactory(putUserAttribute);

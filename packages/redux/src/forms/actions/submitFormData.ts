import { postFormData } from '@farfetch/blackout-client';
import { submitFormDataFactory } from './factories';

/**
 * Method responsible for submitting a form data for a specific schema.
 */
export default submitFormDataFactory(postFormData);

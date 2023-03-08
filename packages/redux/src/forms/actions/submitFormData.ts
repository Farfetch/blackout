import { postFormData } from '@farfetch/blackout-client';
import { submitFormDataFactory } from './factories/index.js';

/**
 * Method responsible for submitting a form data for a specific schema.
 */
export default submitFormDataFactory(postFormData);

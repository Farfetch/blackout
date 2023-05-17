import { fetchFormSchemaFactory } from './factories/index.js';
import { getFormSchema } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving a form schema.
 */
export default fetchFormSchemaFactory(getFormSchema);

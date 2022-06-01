import { fetchFormSchemaFactory } from './factories';
import { getFormSchema } from '@farfetch/blackout-client/forms';

/**
 * Method responsible for retrieving a form schema.
 */
export default fetchFormSchemaFactory(getFormSchema);

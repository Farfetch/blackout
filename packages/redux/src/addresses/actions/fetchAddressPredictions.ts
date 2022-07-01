import { fetchAddressPredictionsFactory } from './factories';
import { getAddressPredictions } from '@farfetch/blackout-client';

/**
 * Load Predictions based in the inserted text.
 */
export default fetchAddressPredictionsFactory(getAddressPredictions);

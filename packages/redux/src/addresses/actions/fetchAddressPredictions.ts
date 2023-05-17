import { fetchAddressPredictionsFactory } from './factories/index.js';
import { getAddressPredictions } from '@farfetch/blackout-client';

/**
 * Load Predictions based in the inserted text.
 */
export default fetchAddressPredictionsFactory(getAddressPredictions);

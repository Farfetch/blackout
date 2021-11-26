import { fetchPredictionsFactory } from './factories';
import { getPredictions } from '@farfetch/blackout-client/addresses';

/**
 * Load Predictions based in the inserted text.
 *
 * @memberof module:addresses/actions
 *
 * @name fetchPredictions
 *
 * @type {FetchPredictionsThunkFactory}
 */

export default fetchPredictionsFactory(getPredictions);

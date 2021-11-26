import { fetchPredictionDetailsFactory } from './factories';
import { getPredictionDetails } from '@farfetch/blackout-client/addresses';

/**
 * Load Address details based in the prediction id.
 *
 * @memberof module:addresses/actions
 *
 * @name fetchPredictionDetails
 *
 * @type {FetchPredictionDetailsThunkFactory}
 */

export default fetchPredictionDetailsFactory(getPredictionDetails);

import { fetchAddressPredictionDetailsFactory } from './factories';
import { getAddressPredictionDetails } from '@farfetch/blackout-client';

/**
 * Load Address details based in the prediction id.
 */
export default fetchAddressPredictionDetailsFactory(
  getAddressPredictionDetails,
);

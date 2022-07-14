import { fetchAddressPredictionFactory } from './factories';
import { getAddressPrediction } from '@farfetch/blackout-client';

/**
 * Load Address details based in the prediction id.
 */
export const fetchAddressPrediction =
  fetchAddressPredictionFactory(getAddressPrediction);

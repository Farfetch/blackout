import { fetchProductSizeGuidesFactory } from './factories';
import { getProductSizeGuides } from '@farfetch/blackout-client/products';

/**
 * Fetch product size guides for a given product id. This sizeguides logic should
 * be used where the project has a category tree. If your project does not have a
 * category tree you should use the size guides logic from
 * \@farfetch/blackout-redux/sizeGuides.
 */
export default fetchProductSizeGuidesFactory(getProductSizeGuides);

import {
  createGetItemInBag,
  getItemWholeQuantity,
} from '../../../../bags/redux';
import { getError, getIsHydrated, getIsLoading } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the error given by product actions.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} Product details error.
 */
export const getProductError = (state, id) => getError(state.details)[id];

/**
 * Returns the hydrated condition from product details.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product is hydrated or not.
 */
export const isProductHydrated = (state, id) =>
  getIsHydrated(state.details)[id];

/**
 * Returns the loading condition from product details.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product is loading or not.
 */
export const isProductLoading = (state, id) => getIsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product has been fetched or not.
 */
export const isProductFetched = (state, id) =>
  (getIsLoading(state.details).hasOwnProperty(id) ||
    getIsHydrated(state.details).hasOwnProperty(id)) &&
  isProductLoading(state, id) === false;

/**
 * Returns if the product is duplicated or not.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean|undefined} If a certain product is duplicated or not.
 */
export const isProductDuplicated = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'isDuplicated');
};

/**
 * Returns all the info about breadcrumbs at PDP.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object|undefined} Breadcrumbs info.
 */
export const getProductBreadcrumbs = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'breadCrumbs');
};

/**
 * Creates a function responsible for checking the remaining available quantity
 * of a product of a given size, based on its quantity in the bag.
 * This creator should only be used in cases/projects you have the need
 * to have product details and bag logics/reducer at the same time.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {Function} Function that returns a Number,
 * which is the difference between the total quantity of product size and the
 * respective bag quantity.
 *
 * @example
 * import { createGetProductRemainingQuantity } from '@farfetch/blackout-core/products/details/redux';
 *
 * const mapStateToProps = (state, { productId }) => ({
 *     getRemainingQuantity: createGetProductRemainingQuantity(state, productId)
 * });
 *
 * render(
 *  const {getRemainingQuantity, sizes } = this.props;
 *  const options = sizes.map(size => {
 *      const remainingQuantity = getRemainingQuantity(size.id);
 *      ...
 *  });
 * )
 */
export const createGetProductRemainingQuantity =
  (state, productId) => sizeId => {
    const getItemInBag = createGetItemInBag(state);
    const product = getProduct(state, productId);
    const size = product.sizes.find(({ id }) => id === sizeId);
    const stockAvailable = get(size, 'globalQuantity', 0);
    const bagItem = getItemInBag({ product, size });

    if (bagItem) {
      const itemWholeQuantity = getItemWholeQuantity(state, bagItem);

      return stockAvailable - itemWholeQuantity;
    }

    return stockAvailable;
  };

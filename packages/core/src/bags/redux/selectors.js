/**
 * @module bags/selectors
 * @category Bags
 * @subcategory Selectors
 */
import { areBagItemsIdentical, buildBagItem, createBagItemHash } from './utils';
import { createSelector } from 'reselect';
import { getEntity, getProduct } from '../../entities/redux/selectors';
import {
  getError,
  getId,
  getIsBagItemLoading,
  getIsBagOperationLoading,
  getIsLoading,
  getItemError,
  getBagOperationError as getOperationError,
} from './reducer';

/**
 * Retrieves the universal identifier of the current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {string} - Universal identifier of the bag.
 *
 * @example
 * import { getBagId } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     bagId: getBagId(state)
 * });
 */
export const getBagId = state => getId(state.bag);

/**
 * Retrieves current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Bag entity.
 *
 * @example
 * import { getBag } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     bag: getBag(state)
 * });
 */
export const getBag = state => {
  const bagId = getBagId(state);

  return getEntity(state, 'bag', bagId);
};

/**
 * Retrieves the error state of the current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Error information, `undefined` if there are no errors.
 *
 * @example
 * import { getBagError } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getBagError(state)
 * });
 */
export const getBagError = state => getError(state.bag) || undefined;

/**
 * Retrieves a specific bag item by its id, with all properties populated (ie, the product).
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} bagItemId - Numeric identifier of the bag item in the bag.
 *
 * @returns {object} - Bag item entity for the given id.
 *
 * @example
 * import { getBagItem } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     bagItem: getBagItem(state, id)
 * });
 */

export const getBagItem = createSelector(
  [
    (state, bagItemId) => getEntity(state, 'bagItems', bagItemId),
    (state, bagItemId) => {
      const bagItem = getEntity(state, 'bagItems', bagItemId);

      return getProduct(state, bagItem?.product);
    },
  ],
  (bagItem, product) => ({ ...bagItem, product }),
);

/**
 * Retrieves the error state of a specific bag item product by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} bagItemId - Numeric identifier of the bag item in the bag.
 *
 * @returns {object | undefined} - Error information, `undefined` if there are no errors.
 *
 * @example
 * import { getBagItemError } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagItem: { bagItem: { id } } }) => ({
 *     error: getBagItemError(state, id)
 * });
 */
export const getBagItemError = (state, bagItemId) =>
  getItemError(state.bag)[bagItemId];

/**
 * Retrieves all bag items from the current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} - List of each bag item entity (with the respective products) from the current user's bag.
 *
 * @example
 * import { getBagItems } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     bagItems: getBagItems(state),
 * });
 */
export const getBagItems = createSelector(
  [
    getBag,
    state => getEntity(state, 'bagItems'),
    state => getEntity(state, 'products'),
  ],
  (bag, bagItems, products) =>
    bag?.items?.map(bagItemId => {
      const bagItem = bagItems[bagItemId];

      return {
        ...bagItem,
        product: products[bagItem.product],
      };
    }),
);

/**
 * Retrieves the number of different items in the bag, regardless of each one's
 * quantity.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {Array} excludeProductTypes - List of product types to exclude from
 * the counter.
 *
 * Product types supported:<br/>.
 *
 * | Type | Description |
 * |------|-------------|
 * | **0**    | Standard        |
 * | **1**    | BundleProduct   |
 * | **2**    | BundleVariant   |
 * | **3**    | ProductGroup    |
 * | **4**    | Sample          |
 * <br/>.
 *
 * @returns {number} - Count of the items in the bag.
 *
 *
 * @example
 * import { getBagItemsCounter } from '@farfetch/blackout-core/bags/redux';
 *
 * const excludeProductTypes = [3];
 * const mapStateToProps = state => ({
 *     bagItemsCounter: getBagItemsCounter(state, excludeProductTypes),
 * });
 */
export const getBagItemsCounter = (state, excludeProductTypes = []) => {
  const bagItems = getBagItems(state);

  if (!bagItems || bagItems.length === 0) {
    return 0;
  }

  if (excludeProductTypes.length === 0) {
    return bagItems.length;
  }

  return bagItems.filter(
    ({ product: { type = 0 } }) => !excludeProductTypes.includes(type),
  ).length;
};

/**
 * Retrieves all bag items ids from the current user's bag.
 *
 * This is typically used as a helper for other selectors.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} - List of bag items ids.
 *
 * @example
 * const bagItemsIds = getBagItemsIds(state);
 *
 * bagItemsIds.map(otherSelector(state));
 */
export const getBagItemsIds = state => getBag(state)?.items;

/**
 * Retrieves the unavailable bag items, if any, from the current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} - List of each bag unavailable item entity (with the respective products) from the current user's bag.
 *
 * @example
 * import { getBagItemsUnavailable } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     unavailableItems: getBagItemsUnavailable(state)
 * });
 */
export const getBagItemsUnavailable = createSelector([getBagItems], bagItems =>
  bagItems?.filter(({ isAvailable }) => !isAvailable),
);

/**
 * Retrieves the total quantity of products in the current user's bag,
 * accounting with each item's quantity.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {Array} excludeProductTypes - List of product types to exclude from
 * the counter.
 *
 * Product types supported:<br/>.
 *
 * | Type | Description |
 * |------|-------------|
 * | **0**    | Standard        |
 * | **1**    | BundleProduct   |
 * | **2**    | BundleVariant   |
 * | **3**    | ProductGroup    |
 * | **4**    | Sample          |
 * <br/>.
 *
 * @returns {number} - Total quantity of products in the bag.
 *
 * @example
 * import { getBagTotalQuantity } from '@farfetch/blackout-core/bags/redux';
 *
 * const excludeProductTypes = [3];
 * const mapStateToProps = state => ({
 *     bagItemsCount: getBagTotalQuantity(state, excludeProductTypes),
 * });
 */
export const getBagTotalQuantity = (state, excludeProductTypes = []) => {
  const bagItems = getBagItems(state);

  if (!bagItems || bagItems.length === 0) {
    return 0;
  }

  return bagItems.reduce(
    (acc, { quantity, product: { type = 0 } }) =>
      excludeProductTypes.includes(type) ? acc : acc + quantity,
    0,
  );
};

/**
 * Retrieves the loading status of a specific bag item by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} itemId - Numeric identifier of the bag item in the bag.
 *
 * @returns {boolean} - Whether the given bag item is loading.
 *
 * @example
 * import { isBagItemLoading } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     isLoading: isBagItemLoading(state, id)
 * });
 */
export const isBagItemLoading = (state, itemId) =>
  getIsBagItemLoading(state.bag)[itemId];

/**
 * Retrieves the loading status of the bag.
 *
 * This status is affected by the loading of the bag itself, as well as any "add" operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Loading status of the bag.
 *
 * @example
 * import { isBagLoading } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isBagLoading(state)
 * });
 */
export const isBagLoading = state => getIsLoading(state.bag);

/**
 * Retrieves the available sizes of a bag item.
 *
 * If there are two or more bag items of the same product, the size
 * selected by one will be unavailable for the other.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} itemId - Item id.
 *
 * @returns {Array} - Available sizes for the given item.
 *
 * @example
 * import { getBagItemAvailableSizes } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     availableSizes: getBagItemAvailableSizes(state, id)
 * });
 */
export const getBagItemAvailableSizes = createSelector(
  [getBagItems, (state, itemId) => getBagItem(state, itemId)],
  (bagItems, item) => {
    const sizes = item.product.sizes || [];

    return bagItems.reduce((sizes, bagItem) => {
      if (areBagItemsIdentical(bagItem, item)) {
        return sizes.filter(size => bagItem.size.id !== size.id);
      }

      return sizes;
    }, sizes);
  },
);

/**
 * @typedef {Function} GetItemInBag
 *
 * @alias GetItemInBag
 *
 * @param   {object} productParams - Product params needed to this selector.
 * @param   {object} productParams.product - Product object with its id.
 * @param   {object} productParams.size - Size selected, with stock and scale.
 * @param   {object} [productParams.customAttributes] - Custom attributes of the product.
 *
 * @returns {object | undefined} - Bag item if it exists, undefined otherwise.
 */

/**
 * Creates a function responsible for checking if a certain product exists in the bag.
 * This selector uses the `buildBagItem` util, so there are some `productParams`
 * that are optional like `quantity` and `customAttributes`, because in the `buildBagItem`
 * util there are default values.
 *
 * @function
 *
 * @param   {object} state - Application state.
 *
 * @returns {GetItemInBag} - Function that returns an item object in the bag if search had results, undefined otherwise.
 *
 * @example
 * import { createGetItemInBag } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state) => ({
 *     getItemInBag: createGetItemInBag(state)
 * });
 *
 * render(
 *  const {getItemInBag, product} = this.props;
 *  const itemInBag = getItemInBag(product);
 *  ...
 * )
 */
export const createGetItemInBag = state => productParams => {
  const bagItems = getBagItems(state);
  const bagItemData = buildBagItem(productParams);
  const hash = createBagItemHash(bagItemData);

  return bagItems && bagItems.find(item => createBagItemHash(item) === hash);
};

/**
 * Checks if there is a general error in the bag or in one of the bag items.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Whether there is an error within the bag or not.
 *
 * @example
 * import { isBagWithAnyError } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state) => ({
 *     hasBagError: isBagWithAnyError(state),
 * });
 */
export const isBagWithAnyError = state => {
  const items = getBagItems(state) || [];

  return (
    !!getBagError(state) || items.some(({ id }) => !!getBagItemError(state, id))
  );
};

/**
 * Gets item whole quantity. This is needed when there are more than one bag items
 * who share the same product id and size but not the same merchant.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} bagItem - Item in bag.
 * @param {object} bagItem.product.id - Numeric identifier of the bag item product.
 * @param {object} bagItem.size.id - Numeric identifier of bag item size.
 *
 * @returns {Array} Number of products with the same bag item product and size as the one provided.
 *
 * @example
 * import { getItemWholeQuantity } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagItem }) => ({
 *     itemWholeQuantity: getItemWholeQuantity(state, bagItem),
 * });
 */
export const getItemWholeQuantity = (state, bagItem) => {
  const productId = bagItem.product.id;
  const bagItems = getBagItems(state);

  const quantity = bagItems?.reduce((acc, item) => {
    if (item.product.id === productId && item.size.id === bagItem.size.id) {
      return acc + item.quantity;
    }

    return acc;
  }, 0);

  return quantity || 0;
};

/**
 * Retrieves a specific bag operation by its id,.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} bagOperationId - Unique identifier of the operation.
 *
 * @returns {object} - Bag operation entity for the given id.
 *
 * @example
 * import { getBagOperation } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagOperation: { id } }) => ({
 *     bagOperation: getBagOperation(state, id)
 * });
 */
export const getBagOperation = (state, bagOperationId) =>
  getEntity(state, 'bagOperations', bagOperationId);

/**
 * Retrieves the error state of a specific bag operation by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} bagOperationId - Unique identifier of the bag operation.
 *
 * @returns {object | undefined} - Error information, `undefined` if there are no errors.
 *
 * @example
 * import { getBagOperationError } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagOperation: { bagOperation: { id } } }) => ({
 *     error: getBagOperationError(state, id)
 * });
 */
export const getBagOperationError = (state, bagOperationId) =>
  getOperationError(state.bag)[bagOperationId];

/**
 * Retrieves latest bag operations from the current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} - List of each bag operation entity from the current user's bag.
 *
 * @example
 * import { getBagOperations } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = state => ({
 *     bagOperations: getBagOperations(state),
 * });
 */
export const getBagOperations = state =>
  Object.values(getEntity(state, 'bagOperations') || {});

/**
 * Retrieves the loading status of a specific bag operation by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} bagOperationId - Unique identifier of the bag operation in the bag.
 *
 * @returns {boolean} - Whether the given bag operation is loading.
 *
 * @example
 * import { isBagItemLoading } from '@farfetch/blackout-core/bags/redux';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     isLoading: isBagItemLoading(state, id)
 * });
 */
export const isBagOperationLoading = (state, bagOperationId) =>
  getIsBagOperationLoading(state.bag)[bagOperationId];

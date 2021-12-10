/**
 * @module bags/selectors
 * @category Bags
 * @subcategory Selectors
 */
import { buildBagItem, generateBagItemHash } from './utils';
import { createSelector } from 'reselect';
import {
  getAreItemsLoading,
  getError,
  getId,
  getIsLoading,
  getItemsError,
  getItemsIds,
  getResult,
} from './reducer';
import { getEntities, getEntityById, getProduct } from '../entities/selectors';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import type { BagItem } from '@farfetch/blackout-client/bags/types';
import type {
  BagItemEntity,
  BagItemHydrated,
  ProductEntity,
} from '../entities/types';
import type { BagItemsState, State } from './types';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '@farfetch/blackout-client/helpers/adapters/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../types';

/**
 * Retrieves current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Bag result.
 *
 * @example
 * import { getBag } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     bag: getBag(state)
 * });
 */
export const getBag = (state: StoreState): State['result'] =>
  getResult(state.bag);

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
 * import { getBagError } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     error: getBagError(state)
 * });
 */
export const getBagError = (state: StoreState): State['error'] | undefined =>
  getError(state.bag) || undefined;

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
 * import { getBagId } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     bagId: getBagId(state)
 * });
 */
export const getBagId = (state: StoreState): State['id'] => getId(state.bag);

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
 * import { getBagItem } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     bagItem: getBagItem(state, id)
 * });
 */

export const getBagItem = createSelector(
  [
    (state: StoreState, bagItemId: BagItem['id']): BagItemEntity =>
      getEntityById(state, 'bagItems', bagItemId),
    (
      state: StoreState,
      bagItemId: BagItem['id'],
    ): ProductEntity | undefined => {
      const bagItem = getEntityById(state, 'bagItems', bagItemId);

      return getProduct(state, bagItem?.product);
    },
  ],
  (bagItem, product): BagItemHydrated => ({ ...bagItem, product }),
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
 * import { getBagItemError } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { bagItem: { id } } }) => ({
 *     error: getBagItemError(state, id)
 * });
 */
export const getBagItemError = (
  state: StoreState,
  bagItemId: BagItem['id'],
): Error | null | undefined => getItemsError(state.bag)[bagItemId];

/**
 * Retrieves all bag items ids from the current user's bag.
 *
 * This is typically used as a helper for other selectors.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - List of bag items ids.
 *
 * @example
 * import { getBagItemsIds } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state) => ({
 *     error: getBagItemsIds(state)
 * });
 */
export const getBagItemsIds = (state: StoreState): BagItemsState['ids'] =>
  getItemsIds(state.bag);

/**
 * Retrieves all bag items from the current user's bag.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - List of each bag item entity (with the respective products) from the current user's bag.
 *
 * @example
 * import { getBagItems } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     bagItems: getBagItems(state),
 * });
 */
export const getBagItems = createSelector(
  [
    getBagItemsIds,
    (state: StoreState) => getEntities(state, 'bagItems'),
    (state: StoreState) => getEntities(state, 'products'),
  ],
  (bagItemsIds, bagItems, products): BagItemHydrated[] =>
    bagItemsIds?.reduce<BagItemHydrated[]>((acc, bagItemId) => {
      const bagItem = bagItems?.[bagItemId];
      const productId = bagItem?.product;

      if (productId && bagItem) {
        return [
          ...acc,
          {
            ...bagItem,
            product: products?.[productId],
          },
        ];
      }

      return acc;
    }, []) || [],
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
 * import { getBagItemsCounter } from '@farfetch/blackout-redux/bags';
 *
 * const excludeProductTypes = [3];
 * const mapStateToProps = state => ({
 *     bagItemsCounter: getBagItemsCounter(state, excludeProductTypes),
 * });
 */
export const getBagItemsCounter = (
  state: StoreState,
  excludeProductTypes: number[] = [],
): number => {
  const bagItems = getBagItems(state);

  if (!bagItems || bagItems.length === 0) {
    return 0;
  }

  if (excludeProductTypes.length === 0) {
    return bagItems.length;
  }

  return bagItems.filter(
    ({ product }) => !excludeProductTypes.includes(product?.type || 0),
  ).length;
};

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
 * import { getBagItemsUnavailable } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     unavailableItems: getBagItemsUnavailable(state)
 * });
 */
export const getBagItemsUnavailable = createSelector([getBagItems], bagItems =>
  bagItems.filter(bagItem => !bagItem?.isAvailable),
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
 * import { getBagTotalQuantity } from '@farfetch/blackout-redux/bags';
 *
 * const excludeProductTypes = [3];
 * const mapStateToProps = state => ({
 *     bagItemsCount: getBagTotalQuantity(state, excludeProductTypes),
 * });
 */
export const getBagTotalQuantity = (
  state: StoreState,
  excludeProductTypes: number[] = [],
): number => {
  const bagItems = getBagItems(state);

  if (bagItems.length === 0) {
    return 0;
  }

  return bagItems.reduce(
    (acc, { quantity, product }) =>
      excludeProductTypes.includes(product?.type || 0) ? acc : acc + quantity,
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
 * import { isBagItemLoading } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     isLoading: isBagItemLoading(state, id)
 * });
 */
export const isBagItemLoading = (
  state: StoreState,
  itemId: BagItem['id'],
): boolean | undefined => getAreItemsLoading(state.bag)[itemId];

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
 * import { isBagLoading } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isBagLoading(state)
 * });
 */
export const isBagLoading = (state: StoreState): boolean =>
  getIsLoading(state.bag);

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
 * import { getBagItemAvailableSizes } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     availableSizes: getBagItemAvailableSizes(state, id)
 * });
 */
export const getBagItemAvailableSizes = createSelector(
  [
    getBagItems,
    (state: StoreState, itemId: BagItem['id']) => getBagItem(state, itemId),
  ],
  (bagItems, item) => {
    const sizes = item?.product?.sizes || [];

    return bagItems?.reduce((sizes, bagItem) => {
      if (
        // The two following validations are only to make sure the items
        // are not undefined.
        bagItem?.product &&
        item?.product &&
        bagItem.id !== item.id &&
        bagItem.product.id === item.product.id &&
        isEqual(
          // @ts-expect-error `customAttributes` can be a string, but lodash handles it well
          omit(bagItem.customAttributes, 'size'),
          // @ts-expect-error `customAttributes` can be a string, but lodash handles it well
          omit(item.customAttributes, 'size'),
        )
      ) {
        return sizes.filter(size => bagItem.size.id !== size.id);
      }

      return sizes;
    }, sizes);
  },
);

/**
 * Creates a function responsible for checking if a certain product exists in the bag.
 * This selector uses the `buildBagItem` util, so there are some `productParams`
 * that are optional like `quantity` and `customAttributes`, because in the `buildBagItem`
 * util there are default values.
 *
 * @function
 *
 * @param   {object} state - Application state.
 * @param   {object} productParams - Product params needed to this selector.
 * @param   {object} productParams.product - Product object with its id.
 * @param   {object} productParams.size - Size selected, with id and scale.
 * @param   {number} productParams.size.id - Id of selected size.
 * @param   {number} productParams.size.scale - Scale of selected size.
 * @param   {string} [productParams.customAttributes] - Custom attributes of the product.
 *
 * @returns {Object | undefined} - Bag item matching provided product params.
 *
 * @example
 * import { findProductInBag } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, {size, product}) => ({
 *     bagItem: findProductInBag(state, {size, product})
 * });
 *
 */
export const findProductInBag = createSelector(
  [
    getBagItems,
    (
      state: StoreState,
      productParams: {
        customAttributes?: CustomAttributesAdapted;
        product: ProductEntity;
        size: SizeAdapted;
      },
    ) => productParams,
  ],
  (bagItems, productParams) => {
    const bagItemData = buildBagItem(productParams);
    const hash = generateBagItemHash(bagItemData);

    return bagItems?.find(item => generateBagItemHash(item) === hash);
  },
);

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
 * import { isBagWithAnyError } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state) => ({
 *     hasBagError: isBagWithAnyError(state),
 * });
 */
export const isBagWithAnyError = (state: StoreState): boolean => {
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
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the bag item product.
 * @param {number} sizeId - Numeric identifier of bag item size.
 *
 * @returns {number} Number of products with the same bag item product and size as the one provided.
 *
 *  @example
 * import { getProductQuantityInBag } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { productId, sizeId }) => ({
 * itemWholeQuantity: getProductQuantityInBag(state, productId, sizeId),
 * });
 *
 */
export const getProductQuantityInBag = (
  state: StoreState,
  productId: ProductEntity['id'],
  sizeId: SizeAdapted['id'],
): number => {
  const bagItems = getBagItems(state);

  const quantity = bagItems?.reduce((acc, item) => {
    if (item.product?.id === productId && item.size.id === sizeId) {
      return acc + item.quantity;
    }

    return acc;
  }, 0);

  return quantity || 0;
};

/**
 * Searches the bag items for a specific product. This doesn't care about the
 * size of the product, it just finds the bag item that matches the given
 * product id.
 * This is useful, for example, for the listing page, where you don't care which
 * size of the product is in the bag, you just need to know if that product
 * is already there.
 *
 * @function
 * @memberof module:bags/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {boolean} Item at the bag if search had results, undefined
 * otherwise.
 */
export const isProductInBag = (
  state: StoreState,
  productId: ProductEntity['id'],
): boolean => {
  const bagItems = getBagItems(state) || [];

  return bagItems.some(bagItem => bagItem.product?.id === Number(productId));
};

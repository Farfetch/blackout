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
import type {
  BagItem,
  BlackoutError,
  ProductType,
} from '@farfetch/blackout-client';
import type {
  BagItemEntity,
  BagItemHydrated,
  ProductEntity,
} from '../entities/types';
import type { BagItemsState, BagsState } from './types';
import type { CustomAttributesAdapted, SizeAdapted } from '../helpers/adapters';
import type { StoreState } from '../types';

/**
 * Retrieves current user's bag.
 *
 * @example
 * ```
 * import { getBag } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     bag: getBag(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Bag result.
 */
export const getBag = (state: StoreState): BagsState['result'] =>
  getResult(state.bag as BagsState);

/**
 * Retrieves the error state of the current user's bag.
 *
 * @example
 * ```
 * import { getBagError } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     error: getBagError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getBagError = (
  state: StoreState,
): BagsState['error'] | undefined =>
  getError(state.bag as BagsState) || undefined;

/**
 * Retrieves the universal identifier of the current user's bag.
 *
 * @example
 * ```
 * import { getBagId } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     bagId: getBagId(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Universal identifier of the bag.
 */
export const getBagId = (state: StoreState): BagsState['id'] =>
  getId(state.bag as BagsState);

/**
 * Retrieves a specific bag item by its id, with all properties populated (ie, the
 * product).
 *
 * @example
 * ```
 * import { getBagItem } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     bagItem: getBagItem(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param bagItemId - Numeric identifier of the bag item in the bag.
 *
 * @returns - Bag item entity for the given id.
 */
// @TODO Remove cast from functions
// Note: Apparently the type definition of the createSelector function
//       is not defined correctly in reselect package as it is not inferring
//       the additional parameter 'bagItemId' provided in each selector, so
//       we need to type the returned selector ourselves instead of relying on
//       the inferred type.
export const getBagItem: (
  state: StoreState,
  bagItemId: BagItem['id'],
) => BagItemHydrated = createSelector(
  [
    (state: StoreState, bagItemId: BagItem['id']) =>
      getEntityById(state, 'bagItems', bagItemId) as BagItemEntity,
    (
      state: StoreState,
      bagItemId: BagItem['id'],
    ): ProductEntity | undefined => {
      const bagItem = getEntityById(
        state,
        'bagItems',
        bagItemId,
      ) as BagItemEntity;

      return getProduct(state, bagItem?.product);
    },
  ],
  (bagItem, product): BagItemHydrated => ({ ...bagItem, product }),
);

/**
 * Retrieves the error state of a specific bag item product by its id.
 *
 * @example
 * ```
 * import { getBagItemError } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { bagItem: { id } } }) => ({
 *     error: getBagItemError(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param bagItemId - Numeric identifier of the bag item in the bag.
 *
 * @returns - Error information, `undefined` if there are no errors.
 */
export const getBagItemError = (
  state: StoreState,
  bagItemId: BagItem['id'],
): BlackoutError | null | undefined =>
  getItemsError(state.bag as BagsState)[bagItemId];

/**
 * Retrieves all bag items ids from the current user's bag.
 *
 * This is typically used as a helper for other selectors.
 *
 * @example
 * ```
 * import { getBagItemsIds } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state) => ({
 *     error: getBagItemsIds(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - List of bag items ids.
 */
export const getBagItemsIds = (state: StoreState): BagItemsState['ids'] =>
  getItemsIds(state.bag as BagsState);

/**
 * Retrieves all bag items from the current user's bag.
 *
 * @example
 * ```
 * import { getBagItems } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     bagItems: getBagItems(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - List of each bag item entity (with the respective products) from the current user's bag.
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
 * @example
 * ```
 * import { getBagItemsCounter } from '@farfetch/blackout-redux/bags';
 *
 * const excludeProductTypes = [3];
 * const mapStateToProps = state => ({
 *     bagItemsCounter: getBagItemsCounter(state, excludeProductTypes),
 * });
 * ```
 *
 * @param state               - Application state.
 * @param excludeProductTypes - List of product types to exclude from the counter.
 *
 *                              Product types supported:<br/>.
 *
 *                              | Type  | Description   |
 *                              | ----- | ------------- |
 *                              | **0** | Standard      |
 *                              | **1** | BundleProduct |
 *                              | **2** | BundleVariant |
 *                              | **3** | ProductGroup  |
 *                              | **4** | Sample        |
 *
 *                              <br/>.
 *
 * @returns - Count of the items in the bag.
 */
export const getBagItemsCounter = (
  state: StoreState,
  excludeProductTypes: ProductType[] = [],
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
 * @example
 * ```
 * import { getBagItemsUnavailable } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     unavailableItems: getBagItemsUnavailable(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - List of each bag unavailable item entity (with the respective products) from the current
 * user's bag.
 */
export const getBagItemsUnavailable = createSelector([getBagItems], bagItems =>
  bagItems.filter(bagItem => !bagItem?.isAvailable),
);

/**
 * Retrieves the total quantity of products in the current user's bag, accounting
 * with each item's quantity.
 *
 * @example
 * ```
 * import { getBagTotalQuantity } from '@farfetch/blackout-redux/bags';
 *
 * const excludeProductTypes = [3];
 * const mapStateToProps = state => ({
 *     bagItemsCount: getBagTotalQuantity(state, excludeProductTypes),
 * });
 * ```
 *
 * @param state               - Application state.
 * @param excludeProductTypes - List of product types to exclude from the counter.
 *
 *                              Product types supported:<br/>.
 *
 *                              | Type  | Description   |
 *                              | ----- | ------------- |
 *                              | **0** | Standard      |
 *                              | **1** | BundleProduct |
 *                              | **2** | BundleVariant |
 *                              | **3** | ProductGroup  |
 *                              | **4** | Sample        |
 *
 *                              <br/>.
 *
 * @returns - Total quantity of products in the bag.
 */
export const getBagTotalQuantity = (
  state: StoreState,
  excludeProductTypes: ProductType[] = [],
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
 * @example
 * ```
 * import { isBagItemLoading } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     isLoading: isBagItemLoading(state, id)
 * });
 * ```
 *
 * @param state  - Application state.
 * @param itemId - Numeric identifier of the bag item in the bag.
 *
 * @returns - Whether the given bag item is loading.
 */
export const isBagItemLoading = (
  state: StoreState,
  itemId: BagItem['id'],
): boolean | undefined => getAreItemsLoading(state.bag as BagsState)[itemId];

/**
 * Retrieves the loading status of the bag.
 *
 * This status is affected by the loading of the bag itself, as well as any "add"
 * operation.
 *
 * @example
 * ```
 * import { isBagLoading } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isBagLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Loading status of the bag.
 */
export const isBagLoading = (state: StoreState): boolean =>
  getIsLoading(state.bag as BagsState);

/**
 * Retrieves the available sizes of a bag item.
 *
 * If there are two or more bag items of the same product, the size selected by one
 * will be unavailable for the other.
 *
 * @example
 * ```
 * import { getBagItemAvailableSizes } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     availableSizes: getBagItemAvailableSizes(state, id)
 * });
 * ```
 *
 * @param state  - Application state.
 * @param itemId - Item id.
 *
 * @returns - Available sizes for the given item.
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
          omit(bagItem.customAttributes as object, 'size'),
          omit(item.customAttributes as object, 'size'),
        )
      ) {
        return sizes.filter(size => bagItem.size.id !== size.id);
      }

      return sizes;
    }, sizes);
  },
);

/**
 * Creates a function responsible for checking if a certain product exists in the
 * bag. This selector uses the `buildBagItem` util, so there are some
 * `productParams` that are optional like `quantity` and `customAttributes`,
 * because in the `buildBagItem` util there are default values.
 *
 * @example
 * ```
 * import { findProductInBag } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, {size, product}) => ({
 *     bagItem: findProductInBag(state, {size, product})
 * });
 *
 * ```
 *
 * @param state         - Application state.
 * @param productParams - Product params needed to this selector.
 *
 * @returns - Bag item matching provided product params.
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
 * @example
 * ```
 * import { isBagWithAnyError } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state) => ({
 *     hasBagError: isBagWithAnyError(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Whether there is an error within the bag or not.
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
 * @example
 * ```
 * import { getProductQuantityInBag } from '@farfetch/blackout-redux/bags';
 *
 * const mapStateToProps = (state, { productId, sizeId }) => ({
 * itemWholeQuantity: getProductQuantityInBag(state, productId, sizeId),
 * });
 *
 * ```
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the bag item product.
 * @param sizeId    - Numeric identifier of bag item size.
 *
 * @returns Number of products with the same bag item product and size as the one provided.
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
 * Searches the bag items for a specific product. This doesn't care about the size
 * of the product, it just finds the bag item that matches the given product id.
 * This is useful, for example, for the listing page, where you don't care which
 * size of the product is in the bag, you just need to know if that product is
 * already there.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns Item at the bag if search had results, undefined otherwise.
 */
export const isProductInBag = (
  state: StoreState,
  productId: ProductEntity['id'],
): boolean => {
  const bagItems = getBagItems(state) || [];

  return bagItems.some(bagItem => bagItem.product?.id === Number(productId));
};

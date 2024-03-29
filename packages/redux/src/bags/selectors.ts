import { buildBagItem, generateBagItemHash } from './utils/index.js';
import { createSelector } from 'reselect';
import {
  getAreBagPromocodesLoading,
  getAreItemsLoading,
  getBagPromocodesResult,
  getError,
  getId,
  getIsBagOperationLoading,
  getIsLoading,
  getItemsError,
  getItemsIds,
  getBagOperationError as getOperationError,
  getBagPromocodesError as getPromocodesError,
  getResult,
} from './reducer.js';
import { getEntities, getEntityById } from '../entities/selectors/index.js';
import { isEqual, omit } from 'lodash-es';
import type {
  BagItem,
  BagOperation,
  Brand,
  ProductType,
} from '@farfetch/blackout-client';
import type {
  BagItemDenormalized,
  BagItemEntity,
  CategoryEntity,
  ProductEntity,
  ProductEntityDenormalized,
} from '../entities/types/index.js';
import type { BagsState } from './types/index.js';
import type {
  CustomAttributesAdapted,
  SizeAdapted,
} from '../helpers/adapters/index.js';
import type { StoreState } from '../types/index.js';

/**
 * Retrieves current user's bag.
 *
 * @example
 * ```
 * import { getBag } from '@farfetch/blackout-redux';
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
export const getBag = (state: StoreState) => getResult(state.bag as BagsState);

/**
 * Retrieves the error state of the current user's bag.
 *
 * @example
 * ```
 * import { getBagError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getBagError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information.
 */
export const getBagError = (state: StoreState) =>
  getError(state.bag as BagsState);

/**
 * Retrieves the universal identifier of the current user's bag.
 *
 * @example
 * ```
 * import { getBagId } from '@farfetch/blackout-redux';
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
export const getBagId = (state: StoreState) => getId(state.bag as BagsState);

/**
 * Denormalizes a bagItem
 *
 * @param bagItemId - The id of bagItem to denormalize
 * @param bagItems - Bag item entities as obtained with getEntities(state, 'bagItems').
 * @param products - Product entities as obtained with getEntities(state, 'products').
 *
 * @returns Bag item denormalized containing the product data if available.
 */
const denormalizeBagItem = (
  bagItemId: BagItem['id'],
  bagItems: Record<BagItemEntity['id'], BagItemEntity> | undefined,
  products: Record<ProductEntity['id'], ProductEntity> | undefined,
  brands: Record<Brand['id'], Brand> | undefined,
  categories: Record<CategoryEntity['id'], CategoryEntity> | undefined,
) => {
  const bagItemEntity = bagItems?.[bagItemId];

  if (!bagItemEntity) {
    return undefined;
  }

  const product = products?.[bagItemEntity.product];
  const productBrand = product?.brand;
  const brand = productBrand ? brands?.[productBrand] : undefined;
  const productCategories =
    categories &&
    (product?.categories
      ?.map(id => categories[id])
      .filter(Boolean) as CategoryEntity[]);

  return {
    ...bagItemEntity,
    product: product
      ? {
          ...product,
          brand,
          categories: productCategories,
        }
      : undefined,
  };
};

/**
 * Retrieves a specific bag item denormalized by its id, with all properties populated (ie, the
 * product). This selector will always return a different reference. If you need a stable
 * reference, use getEntityById selector (note though that it will not contain the product
 * properties).
 *
 * @example
 * ```
 * import { getBagItem } from '@farfetch/blackout-redux';
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
export const getBagItem: (
  state: StoreState,
  bagItemId: BagItem['id'],
) => BagItemDenormalized | undefined = createSelector(
  [
    (_, bagItemId) => bagItemId,
    (state: StoreState) => getEntities(state, 'bagItems'),
    (state: StoreState) => getEntities(state, 'products'),
    (state: StoreState) => getEntities(state, 'brands'),
    (state: StoreState) => getEntities(state, 'categories'),
  ],
  (bagItemId, bagItems, products, brands, categories) => {
    return denormalizeBagItem(
      bagItemId,
      bagItems,
      products,
      brands,
      categories,
    );
  },
);

/**
 * Retrieves the error state of a specific bag item product by its id.
 *
 * @example
 * ```
 * import { getBagItemError } from '@farfetch/blackout-redux';
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
export const getBagItemError = (state: StoreState, bagItemId: BagItem['id']) =>
  getItemsError(state.bag as BagsState)[bagItemId];

/**
 * Retrieves all bag items ids from the current user's bag.
 *
 * This is typically used as a helper for other selectors.
 *
 * @example
 * ```
 * import { getBagItemsIds } from '@farfetch/blackout-redux';
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
export const getBagItemsIds = (state: StoreState) =>
  getItemsIds(state.bag as BagsState);

/**
 * Retrieves all bag items denormalized from the current user's bag.
 *
 * @example
 * ```
 * import { getBagItems } from '@farfetch/blackout-redux';
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
export const getBagItems: (state: StoreState) => BagItemDenormalized[] =
  createSelector(
    [
      getBagItemsIds,
      (state: StoreState) => getEntities(state, 'bagItems'),
      (state: StoreState) => getEntities(state, 'products'),
      (state: StoreState) => getEntities(state, 'brands'),
      (state: StoreState) => getEntities(state, 'categories'),
    ],
    (
      bagItemsIds,
      bagItems,
      products,
      brands,
      categories,
    ): BagItemDenormalized[] => {
      const bagItemsDenormalized =
        bagItemsIds?.map(bagItemId => {
          return denormalizeBagItem(
            bagItemId,
            bagItems,
            products,
            brands,
            categories,
          );
        }) || [];

      return bagItemsDenormalized.filter(Boolean) as BagItemDenormalized[];
    },
  );

/**
 * Retrieves the number of different items in the bag, regardless of each one's
 * quantity.
 *
 * @example
 * ```
 * import { getBagItemsCounter } from '@farfetch/blackout-redux';
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
) => {
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
 * import { getBagItemsUnavailable } from '@farfetch/blackout-redux';
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
export const getBagItemsUnavailable: (
  state: StoreState,
) => BagItemDenormalized[] = createSelector([getBagItems], bagItems =>
  bagItems.filter(bagItem => !bagItem?.isAvailable),
);

/**
 * Retrieves the total quantity of products in the current user's bag, accounting
 * with each item's quantity.
 *
 * @example
 * ```
 * import { getBagTotalQuantity } from '@farfetch/blackout-redux';
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
) => {
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
 * import { isBagItemLoading } from '@farfetch/blackout-redux';
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
export const isBagItemLoading = (state: StoreState, itemId: BagItem['id']) =>
  getAreItemsLoading(state.bag as BagsState)[itemId];

/**
 * Retrieves the fetched status of a specific bag item by its id.
 *
 * @example
 * ```
 * import { isBagItemFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { bagItem: { id } }) => ({
 *     isFetched: isBagItemFetched(state, id)
 * });
 * ```
 *
 * @param state  - Application state.
 * @param itemId - Numeric identifier of the bag item in the bag.
 *
 * @returns - Whether the given bag item is fetched.
 */
export const isBagItemFetched = (state: StoreState, itemId: BagItem['id']) =>
  (!!getBagItem(state, itemId) || !!getBagItemError(state, itemId)) &&
  !isBagItemLoading(state, itemId);

/**
 * Retrieves the loading status of the bag.
 *
 * This status is affected by the loading of the bag itself, as well as any "add"
 * operation.
 *
 * @example
 * ```
 * import { isBagLoading } from '@farfetch/blackout-redux';
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
export const isBagLoading = (state: StoreState) =>
  getIsLoading(state.bag as BagsState);

/**
 * Retrieves if the bag has been fetched.
 *
 * Will return true if a fetch bag request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { isBagFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: isBagFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of the bag.
 */
export const isBagFetched = (state: StoreState) =>
  (!!getBagId(state) || !!getBagError(state)) && !isBagLoading(state);

/**
 * Retrieves the available sizes of a bag item.
 *
 * If there are two or more bag items of the same product, the size selected by one
 * will be unavailable for the other.
 *
 * @example
 * ```
 * import { getBagItemAvailableSizes } from '@farfetch/blackout-redux';
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
export const getBagItemAvailableSizes: (
  state: StoreState,
  bagItemId: BagItem['id'],
) => SizeAdapted[] = createSelector(
  [getBagItems, (state: StoreState, itemId: BagItem['id']) => itemId],
  (bagItems, itemId) => {
    const item = bagItems?.find(bagItem => bagItem.id === itemId);
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
 * import { findProductInBag } from '@farfetch/blackout-redux';
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
export const findProductInBag: (
  state: StoreState,
  productParams: {
    customAttributes?: CustomAttributesAdapted;
    product: ProductEntityDenormalized;
    size: SizeAdapted;
    merchantId: number;
  },
) => BagItemDenormalized | undefined = createSelector(
  [
    getBagItems,
    (
      state: StoreState,
      productParams: {
        customAttributes?: CustomAttributesAdapted;
        product: ProductEntityDenormalized;
        size: SizeAdapted;
        merchantId: number;
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
 * import { isBagWithAnyError } from '@farfetch/blackout-redux';
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
export const isBagWithAnyError = (state: StoreState) => {
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
 * import { getProductQuantityInBag } from '@farfetch/blackout-redux';
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
) => {
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
) => {
  const bagItems = getBagItems(state) || [];

  return bagItems.some(bagItem => bagItem.product?.id === Number(productId));
};

/**
 * Retrieves a specific bag operation by its id.
 *
 * @param state - Application state.
 * @param bagOperationId - Unique identifier of the operation.
 *
 * @returns - Bag operation entity for the given id or undefined if not existent.
 *
 * @example
 * ```
 * import { getBagOperation } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { bagOperation: { id } }) => ({
 *     bagOperation: getBagOperation(state, id)
 * });
 * ```
 */
export const getBagOperation = (
  state: StoreState,
  bagOperationId: BagOperation['id'],
) => getEntityById(state, 'bagOperations', bagOperationId);

/**
 * Retrieves the error state of a specific bag operation by its id.
 *
 * @param state - Application state.
 * @param bagOperationId - Unique identifier of the bag operation.
 *
 * @returns - Error information, `undefined` if there are no errors.
 *
 * @example
 * ```
 * import { getBagOperationError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { bagOperation: { bagOperation: { id } } }) => ({
 *     error: getBagOperationError(state, id)
 * });
 * ```
 */
export const getBagOperationError = (
  state: StoreState,
  bagOperationId: BagOperation['id'],
) => getOperationError(state.bag as BagsState)[bagOperationId];

/**
 * Retrieves latest bag operations from the current user's bag.
 *
 * @param state - Application state.
 *
 * @returns - List of each bag operation entity from the current user's bag.
 *
 * @example
 * ```
 * import { getBagOperations } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     bagOperations: getBagOperations(state),
 * });
 * ```
 */
export const getBagOperations = (state: StoreState) =>
  Object.values(getEntities(state, 'bagOperations') || {});

/**
 * Retrieves the loading status of a specific bag operation by its id.
 *
 * @param state - Application state.
 * @param bagOperationId - Unique identifier of the bag operation in the bag.
 *
 * @returns - Whether the given bag operation is loading.
 *
 * @example
 * ```
 * import { isBagOperationLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { bagOperation: { bagOperation: { id } } }) => ({
 *     isLoading: isBagOperationLoading(state, id)
 * });
 * ```
 */
export const isBagOperationLoading = (
  state: StoreState,
  bagOperationId: BagOperation['id'],
) => getIsBagOperationLoading(state.bag as BagsState)[bagOperationId];

/**
 * Retrieves the error state of the bag promocodes.
 *
 * @param state - Application state.
 *
 * @returns - Error information, `undefined` if there are no errors.
 *
 * @example
 * ```
 * import { getBagPromocodesError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state) => ({
 *     error: getBagPromocodesError(state)
 * });
 * ```
 */
export const getBagPromocodesError = (state: StoreState) =>
  getPromocodesError(state.bag as BagsState);

/**
 * Retrieves the loading status of bag promocodes.
 *
 * @param state - Application state.
 *
 * @returns - Whether the set bag promocodes is loading.
 *
 * @example
 * ```
 * import { areBagPromocodesLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state) => ({
 *     areLoading: areBagPromocodesLoading(state)
 * });
 * ```
 */
export const areBagPromocodesLoading = (state: StoreState) =>
  getAreBagPromocodesLoading(state.bag as BagsState);

/**
 * Retrieves current promocodes information in bag.
 *
 * @param state - Application state.
 *
 * @returns - Bag Promocodes Information, `undefined` if there are no bag id
 *
 * @example
 * ```
 * import { getBagPromocodesInformation } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     bagPromocodesInformation: getBagPromocodesInformation(state)
 * });
 * ```
 */
export const getBagPromocodesInformation = (state: StoreState) =>
  getBagPromocodesResult(state.bag as BagsState)?.promoCodesInformation;

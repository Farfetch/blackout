/**
 * Hook to provide all kinds of data for the business logic attached to the bag.
 */
import {
  addBagItem as addBagItemAction,
  type BagItemActionMetadata,
  type BagItemDenormalized,
  buildBagItem,
  type CustomAttributesAdapted,
  fetchBag as fetchBagAction,
  generateBagItemHash,
  getBag,
  getBagError,
  getBagItems,
  getProductDenormalized,
  getUser,
  isBagFetched,
  isBagLoading,
  type ProductEntityDenormalized,
  removeBagItem as removeBagItemAction,
  resetBag as resetBagAction,
  type SizeAdapted,
  type StoreState,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux';
import {
  AddUpdateItemBagError,
  BagItemNotFoundError,
  ProductError,
  SizeError,
} from './errors/index.js';
import { omit } from 'lodash-es';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type {
  Bag,
  BagItem,
  BagQueryBase,
  Config,
  DeleteBagItemQuery,
  Product,
} from '@farfetch/blackout-client';
import type { UseBagOptions } from './types/index.js';

type HandleAddOrUpdateItem = (
  {
    customAttributes,
    from,
    product,
    productAggregatorId,
    quantity,
    size,
  }: {
    customAttributes?: CustomAttributesAdapted | string;
    from?: string;
    product: ProductEntityDenormalized;
    productAggregatorId?: Exclude<
      BagItemDenormalized['productAggregator'],
      null
    >['id'];
    quantity: number;
    size: SizeAdapted;
  },
  metadata?: BagItemActionMetadata,
  config?: Config,
) => Promise<void>;

const DEFAULT_INTERNAL_METADATA_LIST = [
  'from',
  'affiliation',
  'coupon',
  'position',
  'value',
];

/**
 * Filters internal metadata properties that should not be sent in
 * the request.
 *
 * @param allMetadata - metadata to filter.
 * @param internalMetadataList - the list containing the fields that are considered internal metadata.
 *
 * @returns Metadata object containing only properties that are not in `internalMetadataList` parameter or undefined if there are no properties after filtering.
 */
const filterInternalMetadata = (
  allMetadata: BagItemActionMetadata | undefined,
  internalMetadataList: string[],
) => {
  if (!allMetadata) {
    return undefined;
  }

  const metadataExternalParameters = omit(allMetadata, internalMetadataList);

  if (Object.keys(metadataExternalParameters).length === 0) {
    return undefined;
  }

  return metadataExternalParameters;
};

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag business logic. It will fetch bag data from the current user's bag.
 * A note of attention regarding sending metadata: The hook distinguishes between
 * 2 types of metadata: bag item metadata and bag action metadata. Bag item metadata
 * can be sent to the add/update endpoints to set specific bag item metadata and bag
 * action metadata are used to add context to the action that was performed and can be
 * used by redux middlewares like analytics to enhance tracking of bag events and this
 * metadata cannot be sent to the endpoints. Since the hook already have a specific metadata
 * parameter in its actions, to avoid a breaking change the same parameter is used to specify
 * both kinds of metadata values but an additional option `internalMetadataList` was added
 * to filter out the metadata properties that should not be sent to the bag endpoints.
 * By default it is set to the currently used bag action metadata: 'from', 'affiliation',
 * 'coupon', 'value' and 'position'. If you need to add more internal metadata parameters
 * or have an internal metadata parameter be sent to the bag endpoints, pass an appropriate
 * `internalMetadataList` to have the correct set of metadata parameters being sent in the
 * appropriate cases.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag operation.
 */
const useBag = (options: UseBagOptions = {}) => {
  const {
    enableAutoFetch = false,
    fetchQuery,
    fetchConfig,
    internalMetadataList = DEFAULT_INTERNAL_METADATA_LIST,
  } = options;
  const { getState } = useStore<StoreState>();
  // Selectors
  const bag = useSelector(getBag);
  const error = useSelector(getBagError);
  const isLoading = useSelector(isBagLoading);
  const items = useSelector(getBagItems);
  const count = bag?.count;
  const isEmpty = count === 0;
  const isFetched = useSelector(isBagFetched);
  const userBagId = useSelector(getUser)?.bagId;
  // Actions
  const addBagItem = useAction(addBagItemAction);
  const updateBagItem = useAction(updateBagItemAction);
  const removeBagItem = useAction(removeBagItemAction);
  const fetchBag = useAction(fetchBagAction);
  const reset = useAction(resetBagAction);
  const fetch = useCallback(
    (query?: BagQueryBase, config?: Config) => {
      if (!userBagId) {
        return Promise.reject(
          new Error(
            "User's bag id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return fetchBag(userBagId, query, config);
    },
    [fetchBag, userBagId],
  );

  useEffect(() => {
    const updatedState = getState();
    const updatedIsLoading = isBagLoading(updatedState);
    const updatedIsFetched = isBagFetched(updatedState);

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      userBagId
    ) {
      fetch(fetchQuery, fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetch,
    fetchConfig,
    fetchQuery,
    isFetched,
    isLoading,
    userBagId,
    getState,
  ]);

  const handleAddOrUpdateItem: HandleAddOrUpdateItem = useCallback(
    async (
      { customAttributes, product, productAggregatorId, quantity, size },
      metadata,
      config,
    ) => {
      // No need to throw here since this check is being done
      // by the exposed actions which will call this method.
      if (!userBagId) {
        return;
      }

      let quantityToHandle = quantity;

      // Throw an error to indicate for the consumer that nothing
      // will be done.
      if (!size?.stock) {
        return Promise.reject(new AddUpdateItemBagError(-1));
      }

      const itemsRefreshed = getBagItems(getState());

      const metadataWithoutInternalParameters = filterInternalMetadata(
        metadata,
        internalMetadataList,
      );

      // Iterate through the stock of different merchants
      for (const { merchantId, quantity: merchantQuantity } of size.stock) {
        // If there is no quantity on this merchant jump to the next one
        if (merchantQuantity === 0) {
          continue;
        }

        // The quantity we want to add might be limited by the merchant stock
        const quantityToAdd = Math.min(quantityToHandle, merchantQuantity);
        // Format the data to send to the request
        const requestData = buildBagItem({
          customAttributes,
          merchantId,
          product,
          productAggregatorId,
          quantity: quantityToAdd,
          size,
          // The bag item for the request should contain only the metadata fields that are
          // considered external. Internal metadata that is used exclusively
          // by analytics should not be sent.
          metadata: metadataWithoutInternalParameters,
        });
        // Checks if the item we want to add is already in bag
        // by comparing the bag items' hash
        const hash = generateBagItemHash(requestData);

        const itemInBag = itemsRefreshed?.find(
          item => generateBagItemHash(item) === hash,
        );

        // When the item is in bag, we update its quantity
        if (itemInBag) {
          const newQuantity = quantityToAdd + itemInBag.quantity;

          // Check if our quantity to update fits on the current merchant's stock
          // and if not, try adding less
          for (let i = newQuantity; i > itemInBag.quantity; i--) {
            if (i <= merchantQuantity) {
              await updateBagItem(
                userBagId,
                itemInBag.id,
                {
                  ...requestData,
                  quantity: i,
                },
                undefined,
                metadata,
                config,
              );

              // Now we have less quantity to add to the next merchant
              quantityToHandle -= i - itemInBag.quantity;
              break;
            }
          }
        } else {
          const currentUserBagId = getUser(getState())?.bagId;

          // Check if we have the updated user bag Id
          const bagId =
            currentUserBagId && currentUserBagId !== userBagId
              ? currentUserBagId
              : userBagId;

          // When the item is not in the bag, we add it
          await addBagItem(bagId, requestData, undefined, metadata, config);

          // Now we have less quantity to add to the next merchant
          quantityToHandle -= quantityToAdd;
        }

        // If there's no more quantity to add, we have finished
        if (quantityToHandle === 0) {
          break;
        }
      }

      // If after looping all the merchants we were
      // unable to add any quantity of the product to the
      // bag, throw an error.
      if (quantityToHandle === quantity) {
        return Promise.reject(new AddUpdateItemBagError(3));
      }
    },
    [addBagItem, getState, internalMetadataList, updateBagItem, userBagId],
  );

  const addItem = useCallback(
    (
      productId: Product['result']['id'],
      { quantity, sizeId }: { quantity: number; sizeId: number },
      metadata?: BagItemActionMetadata,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userBagId) {
        return Promise.reject(
          new Error(
            "User's bag id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      const state = getState();
      const product = getProductDenormalized(state, productId);

      if (!product) {
        return Promise.reject(new ProductError());
      }

      const size = product?.sizes?.find(size => size.id === sizeId);

      if (!size) {
        return Promise.reject(new SizeError());
      }

      return handleAddOrUpdateItem(
        {
          customAttributes: product?.customAttributes,
          product,
          quantity,
          size,
        },
        metadata,
        config,
      );
    },
    [fetchConfig, getState, handleAddOrUpdateItem, userBagId],
  );

  const handleQuantityChange = useCallback(
    (
      bagItem: BagItemDenormalized,
      newQuantity: number,
      metadata?: BagItemActionMetadata,
      config?: Config,
    ) => {
      // No need to throw here since this check is being done
      // by the exposed actions which will call this method.
      if (!userBagId) {
        return;
      }

      const quantityDelta = newQuantity - bagItem.quantity;

      if (!bagItem.product) {
        return Promise.reject(new ProductError());
      }

      const metadataWithoutInternalParameters = filterInternalMetadata(
        metadata,
        internalMetadataList,
      );

      if (quantityDelta < 0) {
        return updateBagItem(
          userBagId,
          bagItem.id,
          {
            merchantId: bagItem.merchant,
            productId: bagItem.product.id,
            quantity: newQuantity,
            scale: bagItem.size.scale,
            size: bagItem.size.id,
            // The bag item for the request should contain only the metadata fields that are
            // considered external. Internal metadata that is used exclusively
            // by analytics should not be sent.
            metadata: metadataWithoutInternalParameters,
          },
          undefined,
          metadata,
          config,
        );
      }

      const size = bagItem.product?.sizes?.find(
        size => size.id === bagItem.size.id,
      );

      if (!size) {
        return Promise.reject(new SizeError());
      }

      return handleAddOrUpdateItem(
        {
          customAttributes: bagItem?.customAttributes,
          productAggregatorId: bagItem?.productAggregator?.id,
          product: bagItem.product,
          quantity: quantityDelta,
          size,
        },
        metadata,
        config,
      );
    },
    [handleAddOrUpdateItem, internalMetadataList, updateBagItem, userBagId],
  );

  /**
   * Handles the size update of a bag item. It automatically manages if the item
   * we're changing the size is already in the bag, and updates/removes accordingly.
   * The quantity/merchant stock is automatically managed.
   * <br /> This is useful for
   * when the size is updated isolated, for example in the bag page.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the
   * hook.</small></i>.
   *
   * @param bagItem  - Bag item to update the size.
   * @param newSize  - Size to update the bag item into.
   * @param metadata - Metadata to be added to the dispatched action. This metadata can be used by redux middlewares (e.g. analytics bag middleware)
   * @param config   - Custom configurations to send to the client instance (axios).
   */
  const handleSizeChange = useCallback(
    async (
      bagItem: BagItemDenormalized,
      newSize: SizeAdapted['id'],
      metadata?: BagItemActionMetadata,
      config?: Config,
    ) => {
      // No need to throw here since this check is being done
      // by the exposed actions which will call this method.
      if (!userBagId) {
        return;
      }

      if (!bagItem.product) {
        return Promise.reject(new ProductError());
      }

      // This extra logic is due to the fact that when changing sizes,
      // the verification to see if the bag item is already in bag
      // will always be false, thus never updating.
      const size = bagItem.product?.sizes?.find(size => size.id === newSize);

      if (!size) {
        return Promise.reject(new SizeError());
      }

      let quantityToHandle = bagItem.quantity;
      let sizeToHandle = size;

      const metadataWithoutInternalParameters = filterInternalMetadata(
        metadata,
        internalMetadataList,
      );

      const requestData = {
        merchantId: bagItem.merchant,
        productId: bagItem.product?.id,
        scale: size.scale,
        size: size.id,
        // The bag item for the request should contain only the metadata fields that are
        // considered external. Internal metadata that is used exclusively
        // by analytics should not be sent.
        metadata: metadataWithoutInternalParameters,
      };

      // Checks if there is a merchant for that new size that is the
      // same merchant of this bag item.
      const currentMerchant = size?.stock.find(
        ({ merchantId }) => merchantId === bagItem.merchant,
      );

      if (currentMerchant) {
        const bagItemQuantity = bagItem.quantity;
        const merchantQuantity = currentMerchant.quantity;

        if (bagItemQuantity <= merchantQuantity) {
          // Update with bagItemQuantity
          return await updateBagItem(
            userBagId,
            bagItem.id,
            {
              ...requestData,
              quantity: bagItemQuantity,
            },
            undefined,
            metadata,
            config,
          );
        }

        // Update with merchantQuantity, removing the need
        // of trying to add the rest of the quantity in this merchant
        await updateBagItem(
          userBagId,
          bagItem.id,
          {
            ...requestData,
            quantity: merchantQuantity,
          },
          undefined,
          metadata,
          config,
        );
        quantityToHandle -= merchantQuantity;
        // Remove the merchant of the future possibilities to add to the bag for
        // this size
        // TS: The stock here is manipulated, so it can be an empty array
        sizeToHandle = {
          ...size,
          stock:
            size?.stock.filter(
              ({ merchantId }) => merchantId !== currentMerchant.merchantId,
            ) || [],
        };
      } else {
        await removeBagItem(userBagId, bagItem.id, undefined, metadata, config);
      }

      if (quantityToHandle) {
        // Add the left quantity in the other merchants
        return handleAddOrUpdateItem(
          {
            customAttributes: bagItem?.customAttributes,
            productAggregatorId: bagItem?.productAggregator?.id,
            product: bagItem.product,
            quantity: quantityToHandle,
            size: sizeToHandle,
          },
          metadata,
          config,
        );
      }
    },
    [
      handleAddOrUpdateItem,
      internalMetadataList,
      removeBagItem,
      updateBagItem,
      userBagId,
    ],
  );

  /**
   * Handles the size and quantity update at the same time on a bag item, managing
   * automatically the merchant to use.
   * <br /> This is useful for when the size and
   * quantity are updated simultaneously, for example in the bag page with a modal to
   * choose size and quantity.
   * <br />
   * <br />
   * <i><small>This operation is over the bag
   * item that instantiated the hook.</small></i>.
   *
   * @param bagItem   - Bag item to update.
   * @param newSizeId - Size to update the bag item into.
   * @param newQty    - Quantity to update the bag item into.
   * @param metadata  - Metadata to be added to the dispatched action. This metadata can be used by redux middlewares (e.g. analytics bag middleware)
   * @param config    - Custom configurations to send to the client instance (axios).
   */
  const handleFullUpdate = useCallback(
    async (
      bagItem: BagItemDenormalized,
      newSizeId: number,
      newQty: number,
      metadata?: BagItemActionMetadata,
      config: Config | undefined = fetchConfig,
    ) => {
      // No need to throw here since this check is being done
      // by the exposed actions which will call this method.
      if (!userBagId) {
        return;
      }

      // In this case, we really want to update the bagItem,
      // so we force it on the first time.
      let didFirstUpdate = false;
      let quantityToHandle = Number(newQty);

      if (!bagItem.product) {
        return Promise.reject(new ProductError());
      }

      const size = bagItem.product?.sizes?.find(size => size.id === newSizeId);

      if (!size?.stock) {
        return Promise.reject(new SizeError());
      }

      let updatedBag: Bag | undefined;

      const metadataWithoutInternalParameters = filterInternalMetadata(
        metadata,
        internalMetadataList,
      );

      // Iterate through the stock of the different merchants
      for (const { merchantId, quantity: merchantQuantity } of size.stock) {
        // If there is no quantity on this merchant jump to the next one
        if (merchantQuantity === 0) {
          continue;
        }

        // The quantity we want to update might be limited
        // by the merchant stock
        const quantityToManage = Math.min(quantityToHandle, merchantQuantity);

        // Format the data to send to the request
        const requestData = buildBagItem({
          customAttributes: bagItem.customAttributes,
          merchantId,
          product: bagItem.product,
          quantity: quantityToManage,
          productAggregatorId: bagItem?.productAggregator?.id,
          size,
          // The bag item for the request should contain only the metadata fields that are
          // considered external. Internal metadata that is used exclusively
          // by analytics should not be sent.
          metadata: metadataWithoutInternalParameters,
        });

        if (!didFirstUpdate) {
          // Update the item
          updatedBag = await updateBagItem(
            userBagId,
            bagItem.id,
            {
              ...requestData,
            },
            undefined,
            metadata,
            config,
          );

          didFirstUpdate = true;
        } else {
          // When we did the first update, we add the remaining quantity
          // to the bag
          updatedBag = await addBagItem(
            userBagId,
            requestData,
            undefined,
            metadata,
            config,
          );
        }

        quantityToHandle -= quantityToManage;

        // If there's no more quantity, we have finished
        if (quantityToHandle === 0) {
          break;
        }
      }

      // If after looping all the merchants we were
      // unable to add any quantity of the product to the
      // bag, throw an error.
      if (quantityToHandle === newQty) {
        return Promise.reject(new AddUpdateItemBagError(3));
      }

      return updatedBag;
    },
    [addBagItem, fetchConfig, internalMetadataList, updateBagItem, userBagId],
  );

  const updateItem = useCallback(
    (
      bagItemId: BagItem['id'],
      {
        quantity,
        sizeId,
      }: {
        quantity?: number;
        sizeId?: number;
      },
      metadata?: BagItemActionMetadata,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userBagId) {
        return Promise.reject(
          new Error(
            "User's bag id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      const itemsRefreshed = getBagItems(getState());

      const bagItem = itemsRefreshed.find(item => item.id === bagItemId);

      if (!bagItem || !bagItem.product) {
        return Promise.reject(new BagItemNotFoundError());
      }

      const newQuantity = quantity || bagItem.quantity;
      const newSizeId = sizeId || bagItem.size.id;

      if (newQuantity !== bagItem.quantity && newSizeId !== bagItem.size.id) {
        return handleFullUpdate(
          bagItem,
          newSizeId,
          newQuantity,
          metadata,
          config,
        );
      }

      if (newQuantity !== bagItem.quantity) {
        return handleQuantityChange(bagItem, newQuantity, metadata, config);
      }

      if (newSizeId !== bagItem.size.id) {
        return handleSizeChange(bagItem, newSizeId, metadata, config);
      }

      return;
    },
    [
      fetchConfig,
      getState,
      handleFullUpdate,
      handleQuantityChange,
      handleSizeChange,
      userBagId,
    ],
  );

  const removeItem = useCallback(
    (
      bagItemId: BagItem['id'],
      query?: DeleteBagItemQuery,
      metadata?: BagItemActionMetadata,
      config?: Config,
    ) => {
      if (!userBagId) {
        return Promise.reject(
          new Error(
            "User's bag id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return removeBagItem(userBagId, bagItemId, query, metadata, config);
    },
    [removeBagItem, userBagId],
  );

  const data = useMemo(() => {
    if (!bag) {
      return undefined;
    }

    return {
      ...bag,
      count,
      isEmpty,
      items,
    };
  }, [bag, count, isEmpty, items]);

  return {
    isLoading,
    error,
    isFetched,
    actions: {
      fetch,
      reset,
      addItem,
      updateItem,
      removeItem,
    },
    data,
  };
};

export default useBag;

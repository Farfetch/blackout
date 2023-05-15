import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import { getBrands } from '../brands/index.js';
import { getCategories } from '../categories/index.js';
import {
  getDocuments,
  getError,
  getIsLoading,
  getOrderAvailableItemsActivities,
  getOrderDetails,
  getOrderItemAvailableActivities,
  getOrderReturnOptions as getOrderReturnOptionsFromReducer,
  getResult,
  getShipmentTrackings,
} from './reducer.js';
import { getEntities, getEntityById } from '../entities/selectors/index.js';
import { getMerchants } from '../products/index.js';
import { getUser } from '../users/selectors.js';
import generateUserOrdersRequestHash from './actions/factories/helpers/generateUserOrdersRequestHash.js';
import type {
  Brand,
  GetUserOrdersQuery,
  MerchantOrderReturnOptions,
  Order,
  OrderItem,
} from '@farfetch/blackout-client';
import type {
  CategoryEntity,
  CourierEntity,
  MerchantEntity,
  OrderEntity,
  OrderEntityDenormalized,
  OrderItemEntity,
  OrderItemEntityDenormalized,
  OrderSummariesDenormalized,
  OrderSummaryDenormalized,
  OrderSummaryEntity,
  ReturnOptionEntity,
  ReturnOptionEntityDenormalized,
} from '../entities/types/index.js';
import type { OrdersState } from './types/index.js';
import type { StoreState } from '../types/index.js';

/**
 * Returns the loading status for a specific request to fetch user
 * orders made through the `fetchUserOrders` action.
 *
 * @param state - Application state.
 * @param query - Query used in the request.
 *
 * @returns True if there an ongoing request to fetch user orders
 * with the specific query, false otherwise.
 */
export const areUserOrdersLoading = (
  state: StoreState,
  query?: GetUserOrdersQuery,
) => {
  const userId = getUser(state)?.id;

  if (!userId) {
    return false;
  }

  const hashedQuery = generateUserOrdersRequestHash(userId, query);
  const loaders = getIsLoading(state.orders as OrdersState);

  return !!loaders[hashedQuery];
};

/**
 * Returns the error for a specific request to fetch user
 * orders made through the `fetchUserOrders` action, if any.
 *
 * @param state - Application state.
 * @param query - Query used in the request.
 *
 * @returns An error if there was one when fetching user orders,
 * `undefined` otherwise.
 */
export const getUserOrdersError = (
  state: StoreState,
  query?: GetUserOrdersQuery,
) => {
  const userId = getUser(state)?.id;

  if (!userId) {
    return;
  }

  const hashedQuery = generateUserOrdersRequestHash(userId, query);
  const errors = getError(state.orders as OrdersState);

  return errors[hashedQuery];
};

/**
 * Returns all the order items in the application state.
 * Please note that this might include order items that were fetched
 * from multiple requests. If you want to get a specific order item,
 * please use the `getOrderItem` selector.
 *
 * @param state - Application state.
 *
 * @returns Object with all order items with its orderItemId as the key.
 */
export const getOrderItems: (
  state: StoreState,
) => Record<OrderItemEntityDenormalized['id'], OrderItemEntityDenormalized> =
  createSelector(
    [
      (state: StoreState) => getEntities(state, 'orderItems'),
      getMerchants,
      getCategories,
      getBrands,
    ],
    (orderItems, merchants, categories, brands) => {
      const result: Record<
        OrderItemEntityDenormalized['id'],
        OrderItemEntityDenormalized
      > = {};

      for (const orderItemId in orderItems) {
        const parsedOrderItemId = parseInt(orderItemId);
        const denormalizedOrderItem = denormalizeOrderItem(
          parsedOrderItemId,
          orderItems,
          merchants,
          categories,
          brands,
        );

        if (!!denormalizedOrderItem) {
          result[parsedOrderItemId] = denormalizedOrderItem;
        }
      }

      return result;
    },
  );

/**
 * Returns all the order entities in the application state denormalized.
 * Please note that this might include orders that were fetched
 * from multiple requests. If you want to get a specific order,
 * please use the `getOrder` selector.
 *
 * @param state - Application state.
 *
 * @returns Object with orders with its orderId as the key.
 */
export const getOrders: (
  state: StoreState,
) => Record<OrderEntityDenormalized['id'], OrderEntityDenormalized> =
  createSelector(
    [(state: StoreState) => getEntities(state, 'orders'), getOrderItems],
    (ordersEntities, orderItems) => {
      const result: Record<
        OrderEntityDenormalized['id'],
        OrderEntityDenormalized
      > = {};

      for (const orderId in ordersEntities) {
        const denormalizedOrder = denormalizeOrder(
          orderId,
          ordersEntities,
          orderItems,
        );

        if (!!denormalizedOrder) {
          result[orderId] = denormalizedOrder;
        }
      }

      return result;
    },
  );

/**
 * Returns all the user order summaries entities in the application state.
 * Please note that this might include order summaries that were fetched
 * from multiple requests. If you want to get user orders from a specific
 * request, please use the `getUserOrdersResult` selector. If you want
 * to get a specific user order, please use the `getUserOrder` selector.
 *
 * @param state - Application state.
 *
 * @returns Object with order summaries indexed by its `merchantOrderCode`
 * value.
 */
export const getUserOrders: (
  state: StoreState,
) => Record<OrderSummaryEntity['merchantOrderCode'], OrderSummaryDenormalized> =
  createSelector(
    [(state: StoreState) => getEntities(state, 'orderSummaries'), getMerchants],
    (orderSummariesEntities, merchants) => {
      const result: Record<
        OrderSummaryEntity['merchantOrderCode'],
        OrderSummaryDenormalized
      > = {};

      for (const merchantOrderCode in orderSummariesEntities) {
        const denormalizedOrderSummary = denormalizeOrderSummary(
          merchantOrderCode,
          orderSummariesEntities,
          merchants,
        );

        if (!!denormalizedOrderSummary) {
          result[merchantOrderCode] = denormalizedOrderSummary;
        }
      }

      return result;
    },
  );

/**
 * Returns a specific user order summary identified
 * by its merchant order code.
 *
 * @param state             - Application state.
 * @param merchantOrderCode - Merchant order code.
 *
 * @returns Order summary object or `undefined` if not found.
 */
export const getUserOrder: (
  state: StoreState,
  merchantOrderCode: OrderSummaryEntity['merchantOrderCode'],
) => OrderSummaryDenormalized | undefined = createSelector(
  [
    (state: StoreState) => getEntities(state, 'orderSummaries'),
    (_, merchantOrderCode) => merchantOrderCode,
    getMerchants,
  ],
  (orderSummaries, merchantOrderCode, merchants) => {
    if (!orderSummaries) {
      return;
    }

    return denormalizeOrderSummary(
      merchantOrderCode,
      orderSummaries,
      merchants,
    );
  },
);

/**
 * Returns if the user orders are fetched, i.e., there was a request
 * to fetch user orders through `fetchUserOrders` action that terminated
 * with either an error or success and there is not a pending fetch
 * user orders request for the same query.
 *
 * @param state - Application state.
 * @param query - Query used in the request.
 *
 * @returns True if there is either an error or order
 *          result and it is not loading, false otherwise.
 */
export const areUserOrdersFetched = (
  state: StoreState,
  query?: GetUserOrdersQuery,
) => {
  const userId = getUser(state)?.id;

  if (!userId) {
    return;
  }

  const hashedQuery = generateUserOrdersRequestHash(userId, query);

  // We use the getResult here instead of the getOrdersResult selector
  // because we do not need the denormalized order here that that selector
  // would return.
  const result =
    (!!getResult(state.orders as OrdersState)?.[hashedQuery] ||
      !!getUserOrdersError(state, query)) &&
    !areUserOrdersLoading(state, query);

  return result;
};

/**
 * Returns a shipment tracking label containing the order tracking
 * events.
 *
 * @param state          - Application state.
 * @param trackingNumber - Tracking number of an order.
 *
 * @returns The corresponding shipment tracking label object if found,
 * `undefined` otherwise.
 */
export const getShipmentTrackingLabel = (
  state: StoreState,
  trackingNumber: string,
) => getEntityById(state, 'labelTracking', trackingNumber);

/**
 * Returns a courier with its name and id.
 *
 * @param state     - Application state.
 * @param courierId - Courier Id.
 *
 * @returns Courier object.
 */
export const getCourier = (state: StoreState, courierId: CourierEntity['id']) =>
  getEntityById(state, 'courier', courierId);

/**
 * Returns a specific order item identified by its id.
 *
 * @param state       - Application state.
 * @param orderItemId - Order item id.
 *
 * @returns Order item object.
 */
export const getOrderItem: (
  state: StoreState,
  orderItemId: OrderItemEntity['id'],
) => OrderItemEntityDenormalized | undefined = createSelector(
  [
    (_, orderItemId) => orderItemId,
    (state: StoreState) => getEntities(state, 'orderItems'),
    getMerchants,
    getCategories,
    getBrands,
  ],
  (orderItemId, orderItems, merchants, categories, brands) => {
    if (!orderItemId || !orderItems) {
      return;
    }

    return denormalizeOrderItem(
      orderItemId,
      orderItems,
      merchants,
      categories,
      brands,
    );
  },
);

/**
 * Returns all the return options in the application state.
 * Please note that this might include return options that were fetched
 * from multiple requests. If you want to get the return options from a
 * specific order, please use the `getOrderReturnOptions` selector.
 * If you want to get a specific return option, please use the
 * `getReturnOption` selector.
 *
 * @param state - Application state.
 *
 * @returns Object with all returnOptions indexed by its `merchantOrderId`.
 */
export const getReturnOptions: (
  state: StoreState,
) =>
  | Record<
      ReturnOptionEntityDenormalized['merchantOrderId'],
      ReturnOptionEntityDenormalized
    >
  | undefined = createSelector(
  [(state: StoreState) => getEntities(state, 'returnOptions'), getMerchants],
  (returnOptions, merchants) => {
    const result: Record<
      ReturnOptionEntityDenormalized['merchantOrderId'],
      ReturnOptionEntityDenormalized
    > = {};

    if (!returnOptions) {
      return;
    }

    for (const merchantOrderId in returnOptions) {
      const parsedMerchantOrderId = parseInt(merchantOrderId);
      const denormalizedReturnOption = denormalizeReturnOption(
        parsedMerchantOrderId,
        returnOptions,
        merchants,
      );

      if (denormalizedReturnOption) {
        result[parsedMerchantOrderId] = denormalizedReturnOption;
      }
    }

    return result;
  },
);

/**
 * Returns a specific return option identified by its identifier,
 * merchantOrderId.
 *
 * @param state           - Application state.
 * @param merchantOrderId - Merchant order id that identifies a return option.
 *
 * @returns A corresponding return option object if found, `undefined` otherwise.
 */
export const getReturnOption: (
  state: StoreState,
  merchantOrderId: ReturnOptionEntity['merchantOrderId'],
) => ReturnOptionEntityDenormalized | undefined = createSelector(
  [
    (_, merchantOrderId) => merchantOrderId,
    (state: StoreState) => getEntities(state, 'returnOptions'),
    getMerchants,
  ],
  (merchantOrderId, returnOptions, merchants) =>
    denormalizeReturnOption(merchantOrderId, returnOptions, merchants),
);

/**
 * Returns a specific order identified by its id, for either an
 * authenticated or guest user.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns A corresponding order object if found, `undefined` otherwise.
 */
export const getOrder: (
  state: StoreState,
  orderId: Order['id'],
) => OrderEntityDenormalized | undefined = createSelector(
  [
    (_, orderId) => orderId,
    (state: StoreState) => getEntities(state, 'orders'),
    getOrderItems,
  ],
  (orderId, orders, orderItems) => {
    return denormalizeOrder(orderId, orders, orderItems);
  },
);

/**
 * Returns all return options from a specific order.
 *
 * @param state      - Application state.
 * @param orderId    - Order id.
 *
 * @returns A list of order return options if found, `undefined` otherwise.
 */
export const getOrderReturnOptions: (
  state: StoreState,
  orderId: Order['id'],
) =>
  | Record<
      MerchantOrderReturnOptions['merchantOrderId'],
      MerchantOrderReturnOptions
    >
  | undefined = createSelector(
  [
    (_, orderId: Order['id']) => orderId,
    (state: StoreState) =>
      getOrderReturnOptionsFromReducer(state.orders as OrdersState)?.result,
    (state: StoreState, orderId: Order['id']) => getOrder(state, orderId),
    (state: StoreState) => getEntities(state, 'returnOptions'),
    getMerchants,
  ],
  (orderId, returnOptionsResult, order, returnOptions, merchants) => {
    if (!order) {
      return undefined;
    }

    if (!returnOptions) {
      return undefined;
    }

    if (!returnOptionsResult[orderId]) {
      return undefined;
    }

    const result: Record<
      MerchantOrderReturnOptions['merchantOrderId'],
      MerchantOrderReturnOptions
    > = {};

    order.items?.forEach(({ merchantOrderId }) => {
      const denormalizedReturnOption = denormalizeReturnOption(
        merchantOrderId,
        returnOptions,
        merchants,
      );

      if (denormalizedReturnOption) {
        result[merchantOrderId] = denormalizedReturnOption;
      }
    });

    return result;
  },
);

/**
 * Returns all the order summaries from a specific order.
 * This selector should be used only after the user orders
 * (alias to order summaries) are fetched through `fetchUserOrders`
 * action and an order for the same user was fetched through
 * `fetchOrder` action.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns A corresponding list of order summaries for the order id
 * if found, `undefined` otherwise.
 */
export const getOrderSummaries: (
  state: StoreState,
  orderId: Order['id'],
) =>
  | Record<
      OrderSummaryDenormalized['merchantOrderCode'],
      OrderSummaryDenormalized
    >
  | undefined = createSelector(
  [
    (state, orderId) => getOrder(state, orderId),
    state => getEntities(state, 'orderSummaries'),
    getMerchants,
  ],
  (order, orderSummaries, merchants) => {
    const orderItems = get(order, 'items');

    if (!orderItems) {
      return undefined;
    }

    const result: Record<
      OrderSummaryDenormalized['merchantOrderCode'],
      OrderSummaryDenormalized
    > = {};

    orderItems.forEach(({ merchantOrderCode }) => {
      const alreadyContainsOrderSummary = !!result[merchantOrderCode];

      if (!alreadyContainsOrderSummary) {
        const denormalizedOrderSummary = denormalizeOrderSummary(
          merchantOrderCode,
          orderSummaries,
          merchants,
        );

        if (denormalizedOrderSummary) {
          result[merchantOrderCode] = denormalizedOrderSummary;
        }
      }
    });

    return result;
  },
);

/**
 * Returns all the order items from an order summary (received from
 * the `fetchUserOrders` action) indexed by its `merchantOrderCode`.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Object containing order items indexed by its
 * `merchantOrderCode`.
 */
export const getOrderItemsByMerchantOrderCode: (
  state: StoreState,
  orderId: Order['id'],
) =>
  | Record<
      OrderItemEntityDenormalized['merchantOrderCode'],
      OrderItemEntityDenormalized[]
    >
  | undefined = createSelector(
  [(state, orderId) => getOrder(state, orderId)],
  order => {
    const orderDetailsItems = get(order, 'items');

    if (!orderDetailsItems) {
      return;
    }

    const result: Record<
      OrderItemEntityDenormalized['merchantOrderCode'],
      Array<OrderItemEntityDenormalized>
    > = {};

    for (const orderItem of orderDetailsItems) {
      const {
        merchantOrderCode,
      }: {
        merchantOrderCode: OrderItemEntityDenormalized['merchantOrderCode'];
      } = orderItem;

      if (Array.isArray(result[merchantOrderCode])) {
        result[merchantOrderCode]?.push(orderItem);
      } else {
        result[merchantOrderCode] = [orderItem];
      }
    }

    return result;
  },
);

/**
 * Returns the quantity of a product in an order.
 *
 * @param state       - Application state.
 * @param orderId     - Order id.
 * @param productOrderId - Product order id.
 *
 * @returns Product quantity in the order, if any.
 */
export const getOrderProductQuantity: (
  state: StoreState,
  orderId: Order['id'],
  productId: OrderItem['productId'],
) => number | undefined = createSelector(
  [
    (state, orderId) => getOrder(state, orderId),
    (_, orderId, productId) => ({ orderId, productId }),
  ],
  (order, { productId }) => {
    if (!order) {
      return;
    }

    return order?.items?.reduce(
      (acc, value) => acc + (value.productId === productId ? 1 : 0),
      0,
    );
  },
);

/**
 * Returns the loading status for a fetch order request for either an
 * authenticated or guest user.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns True if there an ongoing request to fetch the order,
 * false otherwise.
 */
export const isOrderLoading = (state: StoreState, orderId: Order['id']) =>
  !!getOrderDetails(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the fetch order request for either
 * an authenticated or guest user, if any.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns An error if there was one when fetching the order,
 * `undefined` otherwise.
 */
export const getOrderError = (state: StoreState, orderId: Order['id']) =>
  getOrderDetails(state.orders as OrdersState).error[orderId];

/**
 * Returns if the order is fetched, i.e., there was a request to fetch
 * the order through `fetchOrder` action that terminated with either
 * an error or success and there is not a pending fetch order request
 * for the same order.
 * It will return true if either there is an order loaded in the state
 * or if there is an error loading the order and it is not loading.
 * Otherwise, it will return false.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns True if there is either an error or order
 *          result and it is not loading, false otherwise.
 */
export const isOrderFetched = (state: StoreState, orderId: Order['id']) => {
  const order = getOrder(state, orderId);

  return (
    (!!(order && !!order.items) || !!getOrderError(state, orderId)) &&
    !isOrderLoading(state, orderId)
  );
};

/**
 * Returns the loading status for a fetch order return options request
 * for either an authenticated or guest user.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns True if there an ongoing request to fetch the order return
 * options, false otherwise.
 */
export const areOrderReturnOptionsLoading = (
  state: StoreState,
  orderId: Order['id'],
) =>
  getOrderReturnOptionsFromReducer(state.orders as OrdersState).isLoading[
    orderId
  ];

/**
 * Returns the error for the fetch order return options request
 * for either an authenticated or guest user, if any.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns An error if there was one when fetching the order return options,
 * `undefined` otherwise.
 */
export const getOrderReturnOptionsError = (
  state: StoreState,
  orderId: string,
) =>
  getOrderReturnOptionsFromReducer(state.orders as OrdersState).error[orderId];

/**
 * Returns the fetched status for the order return options operation.
 * It will return true if either there are order return options loaded
 * in the state or if there is an error loading the order return options
 * and it is not loading. Otherwise, it will return false.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns True if there is either an error or order return options
 *          result and it is not loading, false otherwise.
 */
export const areOrderReturnOptionsFetched = (
  state: StoreState,
  orderId: Order['id'],
) =>
  (!!getOrderReturnOptions(state, orderId) ||
    !!getOrderReturnOptionsError(state, orderId)) &&
  !areOrderReturnOptionsLoading(state, orderId);

/**
 * Returns the loading status for the fetch shipment trackings request.
 *
 * @param state - Application state.
 *
 * @returns True if there an ongoing request to fetch shipment trackings,
 * false otherwise.
 */
export const areShipmentTrackingsLoading = (state: StoreState) =>
  getShipmentTrackings(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the fetch shipment trackings request, if any.
 *
 * @param state - Application state.
 *
 * @returns An error if there was one when fetching shipment trackings,
 * `undefined` otherwise.
 */
export const getShipmentTrackingsError = (state: StoreState) =>
  getShipmentTrackings(state.orders as OrdersState).error;

/**
 * Returns the loading status for the fetch order documents request.
 *
 * @param state - Application state.
 *
 * @returns True if there an ongoing request to fetch order documents,
 * false otherwise.
 */
export const areOrderDocumentsLoading = (state: StoreState) =>
  getDocuments(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the fetch order documents request, if any.
 *
 * @param state - Application state.
 *
 * @returns An error if there was one when fetching order documents,
 * `undefined` otherwise.
 */
export const getOrderDocumentsError = (state: StoreState) =>
  getDocuments(state.orders as OrdersState).error;

/**
 * Returns the loading status for the fetch order available items
 * activities request.
 *
 * @param state - Application state.
 *
 * @returns True if there an ongoing request to fetch order available items
 * activities, false otherwise.
 */
export const areOrderAvailableItemsActivitiesLoading = (state: StoreState) =>
  getOrderAvailableItemsActivities(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the fetch order available items activities request,
 * if any.
 *
 * @param state - Application state.
 *
 * @returns An error if there was one when fetching order available items activities,
 * `undefined` otherwise.
 */
export const getOrderAvailableItemsActivitiesError = (state: StoreState) =>
  getOrderAvailableItemsActivities(state.orders as OrdersState).error;

/**
 * Returns the loading status for the fetch order item available
 * activities request.
 *
 * @param state - Application state.
 *
 * @returns True if there an ongoing request to fetch order item available items
 * activities, false otherwise.
 */
export const areOrderItemAvailableActivitiesLoading = (state: StoreState) =>
  getOrderItemAvailableActivities(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the fetch order item available activities request,
 * if any.
 *
 * @param state - Application state.
 *
 * @returns An error if there was one when fetching order item available items activities,
 * `undefined` otherwise.
 */
export const getOrderItemAvailableActivitiesError = (state: StoreState) =>
  getOrderItemAvailableActivities(state.orders as OrdersState).error;

/**
 * Denormalizes an order item
 *
 * @param orderItemId - Order item id to denormalize.
 * @param orderItems - Order items entities.
 * @param merchants - Merchants entities.
 * @param categories - Categories entities.
 * @param brands - Brands entities.
 *
 * @returns Order item entity denormalized or undefined.
 */
const denormalizeOrderItem = (
  orderItemId: OrderItemEntity['id'],
  orderItems: Record<number, OrderItemEntity> | undefined,
  merchants: Record<number, MerchantEntity> | undefined,
  categories: Record<number, CategoryEntity> | undefined,
  brands: Record<number, Brand> | undefined,
) => {
  if (!orderItems) {
    return undefined;
  }

  const orderItem = orderItems[orderItemId];

  if (!orderItem) {
    return undefined;
  }

  const orderItemDenormalized = {
    ...orderItem,
    merchant:
      merchants && orderItem.merchantId
        ? merchants[orderItem.merchantId]
        : undefined,
    categories:
      categories && orderItem.categories
        ? (orderItem.categories
            .map(categoryId => categories[categoryId])
            .filter(Boolean) as CategoryEntity[])
        : [],
    brand: brands && orderItem.brand ? brands[orderItem.brand] : undefined,
  };

  return orderItemDenormalized;
};

/**
 * Denormalizes a return option.
 *
 * @param merchantOrderId - Merchant order id that identifier a return option.
 * @param returnOptions - Return options entities.
 * @param merchants - Merchants entities.
 *
 * @returns Return option denormalized.
 */
const denormalizeReturnOption = (
  merchantOrderId: ReturnOptionEntity['merchantOrderId'],
  returnOptions: Record<string, ReturnOptionEntity> | undefined,
  merchants: Record<number, MerchantEntity> | undefined,
) => {
  if (!merchantOrderId) {
    return undefined;
  }

  const returnOptionEntity = returnOptions?.[merchantOrderId];

  if (!returnOptionEntity) {
    return undefined;
  }

  return {
    ...returnOptionEntity,
    merchant: merchants?.[returnOptionEntity.merchantId],
  };
};

/**
 * Denormalizes an order summary.
 *
 * @param orderSummaryMerchantOrderCode - Merchant order code that identifies the order summaries.
 * @param orderSummaries - Order summary entities.
 * @param merchants - Merchants entities.
 *
 * @returns Order summary denormalized.
 */
const denormalizeOrderSummary = (
  orderSummaryMerchantOrderCode: OrderSummaryEntity['merchantOrderCode'],
  orderSummaries: Record<string, OrderSummaryEntity> | undefined,
  merchants: Record<number, MerchantEntity> | undefined,
) => {
  const orderSummaryEntity = orderSummaries?.[orderSummaryMerchantOrderCode];

  if (!orderSummaryEntity) {
    return undefined;
  }

  const { merchantId } = orderSummaryEntity;

  return {
    ...orderSummaryEntity,
    merchant:
      merchants && merchantId && merchants[merchantId]
        ? merchants[merchantId]
        : undefined,
  };
};

/**
 * Denormalizes an order
 *
 * @param orderId - Order id to denormalize.
 * @param orders - Orders entities.
 * @param orderItems - Order items entities.
 *
 * @returns Order entity denormalized or undefined.
 */
const denormalizeOrder = (
  orderId: OrderEntity['id'],
  orders: Record<string, OrderEntity> | undefined,
  orderItems: Record<number, OrderItemEntityDenormalized> | undefined,
): OrderEntityDenormalized | undefined => {
  if (!orders) {
    return undefined;
  }

  const order = orders[orderId];

  if (!order) {
    return undefined;
  }

  return {
    ...order,
    items:
      order.items && orderItems
        ? (order.items
            .map(orderItemId => orderItems[orderItemId])
            .filter(Boolean) as OrderItemEntityDenormalized[])
        : undefined,
  };
};

/**
 * Get user orders result.
 * This returns the result of a specific request made through
 * the `fetchUserOrders` action.
 *
 * @param state - Application state.
 * @param query - Query used in the request.
 *
 * @returns User orders result for the specified query if found, undefined otherwise.
 */
export const getUserOrdersResult: (
  state: StoreState,
  query?: GetUserOrdersQuery,
) => OrderSummariesDenormalized | undefined = createSelector(
  [
    (state: StoreState) => getResult(state.orders as OrdersState),
    getUser,
    (_, query?: GetUserOrdersQuery) => query,
    getUserOrders,
  ],
  (result, user, query, orderSummaries) => {
    if (!result) {
      return;
    }

    const userId = user?.id;

    if (!userId) {
      return;
    }

    const hashedQuery = generateUserOrdersRequestHash(userId, query);
    const orderSummariesResult = result[hashedQuery];
    const orderSummariesEntries = orderSummariesResult?.entries;

    if (!orderSummariesResult || !orderSummariesEntries) {
      return;
    }

    const uniqueOrderIds = new Set();

    return {
      totalPages: orderSummariesResult.totalPages,
      totalItems: orderSummariesResult.totalItems,
      number: orderSummariesResult.number,
      entries: orderSummariesEntries
        .map(merchantOrderCode => {
          const orderSummary = orderSummaries?.[merchantOrderCode];

          uniqueOrderIds.add(orderSummary?.id);

          return orderSummary;
        })
        .filter(Boolean) as Array<OrderSummaryDenormalized>,
      totalOrders: uniqueOrderIds.size,
    };
  },
);

/**
 * Get user orders result.
 * This returns the result of a specific request made through
 * the `fetchUserOrders` action but organized by order id instead.
 *
 * @param state - Application state.
 * @param query - Query used in the request.
 *
 * @returns User orders result for the specified query organized
 * by order id if found, undefined otherwise.
 */
export const getUserOrdersResultByOrderId: (
  state: StoreState,
  query?: GetUserOrdersQuery,
) =>
  | (Omit<OrderSummariesDenormalized, 'entries'> & {
      totalOrders: number;
      entries: Array<{
        orderId: Order['id'];
        orderSummaries: Array<OrderSummaryDenormalized>;
      }>;
    })
  | undefined = createSelector(
  [
    (state: StoreState) => getResult(state.orders as OrdersState),
    (_, query?: GetUserOrdersQuery) => query,
    getUser,
    (state: StoreState) => getEntities(state, 'orderSummaries'),
    getMerchants,
  ],
  (result, query, user, orderSummaries, merchants) => {
    if (!result) {
      return;
    }

    const userId = user?.id;

    if (!userId) {
      return;
    }

    const hashedQuery = generateUserOrdersRequestHash(userId, query);
    const orderSummariesResult = result[hashedQuery];
    const orderSummariesEntries = orderSummariesResult?.entries;

    if (!orderSummariesResult || !orderSummariesEntries) {
      return;
    }

    const formattedEntries: Array<{
      orderId: Order['id'];
      orderSummaries: Array<OrderSummaryDenormalized>;
    }> = [];

    const uniqueOrderIds = new Set();
    let lastOrderId = '';

    for (const merchantOrderCode of orderSummariesEntries) {
      const orderSummary = orderSummaries?.[merchantOrderCode];
      const orderId = orderSummary?.id;
      const denormalizedOrderSummary = denormalizeOrderSummary(
        merchantOrderCode,
        orderSummaries,
        merchants,
      );

      if (orderId) {
        uniqueOrderIds.add(orderId);

        if (denormalizedOrderSummary) {
          const sameOrderId = orderId === lastOrderId;

          if (sameOrderId) {
            formattedEntries[formattedEntries.length - 1]?.orderSummaries.push(
              denormalizedOrderSummary,
            );
          } else {
            formattedEntries.push({
              orderId,
              orderSummaries: [denormalizedOrderSummary],
            });
          }
        }

        lastOrderId = orderId;
      }
    }

    return {
      totalPages: orderSummariesResult.totalPages,
      totalItems: orderSummariesResult.totalItems,
      number: orderSummariesResult.number,
      totalOrders: uniqueOrderIds.size,
      entries: formattedEntries,
    };
  },
);

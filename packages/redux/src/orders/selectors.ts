import { createSelector } from 'reselect';
import { getBrands } from '../brands';
import { getCategories } from '../categories';
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
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import { getMerchants } from '../products';
import { getUser } from '../users/selectors';
import generateUserOrdersRequestHash from './actions/factories/helpers/generateUserOrdersRequestHash';
import get from 'lodash/get';
import type {
  Brand,
  GetUserOrdersQuery,
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
} from '../entities/types';
import type { OrdersState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the loading flag for the orders area actions.
 *
 * @param state - Application state.
 *
 * @returns Loading.
 */
export const areUserOrdersLoading = (
  state: StoreState,
  query?: GetUserOrdersQuery,
) => {
  const userId = getUser(state)?.id;

  if (!userId) {
    return;
  }

  const hashedQuery = generateUserOrdersRequestHash(userId, query);
  const loaders = getIsLoading(state.orders as OrdersState);

  return loaders[hashedQuery];
};

/**
 * Returns the error for the user orders area.
 *
 * @param state - Application state.
 *
 * @returns Orders error.
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
 *
 * @param state - Application state.
 *
 * @returns Object with all order items with its orderItemId as the key.
 */
export const getOrderItems = (state: StoreState) =>
  getEntities(state, 'orderItems');

/**
 * Returns all the order entities in the application state denormalized.
 *
 * @param state - Application state.
 *
 * @returns Object with orders with its orderId as the key.
 */
export const getAllOrders: (
  state: StoreState,
) => Record<OrderEntityDenormalized['id'], OrderEntityDenormalized> =
  createSelector(
    [
      (state: StoreState) => getEntities(state, 'orders'),
      getOrderItems,
      getMerchants,
      getCategories,
      getBrands,
    ],
    (ordersEntities, orderItems, merchants, categories, brands) => {
      const result: Record<
        OrderEntityDenormalized['id'],
        OrderEntityDenormalized
      > = {};

      for (const orderId in ordersEntities) {
        const denormalizedOrder = denormalizeOrder(
          orderId,
          ordersEntities,
          orderItems,
          merchants,
          categories,
          brands,
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
 *
 * @param state - Application state.
 *
 * @returns Object with order summaries with its merchantOrderCode as the key.
 */
export const getAllUserOrders: (
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
 * Returns a specific user order summary identified by its merchant order code.
 *
 * @param state       - Application state.
 * @param merchantOrderCode - Merchant order code.
 *
 * @returns Order item object.
 */
export const getUserOrder = (
  state: StoreState,
  merchantOrderCode: OrderSummaryEntity['merchantOrderCode'],
) => getEntityById(state, 'orderSummaries', merchantOrderCode);

/**
 * Returns if the orders are fetched, i.e., there was a request
 * that terminated with either error or success and there is not
 * a pending fetch guest or user orders request.
 *
 * @param state - Application state.
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
 * Returns a label tracking with the order tracking events.
 *
 * @param state          - Application state.
 * @param trackingNumber - Tracking number.
 *
 * @returns Label tracking object.
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
export const getOrderItem = (
  state: StoreState,
  orderItemId: OrderItemEntity['id'],
) => getEntityById(state, 'orderItems', orderItemId);

/**
 * Returns all the return options in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all returnOptions with its orderId_merchantId_type as the key.
 */
export const getReturnOptions = (state: StoreState) =>
  getEntities(state, 'returnOptions');

/**
 * Returns a specific return option identified by its id.
 *
 * @param state          - Application state.
 * @param returnOptionId - Return option id.
 *
 * @returns Return option object.
 */
export const getReturnOption = (state: StoreState, returnOptionId: string) =>
  getEntityById(state, 'returnOptions', returnOptionId);

/**
 * Returns a specific order identified by its id, for an authenticated user
 * or a guest user.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Order object.
 */
export const getOrder: (
  state: StoreState,
  orderId: Order['id'],
) => OrderEntityDenormalized | undefined = createSelector(
  [
    (_, orderId) => orderId,
    (state: StoreState) => getEntities(state, 'orders'),
    getOrderItems,
    getMerchants,
    getCategories,
    getBrands,
  ],
  (orderId, orders, orderItems, merchants, categories, brands) => {
    return denormalizeOrder(
      orderId,
      orders,
      orderItems,
      merchants,
      categories,
      brands,
    );
  },
);

/**
 * Returns all return options from a specific order and optionally a merchant.
 *
 * @param state      - Application state.
 * @param orderId    - Order id.
 * @param merchantId - Merchant id.
 *
 * @returns List of return options objects.
 */
// export const getOrderReturnOptions: (
//   state: StoreState,
//   orderId: Order['id'],
//   merchantId?: MerchantEntity['id'],
// ) => ReturnOptionEntityDenormalized[] | null | undefined = createSelector(
//   [
//     (state: StoreState, orderId: Order['id']) => getOrder(state, orderId),
//     (_, orderId: Order['id'], merchantId?: MerchantEntity['id']) => ({
//       orderId,
//       merchantId,
//     }),
//   ],
//   (order, { merchantId }) => {
//     if (!order) {
//       return undefined;
//     }

//     if (
//       !order.returnOptions ||
//       order.returnOptions.length === 0 ||
//       !merchantId
//     ) {
//       return order.returnOptions;
//     }

//     return order.byMerchant[merchantId]?.returnOptions;
//   },
// );

/**
 * Returns all the merchants from a specific order.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns List of merchants objects.
 */
export const getOrderMerchants: (
  state: StoreState,
  orderId: Order['id'],
) => MerchantEntity[] | undefined = createSelector(
  [(state, orderId) => getOrder(state, orderId)],
  order => {
    const orderItems = get(order, 'items');

    if (!orderItems) {
      return undefined;
    }

    return (
      orderItems
        // This cast is necessary because Object.keys returns a string[]
        // but the strings are numbers as the ordersByMerchant variable is
        // a Record<number, MerchantOrderNormalized>
        .map(({ merchant }) => merchant)
        .filter(Boolean) as MerchantEntity[]
    );
  },
);

/**
 * Returns all the order items from a specific order.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns List of order items objects.
 */
export const getOrderItemsByOrder: (
  state: StoreState,
  orderId: Order['id'],
) => OrderItemEntityDenormalized[] = createSelector(
  [(state, orderId) => getOrder(state, orderId)],
  order => {
    return order?.items ?? [];
  },
);

/**
 * Returns all the order items from a specific order and merchant.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Order items objects.
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
 * Returns the quantity of orderItems in the order.
 *
 * @param state       - Application state.
 * @param orderId     - Order id.
 * @param orderItemId - Order item id.
 *
 * @returns Number of orderItems in the order.
 */
export const getOrderItemQuantity: (
  state: StoreState,
  orderId: Order['id'],
  orderItemId: OrderItem['id'],
) => number | undefined = createSelector(
  [
    (state, orderId) => getOrder(state, orderId),
    (state, orderId) => getOrderItemsByOrder(state, orderId),
    (_, orderId, orderItemId) => ({ orderId, orderItemId }),
  ],
  (order, orderItemsByOrder, { orderItemId }) => {
    if (!order) {
      return;
    }

    const hasFullDetails = get(order, 'items');

    if (!hasFullDetails || !orderItemsByOrder) {
      return;
    }

    return Object.values(orderItemsByOrder).reduce(
      (acc, value) => acc + (value.id === orderItemId ? 1 : 0),
      0,
    );
  },
);

/**
 * Returns the loading status for the order operation for an authenticated user
 * or a guest user.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Orders list Loading status.
 */
export const isOrderLoading = (state: StoreState, orderId: Order['id']) =>
  !!getOrderDetails(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the order operation for an authenticated user
 * or a guest user.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order details operation error.
 */
export const getOrderError = (state: StoreState, orderId: Order['id']) =>
  getOrderDetails(state.orders as OrdersState).error[orderId];

/**
 * Returns if the order is fully fetched, i.e., there was a request
 * that terminated with either error or success and there is not
 * a pending fetch order request. If the request terminated with success,
 * it will only return true if the order is fully loaded, i.e., the items property
 * is present on the order entity. If you need to present the order summary entity
 * which is created by dispatching the `fetchUserOrders` action instead of fully loaded order,
 * use the `getOrder` selector and check if the returned value is not undefined.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order details operation error.
 */
export const isOrderFetched = (state: StoreState, orderId: Order['id']) => {
  const order = getOrder(state, orderId);

  return (
    (!!(order && !!order.items) || !!getOrderError(state, orderId)) &&
    !isOrderLoading(state, orderId)
  );
};

/**
 * Returns the loading status for the order return options operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order return options Loading status.
 */
export const areOrderReturnOptionsLoading = (
  state: StoreState,
  orderId: Order['id'],
) =>
  getOrderReturnOptionsFromReducer(state.orders as OrdersState).isLoading[
    orderId
  ];

/**
 * Returns the error for the order return options operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order return options operation error.
 */
export const getOrderReturnOptionsError = (
  state: StoreState,
  orderId: string,
) =>
  getOrderReturnOptionsFromReducer(state.orders as OrdersState).error[orderId];

/**
 * Returns the fetched status for the order return options operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order return options fetched status.
 */
// export const areOrderReturnOptionsFetched = (
//   state: StoreState,
//   orderId: Order['id'],
// ) =>
//   (!!getOrderReturnOptions(state, orderId) ||
//     !!getOrderReturnOptionsError(state, orderId)) &&
//   !areOrderReturnOptionsLoading(state, orderId);

/**
 * Returns the loading status for the tracking operation.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areShipmentTrackingsLoading = (state: StoreState) =>
  getShipmentTrackings(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the trackings operation.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getShipmentTrackingsError = (state: StoreState) =>
  getShipmentTrackings(state.orders as OrdersState).error;

/**
 * Returns the loading status for the documents operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areDocumentsLoading = (state: StoreState) =>
  getDocuments(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the documents operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getDocumentsError = (state: StoreState) =>
  getDocuments(state.orders as OrdersState).error;

/**
 * Returns the loading status for the available items activities operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areAvailableItemsActivitiesLoading = (state: StoreState) =>
  getOrderAvailableItemsActivities(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the available items activities operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getAvailableItemsActivitiesError = (state: StoreState) =>
  getOrderAvailableItemsActivities(state.orders as OrdersState).error;

/**
 * Returns the loading status for the order item available activities operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areOrderItemAvailableActivitiesLoading = (state: StoreState) =>
  getOrderItemAvailableActivities(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the order item available activities operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
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
 * @param returnOptionId - Return option id.
 * @param returnOptions - Return options entities.
 * @param merchants - Merchants entities.
 *
 * @returns Return option denormalized.
 */
// const denormalizeReturnOption = (
//   returnOptionId: ReturnOptionEntity['id'],
//   returnOptions: Record<string, ReturnOptionEntity> | undefined,
//   merchants: Record<number, MerchantEntity> | undefined,
// ) => {
//   if (!returnOptionId) {
//     return undefined;
//   }

//   const returnOptionEntity = returnOptions?.[returnOptionId];

//   if (!returnOptionEntity) {
//     return undefined;
//   }

//   return {
//     ...returnOptionEntity,
//     merchant: merchants?.[returnOptionEntity.merchant],
//   };
// };

/**
 * Denormalizes a order summary.
 *
 * @param returnId - Return id.
 * @param returns - Returns entities.
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
    merchant: merchants && merchantId ? merchants[merchantId] : undefined,
  };
};

/**
 * Denormalizes an order
 *
 * @param orderId - Order id to denormalize.
 * @param orders - Orders entities.
 * @param orderItems - Order items entities.
 * @param merchants - Merchants entities.
 * @param categories - Categories entities.
 * @param brands - Brands entities.
 * @param returnOptions - Return options entities.
 * @param returns - Returns entities.
 *
 * @returns Order entity denormalized or undefined.
 */
const denormalizeOrder = (
  orderId: OrderEntity['id'],
  orders: Record<string, OrderEntity> | undefined,
  orderItems: Record<number, OrderItemEntity> | undefined,
  merchants: Record<number, MerchantEntity> | undefined,
  categories: Record<number, CategoryEntity> | undefined,
  brands: Record<number, Brand> | undefined,
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
    items: order.items
      ? (order.items
          .map(orderItemId =>
            denormalizeOrderItem(
              orderItemId,
              orderItems,
              merchants,
              categories,
              brands,
            ),
          )
          .filter(Boolean) as OrderItemEntityDenormalized[])
      : undefined,
  };
};

/**
 * Get user orders result. This returns order summaries denormalized.
 * Organized by order summary.
 */
export const getUserOrdersResult: (
  state: StoreState,
  query?: GetUserOrdersQuery,
) => OrderSummariesDenormalized | undefined = createSelector(
  [
    (state: StoreState) => getResult(state.orders as OrdersState),
    (state: StoreState) => state,
    (_, query?: GetUserOrdersQuery) => query,
    getAllUserOrders,
  ],
  (result, state, query, orderSummaries) => {
    if (!result) {
      return;
    }

    const userId = getUser(state)?.id;

    if (!userId) {
      return;
    }

    const hashedQuery = generateUserOrdersRequestHash(userId, query);
    const orderSummariesResult = result[hashedQuery]?.entries;

    if (!orderSummariesResult) {
      return;
    }

    return {
      ...result[hashedQuery],
      entries: orderSummariesResult
        .map(merchantOrderCode => orderSummaries?.[merchantOrderCode])
        .filter(Boolean) as Array<OrderSummaryDenormalized>,
    } as OrderSummariesDenormalized;
  },
);

/**
 * Get user orders result. This returns order summaries organized by order id.
 */
export const getUserOrdersResultByOrderId: (
  state: StoreState,
  query?: GetUserOrdersQuery,
) =>
  | Record<OrderSummaryEntity['id'], Array<OrderSummaryDenormalized>>
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
    const orderSummariesResult = result[hashedQuery]?.entries;

    if (!orderSummariesResult) {
      return;
    }

    const resultByOrderId: Record<
      OrderSummaryEntity['id'],
      Array<OrderSummaryDenormalized>
    > = {};

    for (const merchantOrderCode of orderSummariesResult) {
      const orderSummary = orderSummaries?.[merchantOrderCode];
      const orderId = orderSummary?.id;
      const denormalizedOrderSummary = denormalizeOrderSummary(
        merchantOrderCode,
        orderSummaries,
        merchants,
      );

      if (orderId && denormalizedOrderSummary) {
        if (resultByOrderId[orderId]) {
          resultByOrderId[orderId]?.push(denormalizedOrderSummary);
        } else {
          resultByOrderId[orderId] = [denormalizedOrderSummary];
        }
      }
    }

    return resultByOrderId;
  },
);

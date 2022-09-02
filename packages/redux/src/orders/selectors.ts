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
  getOrderReturns,
  getResult,
  getShipmentTrackings,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import { getMerchants } from '../products';
import get from 'lodash/get';
import type { Brand, Order } from '@farfetch/blackout-client';
import type {
  CategoryEntity,
  CourierEntity,
  MerchantEntity,
  MerchantOrderDenormalized,
  OrderEntity,
  OrderEntityDenormalized,
  OrderItemEntity,
  OrderItemEntityDenormalized,
  OrdersDenormalized,
  ReturnOptionEntity,
  ReturnOptionEntityDenormalized,
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
export const areOrdersLoading = (state: StoreState) =>
  getIsLoading(state.orders as OrdersState);

/**
 * Returns the error for the orders area actions.
 *
 * @param state - Application state.
 *
 * @returns Orders error.
 */
export const getOrdersError = (state: StoreState) =>
  getError(state.orders as OrdersState);

/**
 * Returns all the orders in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with orders with its orderId as the key.
 */
export const getOrders = (state: StoreState) => getEntities(state, 'orders');

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
export const areOrdersFetched = (state: StoreState) => {
  return (
    // We use the getResult here instead of the getOrdersResult selector
    // because we do not need the denormalized order here that that selector
    // would return.
    (!!getResult(state.orders as OrdersState) || !!getOrdersError(state)) &&
    !areOrdersLoading(state)
  );
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
 * Retrieves pagination information of the user orders.
 *
 * @example
 * ```
 * import { getOrdersPagination } from '@farfetch/blackout-client';
 *
 * const mapStateToProps = (state: StoreState) => ({
 *     pagination: getOrdersPagination(state)
 * });
 *
 * ```
 * @example
 * ```
 * // Object returned for the orders
 * {
 *     number: 1, // Current page
 *     totalItems: 89, // Total of orders
 *     totalPages: 5 // Total of pages
 * };
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Pagination object.
 */
export const getOrdersPagination = createSelector(
  [(state: StoreState) => getResult(state.orders as OrdersState)],
  result => {
    if (!result) {
      return;
    }

    // In case result is the response from the fetch guest orders
    // which does not provide a paginated response yet instead returning
    // all orders, we return a pagination wrapper of the result containing
    // only one 1 page with all returned items.
    if (Array.isArray(result)) {
      return {
        number: 1,
        totalItems: result.length,
        totalPages: 1,
      };
    }

    return {
      number: get(result, 'number'),
      totalItems: get(result, 'totalItems'),
      totalPages: get(result, 'totalPages'),
    };
  },
);

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
 * Returns all the order items in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all order items with its orderItemId as the key.
 */
export const getOrderItems = (state: StoreState) =>
  getEntities(state, 'orderItems');

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
 * Returns a specific order identified by its id.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Order object.
 */
export const getOrder = createSelector(
  [
    (_, orderId) => orderId,
    getOrders,
    getOrderItems,
    getMerchants,
    getCategories,
    getBrands,
    getReturnOptions,
  ],
  (
    orderId,
    orders,
    orderItems,
    merchants,
    categories,
    brands,
    returnoptions,
  ) => {
    return denormalizeOrder(
      orderId,
      orders,
      orderItems,
      merchants,
      categories,
      brands,
      returnoptions,
    );
  },
);

/**
 * Returns all return options from a specific order and merchant.
 *
 * @param state      - Application state.
 * @param _          -
 * @param orderId    - Order id.
 * @param merchantId - Merchant id.
 *
 * @returns List of return options objects.
 */
export const getOrderReturnOptions = createSelector(
  [
    (state, orderId) => getOrder(state, orderId),
    (_, orderId, merchantId) => ({ orderId, merchantId }),
  ],
  (order, { merchantId }) => {
    if (!order) {
      return undefined;
    }

    return order.byMerchant[merchantId]?.returnOptions;
  },
);

/**
 * Returns all the merchants from a specific order.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns List of merchants objects.
 */
export const getOrderMerchants = createSelector(
  [(state, orderId) => getOrder(state, orderId), getMerchants],
  (order, merchants) => {
    const ordersByMerchant = get(order, 'byMerchant');

    if (!ordersByMerchant) {
      return undefined;
    }

    return (
      Object.keys(ordersByMerchant)
        // This cast is necessary because Object.keys returns a string[]
        // but the strings are numbers as the ordersByMerchant variable is
        // a Record<number, MerchantOrderNormalized>
        .map(merchantId => merchants?.[merchantId as unknown as number])
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
export const getOrderItemsByOrder = createSelector(
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
export const getOrderItemsByMerchant = createSelector(
  [(state, orderId) => getOrder(state, orderId)],
  order => {
    const orderDetailsByMerchant = get(order, 'byMerchant');

    if (!orderDetailsByMerchant) {
      return;
    }

    const result: Record<number, Array<OrderItemEntityDenormalized>> = {};

    for (const merchantId in orderDetailsByMerchant) {
      const orderItemsFromDetailsByMerchant = get(
        orderDetailsByMerchant,
        `${merchantId}.orderItems`,
      );

      if (orderItemsFromDetailsByMerchant) {
        result[merchantId as unknown as number] =
          orderItemsFromDetailsByMerchant;
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
export const getOrderItemQuantity = createSelector(
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
 * Returns the loading status for the order operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Orders list Loading status.
 */
export const isOrderLoading = (state: StoreState, orderId: Order['id']) =>
  !!getOrderDetails(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the order operation.
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
 * Returns the loading status for the order returns operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order returns Loading status.
 */
export const areOrderReturnsLoading = (
  state: StoreState,
  orderId: Order['id'],
) => getOrderReturns(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the order returns operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order returns operation error.
 */
export const getOrderReturnsError = (state: StoreState, orderId: Order['id']) =>
  getOrderReturns(state.orders as OrdersState).error[orderId];

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
      merchants && orderItem.merchant
        ? merchants[orderItem.merchant]
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
 * Denormalizes order by merchant structure.
 *
 * @param byMerchant - Orders by merchant structure to denormalize.
 * @param orderItems - Order items entities.
 * @param merchants - Merchants entities.
 * @param categories - Categories entities.
 * @param brands - Brands entities.
 *
 * @returns Order by merchant structure denormalized.
 */
const denormalizeOrdersByMerchant = (
  byMerchant: OrderEntity['byMerchant'],
  orderItems: Record<number, OrderItemEntity> | undefined,
  merchants: Record<number, MerchantEntity> | undefined,
  categories: Record<number, CategoryEntity> | undefined,
  brands: Record<number, Brand> | undefined,
  returnOptions: Record<string, ReturnOptionEntity> | undefined,
) => {
  return Object.entries(byMerchant).reduce(
    (acc, [merchantId, orderMerchantData]) => {
      const orderItemsDenormalized = orderMerchantData.orderItems
        ? (orderMerchantData.orderItems
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
        : undefined;

      const returnOptionsDenormalized = orderMerchantData.returnOptions
        ? (orderMerchantData.returnOptions
            .map(returnOptionId => {
              const returnOptionEntity = returnOptions?.[returnOptionId];

              if (!returnOptionEntity) {
                return undefined;
              }

              return {
                ...returnOptionEntity,
                merchant: merchants?.[returnOptionEntity.merchant],
              };
            })
            .filter(Boolean) as ReturnOptionEntityDenormalized[])
        : undefined;

      acc[merchantId] = {
        ...orderMerchantData,
        orderItems: orderItemsDenormalized,
        merchant: merchants?.[merchantId as unknown as number],
        returnOptions: returnOptionsDenormalized,
      };

      return acc;
    },
    {} as Record<string, MerchantOrderDenormalized>,
  );
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
  returnOptions: Record<string, ReturnOptionEntity> | undefined,
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
    byMerchant: denormalizeOrdersByMerchant(
      order.byMerchant,
      orderItems,
      merchants,
      categories,
      brands,
      returnOptions,
    ),
    items:
      order.items && orderItems
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
 * Get orders result, denormalized.
 */
export const getOrdersResult = createSelector(
  [
    (state: StoreState) => getResult(state.orders as OrdersState),
    getOrders,
    getOrderItems,
    getMerchants,
    getCategories,
    getBrands,
    getReturnOptions,
  ],
  (
    result,
    orders,
    orderItems,
    merchants,
    categories,
    brands,
    returnOptions,
  ) => {
    if (!result || !orders) {
      return;
    }

    // If result is an array, it means it contains the result
    // of the fetchGuestOrders request, so we have the full
    // order details available in entities.
    if (Array.isArray(result)) {
      return result
        .map(orderId =>
          denormalizeOrder(
            orderId,
            orders,
            orderItems,
            merchants,
            categories,
            brands,
            returnOptions,
          ),
        )
        .filter(Boolean) as OrderEntityDenormalized[];
    }

    // If result is not an array and not undefined, it means
    // it contains the result of the fetchUserOrders request, so
    // we only have order summaries here.
    return {
      ...result,
      entries: result.entries
        .map(orderId =>
          denormalizeOrder(
            orderId,
            orders,
            orderItems,
            merchants,
            categories,
            brands,
            returnOptions,
          ),
        )
        .filter(Boolean) as OrderEntityDenormalized[],
    } as OrdersDenormalized;
  },
);

// @ts-nocheck
import { normalize } from 'normalizr';
import orderSchema from '../../../../entities/schemas/order.js';
import type { Brand, Order, OrderLegacy } from '@farfetch/blackout-client';
import type {
  CategoryEntity,
  OrderEntity,
  OrderItemEntity,
} from '../../../../entities/index.js';
import type { MerchantEntity } from '../../../../entities/types/merchant.types.js';

const generateByMerchantPropertyFromOrderItems = (
  order: OrderEntity,
  orderItems: Record<OrderItemEntity['id'], OrderItemEntity>,
) => {
  return Object.values(orderItems).reduce((acc, orderItem) => {
    const orderItemId = orderItem.id;
    const merchantId = orderItem.merchant;

    let merchantOrder = acc[merchantId];

    if (!merchantOrder) {
      merchantOrder = { merchant: merchantId };
      acc[merchantId] = merchantOrder;
    }

    // Return available must be true if one of the order items inside
    // an order accepts returns.
    merchantOrder.returnAvailable =
      orderItem.isReturnAvailable || !!merchantOrder.returnAvailable;
    merchantOrder.userId = order.userId;
    merchantOrder.totalQuantity = (merchantOrder.totalQuantity ?? 0) + 1;
    merchantOrder.checkoutOrderId = order.checkoutOrderId;
    // merchantOrderCode will have the value of the last order item
    // just like orderSummary entity merging works.
    merchantOrder.merchantOrderCode = orderItem.merchantOrderCode;

    let existingOrderItems = merchantOrder.orderItems;

    if (!existingOrderItems) {
      existingOrderItems = [];
      merchantOrder.orderItems = existingOrderItems;
    }

    if (!existingOrderItems.includes(orderItemId)) {
      existingOrderItems.push(orderItemId);
    }

    return acc;
  }, {} as OrderEntity);
};

export default function normalizeFetchOrderResponse(
  order: Order | OrderLegacy,
  productImgQueryParam?: string,
) {
  const normalizedResult = normalize(
    {
      // Send productImgQueryParam so order items entity can use it in `adaptProductImages`
      productImgQueryParam,
      ...order,
    },
    orderSchema,
  ) as {
    entities: {
      orders: Record<OrderEntity['id'], OrderEntity>;
      orderItems: Record<OrderItemEntity['id'], OrderItemEntity>;
      merchants: Record<MerchantEntity['id'], MerchantEntity>;
      brands: Record<Brand['id'], Brand>;
      categories: Record<CategoryEntity['id'], CategoryEntity>;
    };
    result: OrderEntity['id'];
  };

  const orderId = order.id;
  const normalizedOrder = normalizedResult.entities.orders?.[orderId];

  if (normalizedOrder) {
    // Remove the added productImgQueryParam parameter as it is not relevant
    delete (normalizedOrder as Record<string, unknown>).productImgQueryParam;

    const orderItems = normalizedResult.entities.orderItems as NonNullable<
      typeof normalizedResult.entities.orderItems
    >;

    // Calculate the byMerchant value from each other item
    normalizedOrder.byMerchant = generateByMerchantPropertyFromOrderItems(
      normalizedOrder,
      orderItems,
    );
    normalizedOrder.totalItems = normalizedOrder.totalQuantity ?? 1;
  }

  return normalizedResult;
}

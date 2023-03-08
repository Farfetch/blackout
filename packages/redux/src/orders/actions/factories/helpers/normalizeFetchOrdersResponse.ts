import { normalize } from 'normalizr';
import orderSummary from '../../../../entities/schemas/orderSummary.js';
import type { MerchantEntity } from '../../../../entities/types/merchant.types.js';
import type {
  MerchantOrderNormalized,
  OrderEntity,
  OrdersNormalized,
  OrderSummaryNormalized,
} from '../../../../entities/types/orders.types.js';
import type { Orders } from '@farfetch/blackout-client';

type OrderSummarySemiNormalized = OrderSummaryNormalized & {
  merchant?: MerchantOrderNormalized['merchant'];
};

export default function normalizeFetchOrdersResponse(ordersResponse: Orders) {
  const normalizedResult = normalize(ordersResponse, {
    entries: [orderSummary],
  });

  const entries = normalizedResult.result
    .entries as OrdersNormalized['entries'];

  normalizedResult.result.entries = entries.filter((orderId, index) => {
    return entries.indexOf(orderId) === index;
  });

  normalizedResult.result.totalItems = normalizedResult.result.entries.length;

  const orders = normalizedResult.entities.orders;

  // Remove lingering merchant property from the root of the object
  // that was added after normalize call.
  for (const orderId in orders) {
    const order = orders[orderId] as unknown as OrderSummarySemiNormalized;

    delete order.merchant;
  }

  // This cast to unknown is necessary because normalize will not infer the
  // correct type for the normalization result.
  return normalizedResult as unknown as {
    entities: {
      orders: Record<OrderEntity['id'], OrderEntity>;
      merchants: Record<MerchantEntity['id'], MerchantEntity>;
    };
    result: OrdersNormalized;
  };
}

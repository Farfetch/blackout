import { adaptDate } from '../../helpers/adapters';
import { schema } from 'normalizr';
import type { OrderSummary } from '@farfetch/blackout-client';
import type { OrderSummaryEntity } from '../types/orders.types';

export default new schema.Entity<OrderSummaryEntity>(
  'orderSummaries',
  undefined,
  {
    idAttribute: ({ merchantOrderCode }) => merchantOrderCode,
    processStrategy: (value: OrderSummary) => {
      const { createdDate, ...item } = value;

      const convertedItem = {
        createdDate: adaptDate(createdDate),
        ...item,
      };

      return convertedItem;
    },
  },
);

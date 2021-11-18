import { adaptDate } from '../../helpers/adapters';
import { schema } from 'normalizr';
import merchant from './merchant';

export default new schema.Entity(
  'orders',
  { merchant },
  {
    mergeStrategy: (entityA, entityB) => {
      const byMerchant = { ...entityA.byMerchant };
      for (const merch in entityB.byMerchant) {
        if (!!byMerchant[merch]) {
          byMerchant[merch] = {
            ...byMerchant[merch],
            ...entityB.byMerchant[merch],
          };
        } else {
          byMerchant[merch] = { ...entityB.byMerchant[merch] };
        }
      }

      return {
        ...entityA,
        ...entityB,
        totalItems: entityA.totalItems + entityB.totalItems,
        byMerchant,
      };
    },
    processStrategy: value => {
      const {
        id,
        merchantId,
        createdDate,
        merchantName,
        merchantOrderCode,
        ...item
      } = value;

      const convertedItem = {
        id,
        createdDate: adaptDate(createdDate),
        totalItems: item.totalQuantity,
        byMerchant: {
          [merchantId]: {
            [merchantOrderCode]: {
              ...item,
              merchantOrderCode,
              merchant: {
                id: merchantId,
                name: merchantName,
              },
            },
          },
        },
      };

      return convertedItem;
    },
  },
);

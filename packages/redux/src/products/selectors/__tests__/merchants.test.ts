import { getMerchant } from '../..';
import { mockMerchant, mockMerchantId } from 'tests/__fixtures__/products';

describe('getMerchant()', () => {
  it('should return the merchant entity', () => {
    const state = {
      entities: {
        merchants: {
          [mockMerchantId]: mockMerchant,
        },
      },
    };

    expect(getMerchant(state, mockMerchantId)).toEqual(mockMerchant);
  });
});

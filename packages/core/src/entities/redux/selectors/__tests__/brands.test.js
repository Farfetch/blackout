import { getBrand, getBrands } from '../';
import { mockBrandId, mockBrandResponse } from 'tests/__fixtures__/brands';

describe('getBrand()', () => {
  it('should return the brand entity', () => {
    const state = {
      entities: {
        brands: {
          [mockBrandId]: mockBrandResponse,
        },
      },
    };

    expect(getBrand(state, mockBrandId)).toEqual(mockBrandResponse);
  });
});

describe('getBrands()', () => {
  it('should return all the brands entities', () => {
    const state = {
      entities: {
        brands: {
          [mockBrandId]: mockBrandResponse,
        },
      },
    };

    expect(getBrands(state)).toEqual(state.entities.brands);
  });
});

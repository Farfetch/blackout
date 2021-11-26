import { getBrand, getBrands } from '../';
import { mockBrand, mockBrandId } from 'tests/__fixtures__/brands';

describe('getBrand()', () => {
  it('should return the brand entity', () => {
    const state = {
      entities: {
        brands: {
          [mockBrandId]: mockBrand,
        },
      },
    };

    expect(getBrand(state, mockBrandId)).toEqual(mockBrand);
  });
});

describe('getBrands()', () => {
  it('should return all the brands entities', () => {
    const state = {
      entities: {
        brands: {
          [mockBrandId]: mockBrand,
        },
      },
    };

    expect(getBrands(state)).toEqual(state.entities.brands);
  });
});

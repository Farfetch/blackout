import { getEntity } from '../';

const mockBrandId = 6326412;
const mockBrandDetails = {
  description: null,
  id: 6326412,
  name: 'Converse X JW Anderson',
  priceType: 0,
};

describe('getEntity()', () => {
  it('should return the desired entity', () => {
    const brands = {
      [mockBrandId]: mockBrandDetails,
    };
    const state = {
      entities: {
        brands,
        products: {
          123: { id: 123, name: 'foo' },
          456: { id: 456, name: 'bar' },
        },
      },
    };

    expect(getEntity(state, 'brands')).toEqual(brands);
  });

  it('should return the desired entity when specified id equals to 0', () => {
    const products = {
      0: { id: 0, name: 'foobar' },
      123: { id: 123, name: 'foo' },
      456: { id: 456, name: 'bar' },
    };
    const state = {
      entities: {
        products,
      },
    };

    expect(getEntity(state, 'products', 0)).toEqual(products[0]);
  });
});

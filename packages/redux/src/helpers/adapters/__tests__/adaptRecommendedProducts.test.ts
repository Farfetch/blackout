import adaptRecommendedProducts from '../adaptRecommendedProducts.js';

describe('adaptRecommendedProducts()', () => {
  it('should get product adapted with no values', () => {
    expect(
      adaptRecommendedProducts([{ id: '123', products: [] }]),
    ).toMatchSnapshot();
  });

  it('should get product adapted with one value', () => {
    expect(
      adaptRecommendedProducts([
        {
          id: '123',
          products: [
            {
              product: { id: '1234' },
              score: 0.59,
              productRecommendationType: 0,
              trackers: [],
            },
          ],
        },
      ]),
    ).toMatchSnapshot();
  });

  it('should get product adapted with a first element (123) on return', () => {
    expect(
      adaptRecommendedProducts([
        {
          id: '123',
          products: [],
        },
        {
          id: '345',
          products: [],
        },
      ]),
    ).toMatchSnapshot();
  });
});

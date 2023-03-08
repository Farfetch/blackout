import { mockDetailsModel } from 'tests/__fixtures__/products/index.mjs';
import productsServerInitialState from '../products.js';
import type { Model } from '../../../types/index.js';

describe('products serverInitialState()', () => {
  it('should initialize server state for products', () => {
    const state = productsServerInitialState({
      // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
      model: mockDetailsModel as Model,
    });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for a non products related page', () => {
    const model = {} as Model;
    const state = productsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });
});

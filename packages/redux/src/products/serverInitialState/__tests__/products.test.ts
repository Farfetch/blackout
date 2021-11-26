import { mockDetailsModel } from 'tests/__fixtures__/products';
import productsServerInitialState from '../products';

describe('products serverInitialState()', () => {
  it('should initialize server state for products', () => {
    const state = productsServerInitialState({
      model: mockDetailsModel,
    });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for a non products related page', () => {
    const model = {};
    const state = productsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });
});

import {
  mockDetailsModel,
  mockProductsListModel,
} from 'tests/__fixtures__/products';
import serverInitialState from '..';

describe('serverInitialState()', () => {
  it('should initialize server state for a products list', () => {
    const slug =
      '/en-pt/shopping/woman?pageIndex=1&sort=price&sortDirection=asc';
    const model = {
      ...mockProductsListModel,
      slug,
    };

    const state = serverInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for products', () => {
    const state = serverInitialState({
      model: mockDetailsModel,
    });

    expect(state).toMatchSnapshot();
  });
});

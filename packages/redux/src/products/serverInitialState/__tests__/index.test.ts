import {
  mockDetailsModel,
  mockProductsListModel,
} from 'tests/__fixtures__/products';
import serverInitialState from '..';
import type { Model } from '../../../types';

describe('serverInitialState()', () => {
  it('should initialize server state for a products list', () => {
    const slug =
      '/en-pt/shopping/woman?pageIndex=1&sort=price&sortDirection=asc';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = {
      ...mockProductsListModel,
      slug,
    } as Model;

    const state = serverInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for products', () => {
    const state = serverInitialState({
      // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
      model: mockDetailsModel as Model,
    });

    expect(state).toMatchSnapshot();
  });
});

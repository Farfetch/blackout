import { mockProductsListModel } from 'tests/__fixtures__/products';
import listsServerInitialState from '../lists';

describe('products lists serverInitialState()', () => {
  it('should initialize server state for a listing', () => {
    const slug =
      '/en-pt/shopping/woman?pageIndex=1&sort=price&sortDirection=asc';
    const model = {
      ...mockProductsListModel,
      slug,
    };

    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for sets', () => {
    const slug = '/en-pt/sets/woman?pageIndex=1&sort=price&sortDirection=asc';
    const model = {
      ...mockProductsListModel,
      pageType: 'set',
      slug,
    };

    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should build the correct sorted hash with encoded query params', () => {
    const slug = '/en-pt/shopping?colors=11%7C6&another=foo';
    const expectedHash = 'listing?colors=11|6&another=foo';
    const model = {
      ...mockProductsListModel,
      slug,
    };

    const state = listsServerInitialState({ model });

    expect(Object.keys(state.entities.productsLists)).toEqual(
      expect.arrayContaining([expectedHash]),
    );
    expect(state.lists.hash).toBe(expectedHash);
  });

  it('should build the correct hash without any query params in the slug', () => {
    const slug = '/en-pt/shopping';
    const expectedHash = 'listing';
    const model = { ...mockProductsListModel, slug };
    const state = listsServerInitialState({ model });

    expect(Object.keys(state.entities.productsLists)).toEqual(
      expect.arrayContaining([expectedHash]),
    );
    expect(state.lists.hash).toBe(expectedHash);
  });

  it('should initialize server state for a non products list', () => {
    const model = {};
    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });
});

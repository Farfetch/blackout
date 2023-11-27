import { mockProductsListModel } from 'tests/__fixtures__/products/index.mjs';
import listsServerInitialState from '../listings.js';
import type { Model } from '../../../types/index.js';

describe('products lists serverInitialState()', () => {
  it('should initialize server state for a listing', () => {
    const slug =
      '/en-pt/shopping/woman?pageIndex=1&sort=price&sortDirection=asc';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = {
      ...mockProductsListModel,
      slug,
    } as Model;

    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for sets', () => {
    const slug = '/en-pt/sets/woman?pageIndex=1&sort=price&sortDirection=asc';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = {
      ...mockProductsListModel,
      pageType: 'set',
      slug,
    } as Model;

    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for a custom listing page', () => {
    const slug = '/en-pt/customlistingpage';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = {
      relatedCommerceData: { referencedListing: [mockProductsListModel] },
      slug,
    } as Model;

    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should build the correct sorted hash with encoded query params', () => {
    const slug = '/en-pt/shopping?colors=11%7C6&another=foo';
    const expectedHash = 'listing?colors=11|6&another=foo';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = {
      ...mockProductsListModel,
      slug,
    } as Model;

    const state = listsServerInitialState({ model });

    expect(Object.keys(state.entities!.productsLists!)).toEqual(
      expect.arrayContaining([expectedHash]),
    );
    expect(state.lists.hash).toBe(expectedHash);
  });

  it('should build the correct hash without any query params in the slug', () => {
    const slug = '/en-pt/shopping';
    const expectedHash = 'listing';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = { ...mockProductsListModel, slug } as Model;
    const state = listsServerInitialState({ model });

    expect(Object.keys(state.entities!.productsLists!)).toEqual(
      expect.arrayContaining([expectedHash]),
    );
    expect(state.lists.hash).toBe(expectedHash);
  });

  it('should build the correct hash when is a custom listing page', () => {
    const slug = '/en-pt/customlistingpage';
    const expectedHash = 'listing/customlistingpage';
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = {
      relatedCommerceData: { referencedListing: [mockProductsListModel] },
      slug,
    } as Model;
    const state = listsServerInitialState({ model });

    expect(Object.keys(state.entities!.productsLists!)).toEqual(
      expect.arrayContaining([expectedHash]),
    );
    expect(state.lists.hash).toBe(expectedHash);
  });

  it('should initialize server state for a non product list with initial state', () => {
    const model = {} as Model;
    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
  });

  it('should initialize server state for listing that has returned no products and it is not a custom listing page', () => {
    const slug = '/en-pt/shopping';
    const expectedHash = 'listing';
    const model = {
      dataLayer: { general: { type: 'Listing' } },
      slug,
    } as Model;

    const state = listsServerInitialState({ model });

    expect(state).toMatchSnapshot();
    expect(Object.keys(state.lists.error)).toEqual(
      expect.arrayContaining([expectedHash]),
    );
  });
});

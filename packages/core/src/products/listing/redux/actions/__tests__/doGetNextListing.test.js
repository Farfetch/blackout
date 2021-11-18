import { doGetNextListing } from '../';
import {
  mockListingHashWithoutPageIndex,
  mockListingSlug,
  mockQueryWithoutPageIndex,
  mockSearchResult,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const productListingMockStore = (state = {}) =>
  mockStore({ listing: reducer() }, state, mockMiddlewares);
const productListingMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ listing: reducer() }, state);

describe('doGetNextListing() action creator', () => {
  let store;
  const mockPreviousProduct = {
    id: 13436973,
    shortDescription: 'The product',
    price: {
      includingTaxes: 9218,
    },
    slug: 'product-13436973',
    quantity: 7,
  };
  const getListing = jest.fn();
  const action = doGetNextListing(getListing);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const pageIndex = 1;

  beforeEach(() => {
    jest.clearAllMocks();

    store = productListingMockStore({
      listing: { hash: mockListingHashWithoutPageIndex },
      entities: {
        products: mockPreviousProduct,
        searchResults: {
          [mockListingHashWithoutPageIndex]: {
            id: mockListingHashWithoutPageIndex,
            config: { pageIndex },
            products: {
              totalPages: 10,
              entries: [mockPreviousProduct.id],
            },
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get next product listing procedure fails', async () => {
    const expectedError = new Error('Get next product listing error');

    getListing.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockListingSlug, mockQueryWithoutPageIndex));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getListing).toHaveBeenCalledTimes(1);
      expect(getListing).toHaveBeenCalledWith(
        mockListingSlug,
        { ...mockQueryWithoutPageIndex, pageindex: pageIndex + 1 },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_LISTING_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_LISTING_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get next product listing procedure is successful', async () => {
    getListing.mockResolvedValueOnce(mockSearchResult);

    await store.dispatch(action(mockListingSlug, mockQueryWithoutPageIndex));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockListingSlug,
      { ...mockQueryWithoutPageIndex, pageindex: pageIndex + 1 },
      expectedConfig,
    );
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }).payload
        .entities.searchResults[mockListingHashWithoutPageIndex].products
        .entries,
    ).toEqual([
      mockPreviousProduct.id,
      mockSearchResult.products.entries[0].id,
      mockSearchResult.products.entries[1].id,
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }),
    ).toMatchSnapshot('Get product infinite listing success payload');
  });

  it('should create the correct actions for when the get next product listing procedure is successful without receiving options', async () => {
    store = productListingMockStoreWithoutMiddlewares({
      listing: { hash: mockListingHashWithoutPageIndex },
      entities: {
        products: mockPreviousProduct,
        searchResults: {
          [mockListingHashWithoutPageIndex]: {
            id: mockListingHashWithoutPageIndex,
            config: { pageIndex },
            products: {
              totalPages: 10,
              entries: [mockPreviousProduct.id],
            },
          },
        },
      },
    });

    getListing.mockResolvedValueOnce(mockSearchResult);

    await store.dispatch(action(mockListingSlug, mockQueryWithoutPageIndex));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockListingSlug,
      { ...mockQueryWithoutPageIndex, pageindex: pageIndex + 1 },
      expectedConfig,
    );
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }).payload
        .entities.searchResults[mockListingHashWithoutPageIndex].products
        .entries,
    ).toEqual([
      mockPreviousProduct.id,
      mockSearchResult.products.entries[0].id,
      mockSearchResult.products.entries[1].id,
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }),
    ).toMatchSnapshot(
      'Get product infinite listing success payload without receiving options',
    );
  });

  it('should not fetch when there is not a next page', async () => {
    store = productListingMockStore({
      listing: { hash: mockListingHashWithoutPageIndex },
      entities: {
        searchResults: {
          [mockListingHashWithoutPageIndex]: {
            config: { pageIndex },
            products: {
              totalPages: pageIndex,
            },
          },
        },
      },
    });

    getListing.mockResolvedValueOnce(mockSearchResult);

    await store.dispatch(action(mockListingSlug, mockQueryWithoutPageIndex));

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
  });
});

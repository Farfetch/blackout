import { doGetListing } from '../';
import {
  mockListingHash,
  mockListingNormalizedPayload,
  mockListingSlug,
  mockQuery,
  mockSearchResult,
  mockSubfolder,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ subfolder: mockSubfolder }),
  }),
];
const productListingMockStore = (state = {}) =>
  mockStore({ listing: reducer() }, state, mockMiddlewares);
const productListingMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ listing: reducer() }, state);

describe('doGetListing() action creator', () => {
  let store;
  const getListing = jest.fn();
  const action = doGetListing(getListing);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const state = {
    listing: { hash: mockListingHash },
    entities: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = productListingMockStore(state);
  });

  it('should do nothing if listing in cache, cache is enabled but set listing hash is false', async () => {
    const useCache = true;
    const setListingHash = false;

    store = productListingMockStore({
      listing: {
        ...store.listing,
        isLoading: { [mockListingHash]: false },
      },
      entities: mockListingNormalizedPayload.entities,
    });

    await store.dispatch(
      action(mockListingSlug, mockQuery, useCache, setListingHash),
    );

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
  });

  it('should create the correct actions for when the get product listing procedure fails', async () => {
    const expectedError = new Error('Get product listing error');

    getListing.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockListingSlug, mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getListing).toHaveBeenCalledTimes(1);
      expect(getListing).toHaveBeenCalledWith(
        mockListingSlug,
        mockQuery,
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

  it('should create the correct actions for when the get product listing procedure is successful', async () => {
    getListing.mockResolvedValueOnce(mockSearchResult);

    const queryParam = { sort: 'price' };

    await store.dispatch(action(mockListingSlug, queryParam));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockListingSlug,
      queryParam,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.SET_LISTING_HASH,
          },
          {
            type: actionTypes.GET_LISTING_REQUEST,
          },
          {
            payload: mockListingNormalizedPayload,
            type: actionTypes.GET_LISTING_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }),
    ).toMatchSnapshot('Get product listing success payload');
  });

  it('should create the correct actions for when the get product listing procedure is successful without receiving options', async () => {
    store = productListingMockStoreWithoutMiddlewares(state);
    getListing.mockResolvedValueOnce(mockSearchResult);

    const queryParam = { sort: 'price' };

    await store.dispatch(action(mockListingSlug, queryParam));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockListingSlug,
      queryParam,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.SET_LISTING_HASH,
          },
          {
            type: actionTypes.GET_LISTING_REQUEST,
          },
          {
            payload: mockListingNormalizedPayload,
            type: actionTypes.GET_LISTING_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }),
    ).toMatchSnapshot(
      'Get product listing success payload without receiving options',
    );
  });

  it('should reset state when listing is in cache but cache is not activated', async () => {
    store = productListingMockStore({
      listing: { hash: mockListingHash },
      entities: {
        searchResults: { [mockListingHash]: { id: mockListingHash } },
      },
    });

    getListing.mockResolvedValueOnce(mockSearchResult);

    await store.dispatch(action(mockListingSlug, mockQuery));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockListingSlug,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.RESET_LISTING_STATE,
          },
          {
            payload: { hash: mockListingHash },
            type: actionTypes.SET_LISTING_HASH,
          },
          {
            type: actionTypes.GET_LISTING_REQUEST,
          },
          {
            payload: mockListingNormalizedPayload,
            type: actionTypes.GET_LISTING_SUCCESS,
          },
        ),
      ]),
    );
  });

  it('should create the correct actions for when the get product listing procedure is successful from server', async () => {
    store = productListingMockStore({
      listing: {
        ...store.listing,
        isHydrated: { [mockListingHash]: true },
      },
    });

    await store.dispatch(action(mockListingSlug, mockQuery));

    const actionResults = store.getActions();

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.DEHYDRATE_LISTING,
        }),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.DEHYDRATE_LISTING }),
    ).toMatchSnapshot('Get product listing hydrated');
  });

  it('should return if listing already exists and useCache flag is true', async () => {
    store = productListingMockStore({
      listing: {
        ...store.listing,
        isLoading: { [mockListingHash]: false },
      },
      entities: { ...mockListingNormalizedPayload.entities },
    });

    await store.dispatch(action(mockListingSlug, mockQuery, true));

    const actionResults = store.getActions();

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getListing).not.toHaveBeenCalled();
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { type: actionTypes.SET_LISTING_HASH },
          { type: actionTypes.DEHYDRATE_LISTING },
        ),
      ]),
    );
  });

  it('should create the correct actions for a successful request without setting the list', async () => {
    getListing.mockResolvedValueOnce(mockSearchResult);

    const queryParam = { sort: 'price' };

    await store.dispatch(action(mockListingSlug, queryParam, false, false));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledTimes(1);
    expect(getListing).toHaveBeenCalledWith(
      mockListingSlug,
      queryParam,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_LISTING_REQUEST,
          },
          {
            payload: mockListingNormalizedPayload,
            type: actionTypes.GET_LISTING_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_LISTING_SUCCESS }),
    ).toMatchSnapshot('Get product listing success payload');
  });
});

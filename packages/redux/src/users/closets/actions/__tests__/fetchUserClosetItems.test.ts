import * as actionTypes from '../../actionTypes.js';
import {
  closetId,
  config,
  expectedConfig,
  getExpectedUserClosetItemsPayload,
  mockGetUserClosetItemsResponse,
  mockProductImgQueryParam,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchUserClosetItems } from '../index.js';
import { getUserClosetItems } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import thunk from 'redux-thunk';
import type {
  GetOptionsArgument,
  StoreState,
} from '../../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserClosetItems: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state, mockMiddlewares);
const usersMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
const query = {};

describe('fetchUserClosetItems() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user closet items procedure fails', async () => {
    const expectedError = new Error('fetch user closet items error');

    (getUserClosetItems as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchUserClosetItems(
          userId,
          closetId,
          query,
          config,
        )(store.dispatch, store.getState as () => StoreState, { getOptions }),
    ).rejects.toThrow(expectedError);

    expect(getUserClosetItems).toHaveBeenCalledTimes(1);
    expect(getUserClosetItems).toHaveBeenCalledWith(
      userId,
      closetId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_CLOSET_ITEMS_REQUEST },
        {
          type: actionTypes.FETCH_USER_CLOSET_ITEMS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user closet items procedure is successful', async () => {
    (getUserClosetItems as jest.Mock).mockResolvedValueOnce(
      mockGetUserClosetItemsResponse,
    );

    const expectedPayload = getExpectedUserClosetItemsPayload(
      mockProductImgQueryParam,
    );

    await fetchUserClosetItems(
      userId,
      closetId,
      query,
      config,
    )(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toEqual(mockGetUserClosetItemsResponse);
      },
    );

    expect(getUserClosetItems).toHaveBeenCalledTimes(1);
    expect(getUserClosetItems).toHaveBeenCalledWith(
      userId,
      closetId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_REQUEST,
      },
      {
        payload: expectedPayload,
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch user closet items procedure is successful without receiving options', async () => {
    store = usersMockStoreWithoutMiddlewares();
    (getUserClosetItems as jest.Mock).mockResolvedValueOnce(
      mockGetUserClosetItemsResponse,
    );

    const expectedPayload = getExpectedUserClosetItemsPayload();

    await fetchUserClosetItems(
      userId,
      closetId,
      query,
      config,
    )(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toEqual(mockGetUserClosetItemsResponse);
    });

    expect(getUserClosetItems).toHaveBeenCalledTimes(1);
    expect(getUserClosetItems).toHaveBeenCalledWith(
      userId,
      closetId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_REQUEST,
      },
      {
        payload: expectedPayload,
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_SUCCESS,
      },
    ]);
  });
});

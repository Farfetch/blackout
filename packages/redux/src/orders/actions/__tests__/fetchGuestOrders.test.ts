import * as actionTypes from '../../actionTypes';
import {
  expectedGuestOrdersNormalizedPayload,
  mockGuestOrdersResponse,
} from 'tests/__fixtures__/orders';
import { fetchGuestOrders } from '..';
import { getGuestOrders } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getGuestOrders: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchGuestOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch guest orders procedure fails', async () => {
    const expectedError = new Error('fetch guest orders error');

    (getGuestOrders as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchGuestOrders()(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(getGuestOrders).toHaveBeenCalledTimes(1);
    expect(getGuestOrders).toHaveBeenCalledWith(expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_GUEST_ORDERS_REQUEST },
        {
          type: actionTypes.FETCH_GUEST_ORDERS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch guest orders procedure is successful', async () => {
    (getGuestOrders as jest.Mock).mockResolvedValueOnce(
      mockGuestOrdersResponse,
    );

    await fetchGuestOrders()(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toEqual(mockGuestOrdersResponse);
    });

    expect(getGuestOrders).toHaveBeenCalledTimes(1);
    expect(getGuestOrders).toHaveBeenCalledWith(expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_GUEST_ORDERS_REQUEST },
      {
        payload: expectedGuestOrdersNormalizedPayload,
        type: actionTypes.FETCH_GUEST_ORDERS_SUCCESS,
      },
    ]);
  });
});

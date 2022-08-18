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

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getGuestOrders: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const expectedConfig = undefined;
let store;

describe('fetchGuestOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch guest orders procedure fails', async () => {
    const expectedError = new Error('fetch guest orders error');

    getGuestOrders.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchGuestOrders());
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the fetch guest orders procedure is successful', async () => {
    getGuestOrders.mockResolvedValueOnce(mockGuestOrdersResponse);

    expect.assertions(4);

    await store.dispatch(fetchGuestOrders()).then(clientResult => {
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

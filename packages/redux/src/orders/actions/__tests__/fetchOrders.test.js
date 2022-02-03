import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import {
  expectedNormalizedPayload,
  mockOrdersResponse,
} from 'tests/__fixtures__/orders';
import { fetchOrders } from '../';
import { getOrders } from '@farfetch/blackout-client/orders';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client/orders', () => ({
  ...jest.requireActual('@farfetch/blackout-client/orders'),
  getOrders: jest.fn(),
}));

const userId = 112233;
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchOrders() action creator', () => {
  const query = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch orders procedure fails', async () => {
    const expectedError = new Error('fetch orders error');

    getOrders.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchOrders(userId, query)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getOrders).toHaveBeenCalledTimes(1);
      expect(getOrders).toHaveBeenCalledWith({ query, userId }, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_ORDERS_REQUEST },
          {
            payload: { error: expectedError },
            type: actionTypes.FETCH_ORDERS_FAILURE,
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch orders procedure is successful', async () => {
    getOrders.mockResolvedValueOnce(mockOrdersResponse);

    expect.assertions(5);

    await store.dispatch(fetchOrders(userId, query)).then(clientResult => {
      expect(clientResult).toEqual(mockOrdersResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrders).toHaveBeenCalledTimes(1);
    expect(getOrders).toHaveBeenCalledWith({ query, userId }, expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDERS_REQUEST },
      {
        payload: expectedNormalizedPayload,
        type: actionTypes.FETCH_ORDERS_SUCCESS,
      },
    ]);
  });
});

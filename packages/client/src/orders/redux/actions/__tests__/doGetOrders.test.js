import * as normalizr from 'normalizr';
import {
  expectedNormalizedPayload,
  mockOrdersResponse,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrders from '../doGetOrders';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const userId = 112233;
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: reducer() }, state, mockMiddlewares);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetOrders() action creator', () => {
  const getOrders = jest.fn();
  const action = doGetOrders(getOrders);
  const query = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get orders procedure fails', async () => {
    const expectedError = new Error('get orders error');

    getOrders.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrders).toHaveBeenCalledTimes(1);
      expect(getOrders).toHaveBeenCalledWith({ query, userId }, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_ORDERS_REQUEST },
          {
            type: actionTypes.GET_ORDERS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get orders procedure is successful', async () => {
    getOrders.mockResolvedValueOnce(mockOrdersResponse);
    await store.dispatch(action(userId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrders).toHaveBeenCalledTimes(1);
    expect(getOrders).toHaveBeenCalledWith({ query, userId }, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDERS_REQUEST },
      {
        type: actionTypes.GET_ORDERS_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDERS_SUCCESS,
      }),
    ).toMatchSnapshot('get orders success payload');
  });
});

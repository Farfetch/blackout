import * as normalizr from 'normalizr';
import { actionTypes } from '../../';
import {
  expectedOrderReturnOptionsNormalizedPayload,
  mockOrderReturnOptionsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { fetchOrderReturnOptions } from '../';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import thunk from 'redux-thunk';

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

describe('fetchOrderReturnOptions() action creator', () => {
  const getOrderReturnOptions = jest.fn();
  const action = fetchOrderReturnOptions(getOrderReturnOptions);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order return options procedure fails', async () => {
    const expectedError = new Error('fetch order return options error');

    getOrderReturnOptions.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action(orderId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getOrderReturnOptions).toHaveBeenCalledTimes(1);
      expect(getOrderReturnOptions).toHaveBeenCalledWith(
        orderId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
        },
        {
          meta: { orderId },
          payload: { error: expectedError },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch order return options procedure is successful', async () => {
    getOrderReturnOptions.mockResolvedValueOnce(mockOrderReturnOptionsResponse);

    expect.assertions(5);

    await store.dispatch(action(orderId)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderReturnOptionsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
      },
      {
        meta: { orderId },
        payload: expectedOrderReturnOptionsNormalizedPayload,
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
      },
    ]);
  });
});

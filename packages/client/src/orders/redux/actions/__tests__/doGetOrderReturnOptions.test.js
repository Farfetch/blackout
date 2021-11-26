import * as normalizr from 'normalizr';
import {
  expectedOrderReturnOptionsNormalizedPayload,
  mockOrderReturnOptionsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderReturnOptions from '../doGetOrderReturnOptions';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

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

describe('doGetOrderReturnOptions() action creator', () => {
  const getOrderReturnOptions = jest.fn();
  const action = doGetOrderReturnOptions(getOrderReturnOptions);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order return options procedure fails', async () => {
    const expectedError = new Error('get order return options error');

    getOrderReturnOptions.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderReturnOptions).toHaveBeenCalledTimes(1);
      expect(getOrderReturnOptions).toHaveBeenCalledWith(
        orderId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { orderId },
            type: actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST,
          },
          {
            meta: { orderId },
            type: actionTypes.GET_ORDER_RETURN_OPTIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order return options procedure is successful', async () => {
    getOrderReturnOptions.mockResolvedValueOnce(mockOrderReturnOptionsResponse);
    await store.dispatch(action(orderId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledWith(orderId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST },
      {
        type: actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS,
        payload: expectedOrderReturnOptionsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS,
      }),
    ).toMatchSnapshot('get order return options success payload');
  });
});

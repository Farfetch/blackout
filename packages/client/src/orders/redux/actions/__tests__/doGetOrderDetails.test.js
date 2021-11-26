import * as normalizr from 'normalizr';
import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderDetails from '../doGetOrderDetails';
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
const ordersMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ orders: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetOrderDetails() action creator', () => {
  const getOrderDetails = jest.fn();
  const action = doGetOrderDetails(getOrderDetails);

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order details procedure fails', async () => {
    const expectedError = new Error('get order details error');

    getOrderDetails.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderDetails).toHaveBeenCalledTimes(1);
      expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { orderId },
            type: actionTypes.GET_ORDER_DETAILS_REQUEST,
          },
          {
            meta: { orderId },
            type: actionTypes.GET_ORDER_DETAILS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order details procedure is successful', async () => {
    getOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);
    await store.dispatch(action(orderId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_DETAILS_REQUEST },
      {
        type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
        payload: expectedOrderDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('get order details success payload');
  });

  it('should create the correct actions for when the get order details procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();

    getOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);
    await store.dispatch(action(orderId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledTimes(1);
    expect(getOrderDetails).toHaveBeenCalledWith(orderId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_DETAILS_REQUEST },
      {
        type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
        payload: expectedOrderDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot(
      'get order details success payload without receiving options',
    );
  });
});

import * as normalizr from 'normalizr';
import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderDetailsGuestUser from '../doGetOrderDetailsGuestUser';
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

describe('doGetOrderDetailsGuestUser() action creator', () => {
  const getGuestOrderDetails = jest.fn();
  const action = doGetOrderDetailsGuestUser(getGuestOrderDetails);
  const guestUserEmail = 'guest@email.com';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order details guest user procedure fails', async () => {
    const expectedError = new Error('get order details guest user error');

    getGuestOrderDetails.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId, guestUserEmail));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getGuestOrderDetails).toHaveBeenCalledTimes(1);
      expect(getGuestOrderDetails).toHaveBeenCalledWith(
        orderId,
        guestUserEmail,
        expectedConfig,
      );
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

  it('should create the correct actions for when the get order details guest user procedure is successful', async () => {
    getGuestOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);
    await store.dispatch(action(orderId, guestUserEmail));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledWith(
      orderId,
      guestUserEmail,
      expectedConfig,
    );

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
    ).toMatchSnapshot('get order details guest user success payload');
  });

  it('should create the correct actions for when the get order details guest user procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();

    getGuestOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);
    await store.dispatch(action(orderId, guestUserEmail));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledWith(
      orderId,
      guestUserEmail,
      expectedConfig,
    );

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
      'get order details guest user success payload without receiving options',
    );
  });
});

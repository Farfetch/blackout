import * as normalizr from 'normalizr';
import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { fetchOrderDetailsGuestUser } from '../';
import { mockStore } from '../../../../../tests';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockProductImgQueryParam = '?c=2';
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: reducer() }, state, mockMiddlewares);
const ordersMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ orders: reducer() }, state);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchOrderDetailsGuestUser() action creator', () => {
  const getGuestOrderDetails = jest.fn();
  const action = fetchOrderDetailsGuestUser(getGuestOrderDetails);
  const guestUserEmail = 'guest@email.com';

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order details guest user procedure fails', async () => {
    const expectedError = new Error('fetch order details guest user error');

    getGuestOrderDetails.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action(orderId, guestUserEmail)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getGuestOrderDetails).toHaveBeenCalledTimes(1);
      expect(getGuestOrderDetails).toHaveBeenCalledWith(
        orderId,
        guestUserEmail,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
        },
        {
          meta: { orderId },
          payload: { error: expectedError },
          type: actionTypes.FETCH_ORDER_DETAILS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch order details guest user procedure is successful', async () => {
    getGuestOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(action(orderId, guestUserEmail)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledWith(
      orderId,
      guestUserEmail,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
      },
      {
        meta: { orderId },
        payload: {
          ...expectedOrderDetailsNormalizedPayload,
          result: {
            ...expectedOrderDetailsNormalizedPayload.result,
            productImgQueryParam: mockProductImgQueryParam,
          },
        },
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
        guest: true,
      },
    ]);
  });

  it('should create the correct actions for when the fetch order details guest user procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();

    getGuestOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);

    expect.assertions(5);

    await store.dispatch(action(orderId, guestUserEmail)).then(clientResult => {
      expect(clientResult).toEqual(mockOrderDetailsResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledTimes(1);
    expect(getGuestOrderDetails).toHaveBeenCalledWith(
      orderId,
      guestUserEmail,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
      },
      {
        meta: { orderId },
        payload: expectedOrderDetailsNormalizedPayload,
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
        guest: true,
      },
    ]);
  });
});

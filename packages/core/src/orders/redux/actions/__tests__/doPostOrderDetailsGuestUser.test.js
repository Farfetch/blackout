import {
  expectedOrderDetailsNormalizedPayload,
  mockOrderDetailsResponse,
  orderId,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doPostOrderDetailsGuestUser from '../doPostOrderDetailsGuestUser';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';
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

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doPostOrderDetailsGuestUser() action creator', () => {
  const postGuestOrderDetails = jest.fn();
  const action = doPostOrderDetailsGuestUser(postGuestOrderDetails);
  const data = {
    guestUserEmail: 'guest@email.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the post order details guest user procedure fails', async () => {
    const expectedError = new Error('post order details guest user error');

    postGuestOrderDetails.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postGuestOrderDetails).toHaveBeenCalledTimes(1);
      expect(postGuestOrderDetails).toHaveBeenCalledWith(
        orderId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { orderId },
            type: actionTypes.POST_GUEST_ORDER_DETAILS_REQUEST,
          },
          {
            meta: { orderId },
            type: actionTypes.POST_GUEST_ORDER_DETAILS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post order details guest user procedure is successful', async () => {
    postGuestOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);
    await store.dispatch(action(orderId, data));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postGuestOrderDetails).toHaveBeenCalledTimes(1);
    expect(postGuestOrderDetails).toHaveBeenCalledWith(
      orderId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_GUEST_ORDER_DETAILS_REQUEST },
      {
        type: actionTypes.POST_GUEST_ORDER_DETAILS_SUCCESS,
        payload: expectedOrderDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_GUEST_ORDER_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('post order details guest user success payload');
  });

  it('should create the correct actions for when the post order details guest user procedure is successful without receiving options', async () => {
    store = ordersMockStoreWithoutMiddlewares();

    postGuestOrderDetails.mockResolvedValueOnce(mockOrderDetailsResponse);
    await store.dispatch(action(orderId, data));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postGuestOrderDetails).toHaveBeenCalledTimes(1);
    expect(postGuestOrderDetails).toHaveBeenCalledWith(
      orderId,
      data,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_GUEST_ORDER_DETAILS_REQUEST },
      {
        type: actionTypes.POST_GUEST_ORDER_DETAILS_SUCCESS,
        payload: expectedOrderDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_GUEST_ORDER_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot(
      'post order details guest user success payload without receiving options',
    );
  });
});

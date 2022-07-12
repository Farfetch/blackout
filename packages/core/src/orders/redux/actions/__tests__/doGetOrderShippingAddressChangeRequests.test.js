import {
  fileId,
  mockOrderDocumentsResponse,
} from '../../__fixtures__/orders.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOrderShippingAddressChangeRequests from '../doGetOrderShippingAddressChangeRequests';
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

const orderId = '24BJKS';
const expectedConfig = undefined;
let store;

describe('doGetOrderShippingAddressChangeRequests() action creator', () => {
  const getOrderShippingAddressChangeRequests = jest.fn();
  const action = doGetOrderShippingAddressChangeRequests(
    getOrderShippingAddressChangeRequests,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order document procedure fails', async () => {
    const expectedError = new Error('get order document error');

    getOrderShippingAddressChangeRequests.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action({ orderId, fileId }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledTimes(1);
      expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
        { orderId, fileId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST,
          },
          {
            type: actionTypes.GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get order document procedure is successful', async () => {
    getOrderShippingAddressChangeRequests.mockResolvedValueOnce(
      mockOrderDocumentsResponse,
    );
    await store.dispatch(action({ orderId, fileId }));

    const actionResults = store.getActions();

    expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledTimes(1);
    expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
      { orderId, fileId },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST },
      { type: actionTypes.GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
      }),
    ).toMatchSnapshot('get order document success payload');
  });
});

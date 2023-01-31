import { mockStore } from '../../../../../tests';
import doPostOrderShippingAddressChangeRequests from '../doPostOrderShippingAddressChangeRequests';
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
const mockOrderShippingAdressChangeRequestPayload = {
  shippingAddress: {
    addressLine1: 'Uma rua em Gaia',
    addressLine2: 'Bloco B, nº 25, 2º Esq qwedsdasd',
  },
};
const expectedConfig = undefined;
let store;

describe('doPostOrderShippingAddressChangeRequests() action creator', () => {
  const postOrderShippingAddressChangeRequests = jest.fn();
  const action = doPostOrderShippingAddressChangeRequests(
    postOrderShippingAddressChangeRequests,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the post order document procedure fails', async () => {
    const expectedError = new Error('post order document error');

    postOrderShippingAddressChangeRequests.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        action(orderId, mockOrderShippingAdressChangeRequestPayload),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postOrderShippingAddressChangeRequests).toHaveBeenCalledTimes(1);
      expect(postOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
        orderId,
        mockOrderShippingAdressChangeRequestPayload,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST,
          },
          {
            type: actionTypes.POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post order document procedure is successful', async () => {
    postOrderShippingAddressChangeRequests.mockResolvedValueOnce();
    await store.dispatch(
      action(orderId, mockOrderShippingAdressChangeRequestPayload),
    );

    const actionResults = store.getActions();

    expect(postOrderShippingAddressChangeRequests).toHaveBeenCalledTimes(1);
    expect(postOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
      orderId,
      mockOrderShippingAdressChangeRequestPayload,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST },
      {
        type: actionTypes.POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
      }),
    ).toMatchSnapshot('post order document success payload');
  });
});

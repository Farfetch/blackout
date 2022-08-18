import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchCheckoutOrder } from '@farfetch/blackout-client';
import { updateCheckoutOrder } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchCheckoutOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];

describe('updateCheckoutOrder() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const data = {
    email: 'something@mail.com',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update checkout procedure fails', async () => {
    const expectedError = new Error('update checkout error');

    patchCheckoutOrder.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateCheckoutOrder(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchCheckoutOrder).toHaveBeenCalledTimes(1);
      expect(patchCheckoutOrder).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST },
          {
            type: actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update checkout procedure is successful', async () => {
    patchCheckoutOrder.mockResolvedValueOnce(mockResponse);
    await store.dispatch(updateCheckoutOrder(checkoutId, data));

    const actionResults = store.getActions();

    expect(patchCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrder).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST },
      {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
      }),
    ).toMatchSnapshot('update checkout success payload');
  });

  it('should create the correct actions for when the update checkout procedure is successful with config to apply the new axios headers', async () => {
    const configWithHeaders = {
      headers: {
        'Accept-Language': 'pt-PT',
        'FF-Country': 165,
        'FF-Currency': 'EUR',
      },
    };

    patchCheckoutOrder.mockResolvedValueOnce(mockResponse);
    await store.dispatch(
      updateCheckoutOrder(checkoutId, data, configWithHeaders),
    );

    const actionResults = store.getActions();

    expect(patchCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrder).toHaveBeenCalledWith(
      checkoutId,
      data,
      configWithHeaders,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST },
      {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
      }),
    ).toMatchSnapshot(
      'update checkout success payload with config to apply the new axios headers',
    );
  });
});

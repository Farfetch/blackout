import { actionTypes } from '../..';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchCheckout } from '@farfetch/blackout-client/checkout';
import { updateCheckout } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  patchCheckout: jest.fn(),
}));

describe('updateCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const data = {
    something: 'something',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update checkout procedure fails', async () => {
    const expectedError = new Error('update checkout error');

    patchCheckout.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateCheckout(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchCheckout).toHaveBeenCalledTimes(1);
      expect(patchCheckout).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_CHECKOUT_REQUEST },
          {
            type: actionTypes.UPDATE_CHECKOUT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update checkout procedure is successful', async () => {
    patchCheckout.mockResolvedValueOnce(mockResponse);
    await store.dispatch(updateCheckout(checkoutId, data));

    const actionResults = store.getActions();

    expect(patchCheckout).toHaveBeenCalledTimes(1);
    expect(patchCheckout).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_CHECKOUT_REQUEST },
      {
        type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
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

    patchCheckout.mockResolvedValueOnce(mockResponse);
    await store.dispatch(updateCheckout(checkoutId, data, configWithHeaders));

    const actionResults = store.getActions();

    expect(patchCheckout).toHaveBeenCalledTimes(1);
    expect(patchCheckout).toHaveBeenCalledWith(
      checkoutId,
      data,
      configWithHeaders,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_CHECKOUT_REQUEST },
      {
        type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
      }),
    ).toMatchSnapshot(
      'update checkout success payload with config to apply the new axios headers',
    );
  });
});

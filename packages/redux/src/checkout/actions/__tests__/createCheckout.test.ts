import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import { createCheckout } from '..';
import {
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postCheckout } from '@farfetch/blackout-client/checkout';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  postCheckout: jest.fn(),
}));

describe('doCreateCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const userId = 1;
  const bagId = 1;
  const guestUserEmail = 'optional@optinal.com';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the create checkout procedure fails', async () => {
    const expectedError = new Error('create checkout error');

    postCheckout.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createCheckout({ bagId, userId, guestUserEmail }));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCheckout).toHaveBeenCalledTimes(1);
      expect(postCheckout).toHaveBeenCalledWith(
        { bagId, userId, guestUserEmail },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_CHECKOUT_REQUEST },
          {
            type: actionTypes.CREATE_CHECKOUT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create checkout procedure is successful', async () => {
    postCheckout.mockResolvedValueOnce(mockResponse);
    await store.dispatch(createCheckout({ bagId, userId, guestUserEmail }));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postCheckout).toHaveBeenCalledTimes(1);
    expect(postCheckout).toHaveBeenCalledWith(
      { bagId, userId, guestUserEmail },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CHECKOUT_REQUEST },
      {
        type: actionTypes.CREATE_CHECKOUT_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CHECKOUT_SUCCESS,
      }),
    ).toMatchSnapshot('create checkout success payload');
  });
});

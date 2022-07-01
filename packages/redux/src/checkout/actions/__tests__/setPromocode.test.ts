import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putCheckoutOrderPromocode } from '@farfetch/blackout-client';
import { setPromocode } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putCheckoutOrderPromocode: jest.fn(),
}));

describe('setPromocode() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);

  const data = {
    promocode: 'something',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set promocode procedure fails', async () => {
    const expectedError = new Error('set promocode error');

    putCheckoutOrderPromocode.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setPromocode(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putCheckoutOrderPromocode).toHaveBeenCalledTimes(1);
      expect(putCheckoutOrderPromocode).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_PROMOCODE_REQUEST },
          {
            type: actionTypes.SET_PROMOCODE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set promocode procedure is successful', async () => {
    putCheckoutOrderPromocode.mockResolvedValueOnce(mockResponse);
    await store.dispatch(setPromocode(checkoutId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putCheckoutOrderPromocode).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderPromocode).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_PROMOCODE_REQUEST },
      {
        type: actionTypes.SET_PROMOCODE_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_PROMOCODE_SUCCESS,
      }),
    ).toMatchSnapshot('set promocode success payload');
  });
});

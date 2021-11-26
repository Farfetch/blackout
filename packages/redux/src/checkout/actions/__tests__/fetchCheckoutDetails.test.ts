import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import {
  checkoutId,
  expectedDetailsNormalizedPayload,
  mockDetailsResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCheckoutDetails } from '..';
import { getCheckoutDetails } from '@farfetch/blackout-client/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  getCheckoutDetails: jest.fn(),
}));

describe('fetchCheckoutDetails() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch checkout details procedure fails', async () => {
    const expectedError = new Error('fetch checkout details error');

    getCheckoutDetails.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCheckoutDetails(checkoutId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckoutDetails).toHaveBeenCalledTimes(1);
      expect(getCheckoutDetails).toHaveBeenCalledWith(
        checkoutId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CHECKOUT_DETAILS_REQUEST },
          {
            type: actionTypes.FETCH_CHECKOUT_DETAILS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch checkout details procedure is successful', async () => {
    getCheckoutDetails.mockResolvedValueOnce(mockDetailsResponse);
    await store.dispatch(fetchCheckoutDetails(checkoutId));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutDetails).toHaveBeenCalledTimes(1);
    expect(getCheckoutDetails).toHaveBeenCalledWith(checkoutId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_DETAILS_REQUEST },
      {
        meta: { id: checkoutId },
        type: actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS,
        payload: expectedDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout details success payload');
  });
});

import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedDetailsNormalizedPayload,
  mockDetailsResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCheckoutOrderDetails } from '..';
import { getCheckoutOrderDetails } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderDetails: jest.fn(),
}));

describe('fetchCheckoutOrderDetails() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch checkout details procedure fails', async () => {
    const expectedError = new Error('fetch checkout details error');

    (getCheckoutOrderDetails as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCheckoutOrderDetails(checkoutId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrderDetails).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDetails).toHaveBeenCalledWith(
      checkoutId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_REQUEST },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout details procedure is successful', async () => {
    (getCheckoutOrderDetails as jest.Mock).mockResolvedValueOnce(
      mockDetailsResponse,
    );

    await fetchCheckoutOrderDetails(checkoutId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockDetailsResponse);
      },
    );

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDetails).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDetails).toHaveBeenCalledWith(
      checkoutId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_REQUEST },
      {
        meta: { id: checkoutId },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS,
        payload: expectedDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout details success payload');
  });
});

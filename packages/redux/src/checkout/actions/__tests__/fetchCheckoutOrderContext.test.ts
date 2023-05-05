import * as actionTypes from '../../actionTypes.js';
import {
  checkoutOrderId,
  contextId,
  mockGetCheckoutOrderContextResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { fetchCheckoutOrderContext } from '../index.js';
import { find } from 'lodash-es';
import { getCheckoutOrderContext } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderContext: jest.fn(),
}));

describe('fetchCheckoutOrderContext() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch checkout order context procedure fails', async () => {
    const expectedError = new Error('fetch checkout order context error');

    (getCheckoutOrderContext as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchCheckoutOrderContext(
          checkoutOrderId,
          contextId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      contextId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_REQUEST },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout order context procedure is successful', async () => {
    (getCheckoutOrderContext as jest.Mock).mockResolvedValueOnce(
      mockGetCheckoutOrderContextResponse,
    );

    await fetchCheckoutOrderContext(
      checkoutOrderId,
      contextId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockGetCheckoutOrderContextResponse);
    });

    const actionResults = store.getActions();

    expect(getCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      contextId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_SUCCESS,
        payload: {
          entities: {},
          result: mockGetCheckoutOrderContextResponse.id,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout order context success payload');
  });
});

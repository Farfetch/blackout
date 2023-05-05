import * as actionTypes from '../../actionTypes.js';
import {
  checkoutOrderId,
  mockGetCheckoutOrderContextsResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { fetchCheckoutOrderContexts } from '../index.js';
import { find } from 'lodash-es';
import { getCheckoutOrderContexts } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderContexts: jest.fn(),
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

  it('should create the correct actions for when the fetch checkout order contexts procedure fails', async () => {
    const expectedError = new Error('fetch checkout order context error');

    (getCheckoutOrderContexts as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchCheckoutOrderContexts(checkoutOrderId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrderContexts).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderContexts).toHaveBeenCalledWith(
      checkoutOrderId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_REQUEST },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout order contexts procedure is successful', async () => {
    (getCheckoutOrderContexts as jest.Mock).mockResolvedValueOnce(
      mockGetCheckoutOrderContextsResponse,
    );

    await fetchCheckoutOrderContexts(checkoutOrderId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toStrictEqual(
          mockGetCheckoutOrderContextsResponse,
        );
      },
    );

    const actionResults = store.getActions();

    expect(getCheckoutOrderContexts).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderContexts).toHaveBeenCalledWith(
      checkoutOrderId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_SUCCESS,
        payload: {
          entities: {},
          result: mockGetCheckoutOrderContextsResponse.map(
            context => context.id,
          ),
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout order context success payload');
  });
});

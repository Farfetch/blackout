import * as actionTypes from '../../actionTypes.js';
import {
  checkoutOrderId,
  contextId,
} from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import { deleteCheckoutOrderContext } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import removeCheckoutOrderContext from '../removeCheckoutOrderContext.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteCheckoutOrderContext: jest.fn(),
}));

describe('removeCheckoutOrderContext() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);

  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ checkout: INITIAL_STATE }, undefined) as typeof store;
  });

  it('should create the correct actions for when the remove checkout order item procedure fails', async () => {
    const expectedError = new Error('remove checkout order context error');

    (deleteCheckoutOrderContext as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeCheckoutOrderContext(
          checkoutOrderId,
          contextId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(deleteCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      contextId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_REQUEST },
        {
          type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the remove checkout order item procedure is successful', async () => {
    (deleteCheckoutOrderContext as jest.Mock).mockResolvedValueOnce({
      '@controls': null,
    });

    await removeCheckoutOrderContext(
      checkoutOrderId,
      contextId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toStrictEqual({
        '@controls': null,
      });
    });

    const actionResults = store.getActions();

    expect(deleteCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(deleteCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      contextId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      { type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_REQUEST },
      {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
        payload: {
          '@controls': null,
        },
        meta: {
          contextId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout order context success payload');
  });
});

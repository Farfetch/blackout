import * as actionTypes from '../../actionTypes.js';
import {
  checkoutOrderContext,
  checkoutOrderId,
  contextId,
  mockPostCheckoutOrderContext,
  mockPostCheckoutOrderContextWithoutHeaders,
} from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postCheckoutOrderContext } from '@farfetch/blackout-client';
import createCheckoutOrderContext from '../createCheckoutOrderContext.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postCheckoutOrderContext: jest.fn(),
}));

const checkoutMockStore = (state = {}) =>
  mockStore({ payments: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof checkoutMockStore>;

describe('createCheckoutOrderContext() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the create checkout order context procedure fails', async () => {
    const expectedError = new Error('checkoutOrderContext error');

    (postCheckoutOrderContext as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await createCheckoutOrderContext(
          checkoutOrderId,
          checkoutOrderContext,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      checkoutOrderContext,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_REQUEST },
        {
          type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create checkout order context procedure is successful', async () => {
    (postCheckoutOrderContext as jest.Mock).mockResolvedValueOnce(
      mockPostCheckoutOrderContext,
    );
    await createCheckoutOrderContext(
      checkoutOrderId,
      checkoutOrderContext,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      checkoutOrderContext,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_REQUEST },
      {
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
        payload: {
          entities: {
            checkoutOrderContexts: {
              [contextId]: mockPostCheckoutOrderContext.data,
            },
          },
        },
        meta: { contextId },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
      }),
    ).toMatchSnapshot('createCheckoutOrderContext success payload');
  });

  it('should create the correct actions for when the create checkout order context procedure is successful even if location header is missing', async () => {
    (postCheckoutOrderContext as jest.Mock).mockResolvedValueOnce(
      mockPostCheckoutOrderContextWithoutHeaders,
    );
    await createCheckoutOrderContext(
      checkoutOrderId,
      checkoutOrderContext,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postCheckoutOrderContext).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrderContext).toHaveBeenCalledWith(
      checkoutOrderId,
      checkoutOrderContext,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_REQUEST },
      {
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
        payload: {
          entities: {
            checkoutOrderContexts: {
              [mockPostCheckoutOrderContextWithoutHeaders.data.id]:
                mockPostCheckoutOrderContextWithoutHeaders.data,
            },
          },
        },
        meta: { contextId: '' },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
      }),
    ).toMatchSnapshot('createCheckoutOrderContext success payload');
  });
});

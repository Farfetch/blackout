import * as actionTypes from '../../actionTypes.js';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { patchCheckoutOrder } from '@farfetch/blackout-client';
import { updateCheckoutOrder } from '../index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchCheckoutOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('updateCheckoutOrder() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const data = {
    email: 'something@mail.com',
  };
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update checkout order procedure fails', async () => {
    const expectedError = new Error('update checkout order error');

    (patchCheckoutOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateCheckoutOrder(checkoutId, data)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the update checkout order procedure is successful', async () => {
    (patchCheckoutOrder as jest.Mock).mockResolvedValueOnce(mockResponse);

    await updateCheckoutOrder(checkoutId, data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

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
    ).toMatchSnapshot('update checkout order success payload');
  });

  it('should create the correct actions for when the update checkout order procedure is successful with config to apply the new axios headers', async () => {
    const configWithHeaders = {
      headers: {
        'Accept-Language': 'pt-PT',
        'FF-Country': 165,
        'FF-Currency': 'EUR',
      },
    };

    (patchCheckoutOrder as jest.Mock).mockResolvedValueOnce(mockResponse);

    await updateCheckoutOrder(checkoutId, data, configWithHeaders)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

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
      'update checkout order success payload with config to apply the new axios headers',
    );
  });
});

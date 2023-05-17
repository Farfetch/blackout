import * as actionTypes from '../../actionTypes.js';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { putCheckoutOrderPromocodes } from '@farfetch/blackout-client';
import { setCheckoutOrderPromocodes } from '../index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putCheckoutOrderPromocodes: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('setCheckoutOrderPromocodes() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);

  const data = {
    promocodes: ['something'],
  };
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set checkout order promocodes procedure fails', async () => {
    const expectedError = new Error('set checkout order promocodes error');

    (putCheckoutOrderPromocodes as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await setCheckoutOrderPromocodes(checkoutId, data)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(putCheckoutOrderPromocodes).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderPromocodes).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_REQUEST },
        {
          type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set checkout order promocodes procedure is successful', async () => {
    (putCheckoutOrderPromocodes as jest.Mock).mockResolvedValueOnce(
      mockResponse,
    );

    await setCheckoutOrderPromocodes(checkoutId, data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(putCheckoutOrderPromocodes).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderPromocodes).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_REQUEST },
      {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_SUCCESS,
      }),
    ).toMatchSnapshot('set checkout order promocodes success payload');
  });
});

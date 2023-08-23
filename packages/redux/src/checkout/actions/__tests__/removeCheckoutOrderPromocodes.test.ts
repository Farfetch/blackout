import * as actionTypes from '../../actionTypes.js';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { deleteCheckoutOrderPromocodes } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { removeCheckoutOrderPromocodes } from '../index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteCheckoutOrderPromocodes: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('removeCheckoutOrderPromocodes() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);

  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set checkout order promocodes procedure fails', async () => {
    const expectedError = new Error('set checkout order promocodes error');

    (deleteCheckoutOrderPromocodes as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeCheckoutOrderPromocodes(checkoutId)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(deleteCheckoutOrderPromocodes).toHaveBeenCalledTimes(1);
    expect(deleteCheckoutOrderPromocodes).toHaveBeenCalledWith(
      checkoutId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_REQUEST },
        {
          type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set checkout order promocodes procedure is successful', async () => {
    (deleteCheckoutOrderPromocodes as jest.Mock).mockResolvedValueOnce(
      mockResponse,
    );

    await removeCheckoutOrderPromocodes(checkoutId)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(deleteCheckoutOrderPromocodes).toHaveBeenCalledTimes(1);
    expect(deleteCheckoutOrderPromocodes).toHaveBeenCalledWith(
      checkoutId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_REQUEST },
      {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_SUCCESS,
      }),
    ).toMatchSnapshot('remove checkout order promocodes success payload');
  });
});

import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putCheckoutOrderPromocode } from '@farfetch/blackout-client';
import { setCheckoutOrderPromocode } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putCheckoutOrderPromocode: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('setCheckoutOrderPromocode() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);

  const data = {
    promocode: 'something',
  };
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set checkout order promocode procedure fails', async () => {
    const expectedError = new Error('set checkout order promocode error');

    (putCheckoutOrderPromocode as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await setCheckoutOrderPromocode(checkoutId, data)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(putCheckoutOrderPromocode).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderPromocode).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_REQUEST },
        {
          type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set checkout order promocode procedure is successful', async () => {
    (putCheckoutOrderPromocode as jest.Mock).mockResolvedValueOnce(
      mockResponse,
    );

    await setCheckoutOrderPromocode(checkoutId, data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(putCheckoutOrderPromocode).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderPromocode).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_REQUEST },
      {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS,
      }),
    ).toMatchSnapshot('set checkout order promocode success payload');
  });
});

import * as actionTypes from '../../actionTypes.js';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { putCheckoutOrderTags } from '@farfetch/blackout-client';
import { setCheckoutOrderTags } from '../index.js';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putCheckoutOrderTags: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('setCheckoutOrderTags() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const data = ['something'];
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set checkout order tags procedure fails', async () => {
    const expectedError = new Error('set checkout order tags error');

    (putCheckoutOrderTags as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await setCheckoutOrderTags(checkoutId, data)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(putCheckoutOrderTags).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderTags).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SET_CHECKOUT_ORDER_TAGS_REQUEST },
        {
          type: actionTypes.SET_CHECKOUT_ORDER_TAGS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set checkout order tags procedure is successful', async () => {
    (putCheckoutOrderTags as jest.Mock).mockResolvedValueOnce(mockResponse);

    await setCheckoutOrderTags(checkoutId, data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(putCheckoutOrderTags).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderTags).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_CHECKOUT_ORDER_TAGS_REQUEST },
      {
        type: actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS,
      }),
    ).toMatchSnapshot('set checkout order tags success payload');
  });
});

import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  checkoutOrderItemId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putCheckoutOrderItemTags } from '@farfetch/blackout-client';
import { setCheckoutOrderItemTags } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putCheckoutOrderItemTags: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('setCheckoutOrderItemTags() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const data = ['something'];
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set checkout order items tags procedure fails', async () => {
    const expectedError = new Error('set checkout order item tags error');

    (putCheckoutOrderItemTags as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await setCheckoutOrderItemTags(checkoutId, checkoutOrderItemId, data)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(putCheckoutOrderItemTags).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderItemTags).toHaveBeenCalledWith(
      checkoutId,
      checkoutOrderItemId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_REQUEST },
        {
          type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set checkout order items tags procedure is successful', async () => {
    (putCheckoutOrderItemTags as jest.Mock).mockResolvedValueOnce(mockResponse);

    await setCheckoutOrderItemTags(checkoutId, checkoutOrderItemId, data)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(putCheckoutOrderItemTags).toHaveBeenCalledTimes(1);
    expect(putCheckoutOrderItemTags).toHaveBeenCalledWith(
      checkoutId,
      checkoutOrderItemId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_REQUEST },
      {
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS,
      }),
    ).toMatchSnapshot('set checkout order item tags success payload');
  });
});

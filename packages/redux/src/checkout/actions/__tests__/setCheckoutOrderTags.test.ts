import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putCheckoutOrderTags } from '@farfetch/blackout-client';
import { setCheckoutOrderTags } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putCheckoutOrderTags: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: mockProductImgQueryParam }),
  }),
];

describe('setCheckoutOrderTags() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const data = ['something'];
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set tags procedure fails', async () => {
    const expectedError = new Error('set tags error');

    putCheckoutOrderTags.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setCheckoutOrderTags(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the set tags procedure is successful', async () => {
    putCheckoutOrderTags.mockResolvedValueOnce(mockResponse);
    await store.dispatch(setCheckoutOrderTags(checkoutId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
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
    ).toMatchSnapshot('set tags success payload');
  });
});

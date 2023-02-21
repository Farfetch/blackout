import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { fetchCheckoutOrder } from '..';
import { getCheckoutOrder } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('fetchCheckoutOrder() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const query = {
    fields: 'paymentMethods,shippingOptions',
  };
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch checkout order procedure fails', async () => {
    const expectedError = new Error('fetch checkout order error');

    (getCheckoutOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchCheckoutOrder(checkoutId, query)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrder).toHaveBeenCalledWith(
      checkoutId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_CHECKOUT_ORDER_REQUEST },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout order procedure is successful', async () => {
    (getCheckoutOrder as jest.Mock).mockResolvedValueOnce(mockResponse);

    await fetchCheckoutOrder(checkoutId, query)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrder).toHaveBeenCalledWith(
      checkoutId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHECKOUT_ORDER_REQUEST },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS }),
    ).toMatchSnapshot('fetch checkout order success payload');
  });
});

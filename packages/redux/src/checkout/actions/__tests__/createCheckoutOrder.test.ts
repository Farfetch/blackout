import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { createCheckoutOrder } from '../index.js';
import {
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postCheckoutOrder } from '@farfetch/blackout-client';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postCheckoutOrder: jest.fn(),
}));

const mockProductImgQueryParam = '?c=2';
const getOptions = () => ({ productImgQueryParam: mockProductImgQueryParam });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];

describe('createCheckoutOrder() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state, mockMiddlewares);
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const mockData = {
    bagId: '3243-343424-2545',
    guestUserEmail: 'optional@optinal.com',
    metadata: {
      someKey: 'someValue',
      anotherKey: 'anotherValue',
    },
  };

  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the create checkout procedure fails', async () => {
    const expectedError = new Error('create checkout error');

    (postCheckoutOrder as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createCheckoutOrder(mockData)(
          store.dispatch,
          store.getState as () => StoreState,
          { getOptions },
        ),
    ).rejects.toThrow(expectedError);

    expect(postCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledWith(mockData, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST },
        {
          type: actionTypes.CREATE_CHECKOUT_ORDER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create checkout procedure is successful', async () => {
    (postCheckoutOrder as jest.Mock).mockResolvedValueOnce(mockResponse);

    await createCheckoutOrder(mockData)(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledWith(mockData, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST },
      {
        type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
      }),
    ).toMatchSnapshot('create checkout success payload');
  });
});

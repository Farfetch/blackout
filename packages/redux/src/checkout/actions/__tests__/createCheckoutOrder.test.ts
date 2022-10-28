import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { createCheckoutOrder } from '..';
import {
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postCheckoutOrder } from '@farfetch/blackout-client';
import find from 'lodash/find';
import thunk from 'redux-thunk';
import type { StoreState } from '../../../types';

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
  const bagId = '3243-343424-2545';
  const guestUserEmail = 'optional@optinal.com';
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the create checkout procedure fails', async () => {
    const expectedError = new Error('create checkout error');

    (postCheckoutOrder as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await createCheckoutOrder({ bagId, guestUserEmail })(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).catch(error => {
      expect(error).toBe(expectedError);
      expect(postCheckoutOrder).toHaveBeenCalledTimes(1);
      expect(postCheckoutOrder).toHaveBeenCalledWith(
        { bagId, guestUserEmail },
        expectedConfig,
      );
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
  });

  it('should create the correct actions for when the create checkout procedure is successful', async () => {
    (postCheckoutOrder as jest.Mock).mockResolvedValueOnce(mockResponse);

    await createCheckoutOrder({ bagId, guestUserEmail })(
      store.dispatch,
      store.getState as () => StoreState,
      { getOptions },
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect.assertions(6);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledTimes(1);
    expect(postCheckoutOrder).toHaveBeenCalledWith(
      { bagId, guestUserEmail },
      expectedConfig,
    );

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

import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedOrderReturnOptionsNormalizedPayload,
  mockOrderReturnOptionsResponse,
  orderId,
} from 'tests/__fixtures__/orders';
import { fetchOrderReturnOptions } from '..';
import { getOrderReturnOptions } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getOrderReturnOptions: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: '?c=2' });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof ordersMockStore>;

describe('fetchOrderReturnOptions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch order return options procedure fails', async () => {
    const expectedError = new Error('fetch order return options error');

    (getOrderReturnOptions as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchOrderReturnOptions(orderId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getOrderReturnOptions).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
        meta: { orderId },
      },
      {
        payload: { error: expectedError },
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch order return options procedure is successful', async () => {
    (getOrderReturnOptions as jest.Mock).mockResolvedValueOnce(
      mockOrderReturnOptionsResponse,
    );

    await fetchOrderReturnOptions(orderId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toEqual(mockOrderReturnOptionsResponse);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledTimes(1);
    expect(getOrderReturnOptions).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
      },
      {
        meta: { orderId },
        payload: expectedOrderReturnOptionsNormalizedPayload,
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
      },
    ]);
  });
});

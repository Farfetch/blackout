import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import { fetchProductFittings } from '..';
import { getProductFittings } from '@farfetch/blackout-client/products';
import { INITIAL_STATE } from '../../reducer/fittings';
import {
  mockProductFittings,
  mockProductFittingsNormalizedResponse,
  mockProductId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client/products', () => ({
  ...jest.requireActual('@farfetch/blackout-client/products'),
  getProductFittings: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { fittings: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductFittings() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            fittings: mockProductFittings,
          },
        },
      },
    });
  });

  it('should dispatch the correct actions when fetch product fittings fails', async () => {
    const expectedError = new Error('Fetch product fittings error');

    getProductFittings.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchProductFittings(mockProductId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getProductFittings).toHaveBeenCalledTimes(1);
      expect(getProductFittings).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE,
        },
      ]);
    });
  });

  it('should dispatch the correct actions when fetch product fittings is successful', async () => {
    getProductFittings.mockResolvedValueOnce(mockProductFittings);

    expect.assertions(5);

    await store
      .dispatch(fetchProductFittings(mockProductId))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductFittings);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductFittingsNormalizedResponse,
        type: actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS,
      },
    ]);
  });
});

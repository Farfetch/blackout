import * as normalizr from 'normalizr';
import { fetchProductSizes } from '..';
import { getProductSizes } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/sizes';
import {
  mockProductId,
  mockProductSizes,
  mockProductSizesNormalizedResponse,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductSizes: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { sizes: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductSizes() action creator', () => {
  const mockQuery = { includeOutOfStock: true };
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the fetch product sizes procedure fails', async () => {
    const expectedError = new Error('Fetch product sizes error');

    getProductSizes.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchProductSizes(mockProductId, mockQuery))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getProductSizes).toHaveBeenCalledTimes(1);
        expect(getProductSizes).toHaveBeenCalledWith(
          mockProductId,
          mockQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { productId: mockProductId },
            type: productsActionTypes.FETCH_PRODUCT_SIZES_REQUEST,
          },
          {
            meta: { productId: mockProductId },
            payload: { error: expectedError },
            type: productsActionTypes.FETCH_PRODUCT_SIZES_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch product sizes procedure is successful', async () => {
    getProductSizes.mockResolvedValueOnce(mockProductSizes);

    expect.assertions(5);

    await store
      .dispatch(fetchProductSizes(mockProductId, mockQuery))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductSizes);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSizes).toHaveBeenCalledTimes(1);
    expect(getProductSizes).toHaveBeenCalledWith(
      mockProductId,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_SIZES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductSizesNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_SIZES_SUCCESS,
      },
    ]);
  });
});

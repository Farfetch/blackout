import * as normalizr from 'normalizr';
import { fetchProductFittings } from '../index.js';
import { getProductFittings } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/fittings.js';
import {
  mockProductFittings,
  mockProductFittingsNormalizedResponse,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductFittings: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { fittings: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

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

    (getProductFittings as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchProductFittings(mockProductId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductFittings).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCT_FITTINGS_FAILURE,
      },
    ]);
  });

  it('should dispatch the correct actions when fetch product fittings is successful', async () => {
    (getProductFittings as jest.Mock).mockResolvedValueOnce(
      mockProductFittings,
    );

    await fetchProductFittings(mockProductId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockProductFittings);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledTimes(1);
    expect(getProductFittings).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductFittingsNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS,
      },
    ]);
  });
});

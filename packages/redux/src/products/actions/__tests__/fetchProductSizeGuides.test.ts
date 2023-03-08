import * as normalizr from 'normalizr';
import { fetchProductSizeGuides } from '../index.js';
import { getProductSizeGuides } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/sizeGuides.js';
import {
  mockDetailsState,
  mockProductId,
  mockProductSizeGuides,
  mockProductSizeGuidesNormalizedResponse,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductSizeGuides: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { sizeGuides: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductSizeGuides() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore(mockDetailsState);
  });

  it('should create the correct actions for when the fetch product size guides procedure fails', async () => {
    const expectedError = new Error('Fetch product size guides error');

    (getProductSizeGuides as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchProductSizeGuides(mockProductId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductSizeGuides).toHaveBeenCalledTimes(1);
    expect(getProductSizeGuides).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product size guides procedure is successful', async () => {
    (getProductSizeGuides as jest.Mock).mockResolvedValueOnce(
      mockProductSizeGuides,
    );

    await fetchProductSizeGuides(mockProductId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockProductSizeGuides);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSizeGuides).toHaveBeenCalledTimes(1);
    expect(getProductSizeGuides).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductSizeGuidesNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_SIZEGUIDES_SUCCESS,
      },
    ]);
  });
});

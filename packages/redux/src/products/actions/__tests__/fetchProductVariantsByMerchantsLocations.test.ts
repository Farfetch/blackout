import * as normalizr from 'normalizr';
import { fetchProductVariantsByMerchantsLocations } from '..';
import { getProductVariantsMerchantsLocations } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/variantsByMerchantsLocations';
import {
  mockProductId,
  mockProductsState,
  mockProductVariantsMerchantsLocations,
  mockProductVariantsMerchantsLocationsNormalizedResponse,
  mockVariantId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import type { StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductVariantsMerchantsLocations: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { merchantsLocations: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductVariantsByMerchantsLocations() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore(mockProductsState);
  });

  it('should create the correct actions for when the fetch product variants by merchants locations procedure fails', async () => {
    const expectedError = new Error(
      'Fetch product variants by merchants locations error',
    );

    (getProductVariantsMerchantsLocations as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    expect.assertions(4);

    await fetchProductVariantsByMerchantsLocations(
      mockProductId,
      mockVariantId,
    )(store.dispatch, store.getState as () => StoreState).catch(error => {
      expect(error).toBe(expectedError);
      expect(getProductVariantsMerchantsLocations).toHaveBeenCalledTimes(1);
      expect(getProductVariantsMerchantsLocations).toHaveBeenCalledWith(
        mockProductId,
        mockVariantId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch product variants by merchants locations procedure is successful', async () => {
    (getProductVariantsMerchantsLocations as jest.Mock).mockResolvedValueOnce(
      mockProductVariantsMerchantsLocations,
    );

    expect.assertions(5);

    await fetchProductVariantsByMerchantsLocations(
      mockProductId,
      mockVariantId,
    )(store.dispatch, store.getState as () => StoreState).then(clientResult => {
      expect(clientResult).toBe(mockProductVariantsMerchantsLocations);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMerchantsLocations).toHaveBeenCalledWith(
      mockProductId,
      mockVariantId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductVariantsMerchantsLocationsNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product variants by merchants locations receives an unknown variant id', async () => {
    (getProductVariantsMerchantsLocations as jest.Mock).mockResolvedValueOnce(
      mockProductVariantsMerchantsLocations,
    );
    const mockUnknownVariantId = '1234-cs';

    expect.assertions(5);

    await fetchProductVariantsByMerchantsLocations(
      mockProductId,
      mockUnknownVariantId,
    )(store.dispatch, store.getState as () => StoreState).then(clientResult => {
      expect(clientResult).toBe(mockProductVariantsMerchantsLocations);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMerchantsLocations).toHaveBeenCalledWith(
      mockProductId,
      mockUnknownVariantId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductVariantsMerchantsLocationsNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
  });
});

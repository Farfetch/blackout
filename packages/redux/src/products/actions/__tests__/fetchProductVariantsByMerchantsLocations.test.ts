import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import { fetchProductVariantsByMerchantsLocations } from '..';
import { getProductVariantsByMerchantsLocations } from '@farfetch/blackout-client/products';
import { INITIAL_STATE } from '../../reducer/variantsByMerchantsLocations';
import {
  mockProductId,
  mockProductsState,
  mockProductVariantsByMerchantsLocations,
  mockProductVariantsByMerchantsLocationsNormalizedResponse,
  mockVariantId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client/products', () => ({
  ...jest.requireActual('@farfetch/blackout-client/products'),
  getProductVariantsByMerchantsLocations: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { merchantsLocations: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductVariantsByMerchantsLocations() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore(mockProductsState);
  });

  it('should create the correct actions for when the fetch product merchants locations procedure fails', async () => {
    const expectedError = new Error('Fetch product merchants locations error');

    getProductVariantsByMerchantsLocations.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(
        fetchProductVariantsByMerchantsLocations(mockProductId, mockVariantId),
      )
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getProductVariantsByMerchantsLocations).toHaveBeenCalledTimes(1);
        expect(getProductVariantsByMerchantsLocations).toHaveBeenCalledWith(
          mockProductId,
          mockVariantId,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { productId: mockProductId },
            type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
          },
          {
            meta: { productId: mockProductId },
            payload: { error: expectedError },
            type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch product merchants locations procedure is successful', async () => {
    getProductVariantsByMerchantsLocations.mockResolvedValueOnce(
      mockProductVariantsByMerchantsLocations,
    );

    expect.assertions(5);

    await store
      .dispatch(
        fetchProductVariantsByMerchantsLocations(mockProductId, mockVariantId),
      )
      .then(clientResult => {
        expect(clientResult).toBe(mockProductVariantsByMerchantsLocations);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductVariantsByMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getProductVariantsByMerchantsLocations).toHaveBeenCalledWith(
      mockProductId,
      mockVariantId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductVariantsByMerchantsLocationsNormalizedResponse,
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product merchants locations receives an unknown variant id', async () => {
    getProductVariantsByMerchantsLocations.mockResolvedValueOnce(
      mockProductVariantsByMerchantsLocations,
    );
    const mockUnknownVariantId = '1234-cs';

    expect.assertions(5);

    await store
      .dispatch(
        fetchProductVariantsByMerchantsLocations(
          mockProductId,
          mockUnknownVariantId,
        ),
      )
      .then(clientResult => {
        expect(clientResult).toBe(mockProductVariantsByMerchantsLocations);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductVariantsByMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getProductVariantsByMerchantsLocations).toHaveBeenCalledWith(
      mockProductId,
      mockUnknownVariantId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductVariantsByMerchantsLocationsNormalizedResponse,
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
  });
});

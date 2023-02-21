import * as normalizr from 'normalizr';
import { fetchProductMeasurements } from '..';
import { getProductVariantsMeasurements } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/measurements';
import {
  mockProductId,
  mockProductVariantsMeasurements,
  mockProductVariantsMeasurementsNormalizedResponse,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductVariantsMeasurements: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { measurements: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductMeasurements() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            gender: 0,
            measurements: mockProductVariantsMeasurements,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the fetch product measurements procedure fails', async () => {
    const expectedError = new Error('Fetch product measurements error');

    (getProductVariantsMeasurements as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await fetchProductMeasurements(mockProductId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductVariantsMeasurements).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMeasurements).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product measurements procedure is successful', async () => {
    (getProductVariantsMeasurements as jest.Mock).mockResolvedValueOnce(
      mockProductVariantsMeasurements,
    );

    await fetchProductMeasurements(mockProductId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockProductVariantsMeasurements);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMeasurements).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMeasurements).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductVariantsMeasurementsNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
      },
    ]);
  });
});

import * as normalizr from 'normalizr';
import { actionTypesProducts } from '../..';
import { fetchProductMeasurements } from '..';
import { getProductVariantsMeasurements } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/measurements';
import {
  mockProductId,
  mockProductVariantsMeasurements,
  mockProductVariantsMeasurementsNormalizedResponse,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductVariantsMeasurements: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { measurements: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

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

    getProductVariantsMeasurements.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchProductMeasurements(mockProductId))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getProductVariantsMeasurements).toHaveBeenCalledTimes(1);
        expect(getProductVariantsMeasurements).toHaveBeenCalledWith(
          mockProductId,
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { productId: mockProductId },
            type: actionTypesProducts.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
          },
          {
            meta: { productId: mockProductId },
            payload: { error: expectedError },
            type: actionTypesProducts.FETCH_PRODUCT_MEASUREMENTS_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch product measurements procedure is successful', async () => {
    getProductVariantsMeasurements.mockResolvedValueOnce(
      mockProductVariantsMeasurements,
    );

    expect.assertions(5);

    await store
      .dispatch(fetchProductMeasurements(mockProductId))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductVariantsMeasurements);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMeasurements).toHaveBeenCalledTimes(1);
    expect(getProductVariantsMeasurements).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypesProducts.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductVariantsMeasurementsNormalizedResponse,
        type: actionTypesProducts.FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
      },
    ]);
  });
});

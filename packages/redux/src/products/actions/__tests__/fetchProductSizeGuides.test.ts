import * as normalizr from 'normalizr';
import { actionTypesProducts } from '../..';
import { fetchProductSizeGuides } from '..';
import { getProductSizeGuides } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/sizeGuides';
import {
  mockDetailsState,
  mockProductId,
  mockProductSizeGuides,
  mockProductSizeGuidesNormalizedResponse,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductSizeGuides: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { sizeGuides: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductSizeGuides() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore(mockDetailsState);
  });

  it('should create the correct actions for when the fetch product size guides procedure fails', async () => {
    const expectedError = new Error('Fetch product size guides error');

    getProductSizeGuides.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchProductSizeGuides(mockProductId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getProductSizeGuides).toHaveBeenCalledTimes(1);
      expect(getProductSizeGuides).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypesProducts.FETCH_PRODUCT_SIZEGUIDES_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypesProducts.FETCH_PRODUCT_SIZEGUIDES_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch product size guides procedure is successful', async () => {
    getProductSizeGuides.mockResolvedValueOnce(mockProductSizeGuides);

    expect.assertions(5);

    await store
      .dispatch(fetchProductSizeGuides(mockProductId))
      .then(clientResult => {
        expect(clientResult).toBe(mockProductSizeGuides);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSizeGuides).toHaveBeenCalledTimes(1);
    expect(getProductSizeGuides).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypesProducts.FETCH_PRODUCT_SIZEGUIDES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductSizeGuidesNormalizedResponse,
        type: actionTypesProducts.FETCH_PRODUCT_SIZEGUIDES_SUCCESS,
      },
    ]);
  });
});

import * as normalizr from 'normalizr';
import { fetchProductAttributes } from '../index.js';
import { getProductAttributes } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/attributes.js';
import {
  mockProductAttributes,
  mockProductAttributesNormalizedResponse,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductAttributes: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { attributes: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductAttributes() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            attributes: mockProductAttributes,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the fetch product attributes procedure fails', async () => {
    const expectedError = new Error('Fetch product attributes error');

    (getProductAttributes as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchProductAttributes(mockProductId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductAttributes).toHaveBeenCalledTimes(1);
    expect(getProductAttributes).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product attributes procedure is successful', async () => {
    (getProductAttributes as jest.Mock).mockResolvedValueOnce(
      mockProductAttributes,
    );

    await fetchProductAttributes(mockProductId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockProductAttributes);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductAttributes).toHaveBeenCalledTimes(1);
    expect(getProductAttributes).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductAttributesNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
      },
    ]);
  });
});

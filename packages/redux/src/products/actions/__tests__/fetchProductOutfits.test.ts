import * as normalizr from 'normalizr';
import { fetchProductOutfits } from '..';
import { getProductOutfits } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/outfits';
import {
  mockProductId,
  mockProductOutfits,
  mockProductOutfitsNormalizedResponse,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductOutfits: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { outfits: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductOutfits() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            outfits: mockProductOutfits,
          },
        },
      },
    });
  });

  it('should dispatch the correct actions when fetch product outfits fails', async () => {
    const expectedError = new Error('Fetch product outfits error');

    (getProductOutfits as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchProductOutfits(mockProductId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductOutfits).toHaveBeenCalledTimes(1);
    expect(getProductOutfits).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: { error: expectedError },
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_FAILURE,
      },
    ]);
  });

  it('should dispatch the correct actions when fetch product outfits is successful', async () => {
    (getProductOutfits as jest.Mock).mockResolvedValueOnce(mockProductOutfits);

    await fetchProductOutfits(mockProductId)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockProductOutfits);
      },
    );

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductOutfits).toHaveBeenCalledTimes(1);
    expect(getProductOutfits).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductOutfitsNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_SUCCESS,
      },
    ]);
  });
});

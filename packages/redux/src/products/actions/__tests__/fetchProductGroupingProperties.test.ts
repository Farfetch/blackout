import { fetchProductGroupingProperties } from '..';
import { getProductGroupingProperties } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/groupingProperties';
import {
  mockProductGroupingProperties,
  mockProductGroupingPropertiesAdapted,
  mockProductId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductGroupingProperties: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { groupingProperties: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductGroupingProperties() action creator', () => {
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

  it('should create the correct actions for when the fetch product grouping properties procedure fails', async () => {
    const expectedError = new Error('Fetch product grouping properties error');

    (getProductGroupingProperties as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    expect.assertions(4);

    await fetchProductGroupingProperties(mockProductId)(store.dispatch).catch(
      error => {
        expect(error).toBe(expectedError);
        expect(getProductGroupingProperties).toHaveBeenCalledTimes(1);
        expect(getProductGroupingProperties).toHaveBeenCalledWith(
          mockProductId,
          {},
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { productId: mockProductId },
            payload: { hash: '!all' },
            type: productsActionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST,
          },
          {
            meta: { productId: mockProductId },
            payload: { error: expectedError, hash: '!all' },
            type: productsActionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE,
          },
        ]);
      },
    );
  });

  it('should create the correct actions for when the fetch product grouping properties procedure is successful', async () => {
    (getProductGroupingProperties as jest.Mock).mockResolvedValueOnce(
      mockProductGroupingProperties,
    );

    const query = { hasStock: true };

    await fetchProductGroupingProperties(
      mockProductId,
      query,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toEqual(mockProductGroupingProperties);
    });

    expect(getProductGroupingProperties).toHaveBeenCalledTimes(1);
    expect(getProductGroupingProperties).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST,
        payload: { hash: '?hasstock=true' },
      },
      {
        meta: { productId: mockProductId },
        payload: {
          hash: '?hasstock=true',
          result: mockProductGroupingPropertiesAdapted,
        },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
      },
    ]);
  });
});

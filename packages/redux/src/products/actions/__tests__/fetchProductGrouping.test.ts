import { fetchProductGrouping } from '../index.js';
import { getProductGrouping } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/grouping.js';
import {
  mockProductGrouping,
  mockProductGroupingAdapted,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductGrouping: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { grouping: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof productDetailsMockStore>;

describe('fetchProductGrouping() action creator', () => {
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

  it('should create the correct actions for when the fetch product grouping procedure fails', async () => {
    const expectedError = new Error('Fetch product grouping error');

    (getProductGrouping as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchProductGrouping(mockProductId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getProductGrouping).toHaveBeenCalledTimes(1);
    expect(getProductGrouping).toHaveBeenCalledWith(
      mockProductId,
      {},
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_REQUEST,
        payload: { hash: '!all' },
      },
      {
        meta: { productId: mockProductId },
        payload: { error: expectedError, hash: '!all' },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch product grouping procedure is successful', async () => {
    (getProductGrouping as jest.Mock).mockResolvedValueOnce(
      mockProductGrouping,
    );

    const query = { pageSize: 10 };

    await fetchProductGrouping(
      mockProductId,
      query,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toEqual(mockProductGrouping);
    });

    expect(getProductGrouping).toHaveBeenCalledTimes(1);
    expect(getProductGrouping).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        payload: { hash: '?pagesize=10' },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: { hash: '?pagesize=10', result: mockProductGroupingAdapted },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_SUCCESS,
      },
    ]);
  });
});

import * as normalizr from 'normalizr';
import { fetchProductGrouping } from '..';
import { getProductGrouping } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/grouping';
import {
  mockProductGrouping,
  mockProductGroupingNormalizedResponse,
  mockProductId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductGrouping: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { grouping: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductGrouping() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');

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

    getProductGrouping.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchProductGrouping(mockProductId)).catch(error => {
      expect(error).toBe(expectedError);
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
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: productsActionTypes.FETCH_PRODUCT_GROUPING_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch product grouping procedure is successful', async () => {
    getProductGrouping.mockResolvedValueOnce(mockProductGrouping);

    const query = { pageSize: 10 };

    await store
      .dispatch(fetchProductGrouping(mockProductId, query))
      .then(clientResult => {
        expect(clientResult).toEqual(mockProductGrouping);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductGrouping).toHaveBeenCalledTimes(1);
    expect(getProductGrouping).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductGroupingNormalizedResponse,
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_SUCCESS,
      },
    ]);
  });
});

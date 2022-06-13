import * as normalizr from 'normalizr';
import { actionTypesProducts } from '../..';
import { fetchProductColorGrouping } from '..';
import { getProductColorGrouping } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/colorGrouping';
import {
  mockProductColorGrouping,
  mockProductColorGroupingNormalizedResponse,
  mockProductId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getProductColorGrouping: jest.fn(),
}));

const productDetailsMockStore = (state = {}) =>
  mockStore({ products: { colorGrouping: INITIAL_STATE } }, state);
const expectedConfig = undefined;
let store;

describe('fetchProductColorGrouping() action creator', () => {
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

  it('should create the correct actions for when the fetch product color grouping procedure fails', async () => {
    const expectedError = new Error('Fetch product color grouping error');

    getProductColorGrouping.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(fetchProductColorGrouping(mockProductId))
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getProductColorGrouping).toHaveBeenCalledTimes(1);
        expect(getProductColorGrouping).toHaveBeenCalledWith(
          mockProductId,
          {},
          expectedConfig,
        );
        expect(store.getActions()).toEqual([
          {
            meta: { productId: mockProductId },
            type: actionTypesProducts.FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
          },
          {
            meta: { productId: mockProductId },
            payload: { error: expectedError },
            type: actionTypesProducts.FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
          },
        ]);
      });
  });

  it('should create the correct actions for when the fetch product color grouping procedure is successful', async () => {
    getProductColorGrouping.mockResolvedValueOnce(mockProductColorGrouping);

    const query = { pageSize: 10 };

    await store
      .dispatch(fetchProductColorGrouping(mockProductId, query))
      .then(clientResult => {
        expect(clientResult).toEqual(mockProductColorGrouping);
      });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductColorGrouping).toHaveBeenCalledTimes(1);
    expect(getProductColorGrouping).toHaveBeenCalledWith(
      mockProductId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypesProducts.FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: mockProductColorGroupingNormalizedResponse,
        type: actionTypesProducts.FETCH_PRODUCT_COLOR_GROUPING_SUCCESS,
      },
    ]);
  });
});

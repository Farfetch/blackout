import * as actionTypes from '../../actionTypes';
import { adaptRecommendedProducts } from '../../../helpers/adapters';
import {
  expectedRecommendedProductsPayload,
  mockRecommendedProductsProductId,
  mockRecommendedProductsStrategy,
} from 'tests/__fixtures__/products';
import { fetchRecommendedProducts } from '..';
import { getRecommendedProducts } from '@farfetch/blackout-client';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer from '../../reducer';

const mockAction = { type: 'this_is_a_mock_action' };
const mockProductRecommendationsStore = (state = {}) =>
  mockStore(
    {
      products: {
        recommendedProducts: reducer(undefined, mockAction),
      },
    },
    state,
  );

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    getRecommendedProducts: jest.fn(),
  };
});

describe('fetchRecommendedProducts() action creator', () => {
  let store: ReturnType<typeof mockProductRecommendationsStore>;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockProductRecommendationsStore();
  });

  it('should create the correct actions for when the fetch product recommendations fail', async () => {
    const expectedError = new Error('fetch recommendations error');

    (getRecommendedProducts as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await fetchRecommendedProducts({
      productId: mockRecommendedProductsProductId,
      strategyName: mockRecommendedProductsStrategy,
    })(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getRecommendedProducts).toHaveBeenCalledTimes(1);
      expect(getRecommendedProducts).toHaveBeenCalledWith(
        {
          productId: mockRecommendedProductsProductId,
          strategyName: mockRecommendedProductsStrategy,
        },
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST,
            meta: { strategyName: mockRecommendedProductsStrategy },
          },
          {
            type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE,
            payload: { error: expectedError },
            meta: { strategyName: mockRecommendedProductsStrategy },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch product recommendations procedure is successful', async () => {
    (getRecommendedProducts as jest.Mock).mockResolvedValueOnce(
      expectedRecommendedProductsPayload,
    );

    const actionResults = store.getActions();
    const adaptedPayload = adaptRecommendedProducts(
      expectedRecommendedProductsPayload,
    );

    await fetchRecommendedProducts(
      {
        productId: mockRecommendedProductsProductId,
        strategyName: mockRecommendedProductsStrategy,
      },

      expectedConfig,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(expectedRecommendedProductsPayload);
    });

    expect(getRecommendedProducts).toHaveBeenCalledTimes(1);
    expect(getRecommendedProducts).toHaveBeenCalledWith(
      {
        productId: mockRecommendedProductsProductId,
        strategyName: mockRecommendedProductsStrategy,
      },
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST,
        meta: { strategyName: mockRecommendedProductsStrategy },
      },
      {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
        payload: {
          id: adaptedPayload.id,
          values: adaptedPayload.values,
        },
        meta: {
          strategyName: mockRecommendedProductsStrategy,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch product recommendations success payload');
  });
});

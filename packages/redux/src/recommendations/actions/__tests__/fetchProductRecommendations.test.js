import { adaptProductRecommendations } from '@farfetch/blackout-client/helpers/adapters';
import { expectedPayload } from 'tests/__fixtures__/recommendations/getRecommendations';
import { fetchProductRecommendations } from '..';
import { getProductRecommendations } from '@farfetch/blackout-client/recommendations';
import {
  mockProductId,
  mockRecommendationsStrategy,
  mockStore,
} from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const mockProductRecommendationsStore = (state = {}) =>
  mockStore(
    {
      recommendations: reducer(),
    },
    state,
  );

jest.mock('@farfetch/blackout-client/recommendations', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/recommendations'),
    getProductRecommendations: jest.fn(),
  };
});

describe('fetchProductRecommendations() action creator', () => {
  let store;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockProductRecommendationsStore();
  });

  it('should create the correct actions for when the fetch product recommendations fail', async () => {
    const expectedError = new Error('fetch recommendations error');

    getProductRecommendations.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await store
      .dispatch(
        fetchProductRecommendations(mockProductId, mockRecommendationsStrategy),
      )
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getProductRecommendations).toHaveBeenCalledTimes(1);
        expect(getProductRecommendations).toHaveBeenCalledWith(
          mockProductId,
          mockRecommendationsStrategy,
          expectedConfig,
        );

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST,
              meta: { strategyName: mockRecommendationsStrategy },
            },
            {
              type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE,
              payload: { error: expectedError },
              meta: { strategyName: mockRecommendationsStrategy },
            },
          ]),
        );
      });
  });

  it('should create the correct actions for when the fetch product recommendations procedure is successful', async () => {
    getProductRecommendations.mockResolvedValueOnce(expectedPayload);

    const actionResults = store.getActions();
    const adaptedPayload = adaptProductRecommendations(expectedPayload);

    await store
      .dispatch(
        fetchProductRecommendations(
          mockProductId,
          mockRecommendationsStrategy,
          expectedConfig,
        ),
      )
      .then(clientResult => {
        expect(clientResult).toBe(expectedPayload);
      });

    expect(getProductRecommendations).toHaveBeenCalledTimes(1);
    expect(getProductRecommendations).toHaveBeenCalledWith(
      mockProductId,
      mockRecommendationsStrategy,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST,
        meta: { strategyName: mockRecommendationsStrategy },
      },
      {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS,
        payload: {
          id: adaptedPayload.id,
          values: adaptedPayload.values,
        },
        meta: {
          strategyName: mockRecommendationsStrategy,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch product recommendations success payload');
  });
});

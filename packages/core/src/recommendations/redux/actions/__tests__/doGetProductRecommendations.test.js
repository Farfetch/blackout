import { adaptProductRecommendations } from '../../../../helpers/adapters';
import { doGetProductRecommendations } from '../';
import { expectedPayload } from '../../__mocks__/getRecommendations';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const mockProductRecommendationsStore = (state = {}) =>
  mockStore(
    {
      recommendations: reducer(),
    },
    state,
  );

describe('doGetProductRecommendations() action creator', () => {
  let store;
  const getProductRecommendations = jest.fn();
  const action = doGetProductRecommendations(getProductRecommendations);
  const expectedConfig = undefined;
  const strategyName = 'a_strategy_name';
  const productId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockProductRecommendationsStore();
  });

  it('should create the correct actions for when the get product recommendations fail', async () => {
    const expectedError = new Error('get recommendations error');

    getProductRecommendations.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(productId, strategyName));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductRecommendations).toHaveBeenCalledTimes(1);
      expect(getProductRecommendations).toHaveBeenCalledWith(
        productId,
        strategyName,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_REQUEST,
            meta: { strategyName },
          },
          {
            type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_FAILURE,
            payload: { error: expectedError },
            meta: { strategyName },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get product recommendations procedure is successful', async () => {
    getProductRecommendations.mockResolvedValueOnce(expectedPayload);

    await store.dispatch(action(productId, strategyName, expectedConfig));

    const actionResults = store.getActions();
    const adaptedPayload = adaptProductRecommendations(expectedPayload);

    expect(getProductRecommendations).toHaveBeenCalledTimes(1);
    expect(getProductRecommendations).toHaveBeenCalledWith(
      productId,
      strategyName,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_REQUEST,
        meta: { strategyName },
      },
      {
        type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_SUCCESS,
        payload: {
          id: adaptedPayload.id,
          values: adaptedPayload.values,
        },
        meta: {
          strategyName,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_RECOMMENDATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('get product recommendations success payload');
  });
});

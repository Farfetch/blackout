import { fetchPromotionEvaluationItems } from '../';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const promotionEvaluationsMockStore = (state = {}) =>
  mockStore({ promotionEvaluations: reducer() }, state);

describe('fetchPromotionEvaluationItems() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getPromotionEvaluationItems = jest.fn();
  const action = fetchPromotionEvaluationItems(getPromotionEvaluationItems);

  beforeEach(() => {
    jest.clearAllMocks();
    store = promotionEvaluationsMockStore();
  });

  it('should create the correct actions for when the fetch promotion evaluation items procedure fails', async () => {
    const expectedError = new Error('Fetch promotion evaluation items error');

    getPromotionEvaluationItems.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockPromotionEvaluationId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPromotionEvaluationItems).toHaveBeenCalledTimes(1);
      expect(getPromotionEvaluationItems).toHaveBeenCalledWith(
        mockPromotionEvaluationId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch promotion evaluation items procedure is successful', async () => {
    getPromotionEvaluationItems.mockResolvedValueOnce(
      mockPromotionEvaluationsItemsResponse,
    );

    await store.dispatch(action(mockPromotionEvaluationId));

    const actionResults = store.getActions();

    expect(getPromotionEvaluationItems).toHaveBeenCalledTimes(1);
    expect(getPromotionEvaluationItems).toHaveBeenCalledWith(
      mockPromotionEvaluationId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
          },
          {
            payload: mockPromotionEvaluationsItemsResponse,
            type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
      }),
    ).toMatchSnapshot('Fetch promotion evaluation items success payload');
  });
});

import * as actionTypes from '../../actionTypes';
import { fetchPromotionEvaluationItems } from '..';
import { getPromotionEvaluationItems } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPromotionEvaluationItems: jest.fn(),
}));

const promotionEvaluationsMockStore = (state = {}) =>
  mockStore({ promotionEvaluations: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchPromotionEvaluationItems() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = promotionEvaluationsMockStore();
  });

  it('should create the correct actions for when the fetch promotion evaluation items procedure fails', async () => {
    const expectedError = new Error('Fetch promotion evaluation items error');

    getPromotionEvaluationItems.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(
        fetchPromotionEvaluationItems(mockPromotionEvaluationId),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPromotionEvaluationItems).toHaveBeenCalledTimes(1);
      expect(getPromotionEvaluationItems).toHaveBeenCalledWith(
        mockPromotionEvaluationId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: {
            promotionEvaluationId: mockPromotionEvaluationId,
          },
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
        },
        {
          meta: {
            promotionEvaluationId: mockPromotionEvaluationId,
          },
          payload: { error: expectedError },
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the fetch promotion evaluation items procedure is successful', async () => {
    getPromotionEvaluationItems.mockResolvedValueOnce(
      mockPromotionEvaluationsItemsResponse,
    );

    expect.assertions(3);

    await store.dispatch(
      fetchPromotionEvaluationItems(mockPromotionEvaluationId),
    );

    expect(getPromotionEvaluationItems).toHaveBeenCalledTimes(1);
    expect(getPromotionEvaluationItems).toHaveBeenCalledWith(
      mockPromotionEvaluationId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: {
          promotionEvaluationId: mockPromotionEvaluationId,
        },
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
      },
      {
        meta: {
          promotionEvaluationId: mockPromotionEvaluationId,
        },
        payload: { result: mockPromotionEvaluationsItemsResponse },
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
      },
    ]);
  });
});

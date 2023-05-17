import * as actionTypes from '../../actionTypes.js';
import { fetchPromotionEvaluationItems } from '../index.js';
import { getPromotionEvaluationItems } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPromotionEvaluationItems: jest.fn(),
}));

const promotionEvaluationsMockStore = (state = {}) =>
  mockStore({ promotionEvaluations: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof promotionEvaluationsMockStore>;

describe('fetchPromotionEvaluationItems() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = promotionEvaluationsMockStore();
  });

  it('should create the correct actions for when the fetch promotion evaluation items procedure fails', async () => {
    const expectedError = new Error('Fetch promotion evaluation items error');

    (getPromotionEvaluationItems as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchPromotionEvaluationItems(mockPromotionEvaluationId)(
          store.dispatch,
        ),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch promotion evaluation items procedure is successful', async () => {
    (getPromotionEvaluationItems as jest.Mock).mockResolvedValueOnce(
      mockPromotionEvaluationsItemsResponse,
    );

    await fetchPromotionEvaluationItems(mockPromotionEvaluationId)(
      store.dispatch,
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

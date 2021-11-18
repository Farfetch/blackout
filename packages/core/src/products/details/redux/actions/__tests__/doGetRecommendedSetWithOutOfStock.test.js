import { doGetRecommendedSetWithOutOfStock } from '../';
import { mockRecommendedSet, mockSetId } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetRecommendedSetWithOutOfStock() action creator', () => {
  let store;
  const getRecommendedSetWithOutOfStock = jest.fn();
  const action = doGetRecommendedSetWithOutOfStock(
    getRecommendedSetWithOutOfStock,
  );
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore();
  });

  it('should create the correct actions for when the get recommended set with out of stock procedure fails', async () => {
    const expectedError = new Error(
      'Get recommended set with out of stock error',
    );

    getRecommendedSetWithOutOfStock.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSetId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getRecommendedSetWithOutOfStock).toHaveBeenCalledTimes(1);
      expect(getRecommendedSetWithOutOfStock).toHaveBeenCalledWith(
        mockSetId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { recommendedSetId: mockSetId },
          type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST,
        },
        {
          payload: {
            error: expectedError,
            recommendedSetId: mockSetId,
          },
          type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get recommended set with out of stock procedure is successful', async () => {
    getRecommendedSetWithOutOfStock.mockResolvedValueOnce(mockRecommendedSet);

    await store.dispatch(action(mockSetId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getRecommendedSetWithOutOfStock).toHaveBeenCalledTimes(1);
    expect(getRecommendedSetWithOutOfStock).toHaveBeenCalledWith(
      mockSetId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        payload: { recommendedSetId: mockSetId },
        type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST,
      },
      {
        payload: {
          entities: {
            recommendedSetsWithOutOfStock: { [mockSetId]: mockRecommendedSet },
          },
          result: mockSetId,
          recommendedSetId: mockSetId,
        },
        type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS,
      }),
    ).toMatchSnapshot('Get recommended set with out of stock success payload');
  });
});

import { doGetRecommendedSet } from '../';
import {
  mockProduct,
  mockProductId,
  mockSet,
  mockSetId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state, mockMiddlewares);
const productDetailsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetRecommendedSet() action creator', () => {
  let store;
  const getRecommendedSet = jest.fn();
  const action = doGetRecommendedSet(getRecommendedSet);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  const newState = {
    entities: {
      products: {
        [mockProductId]: mockProduct,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = productDetailsMockStore(newState);
  });

  it('should create the correct actions for when the get recommended set procedure fails', async () => {
    const expectedError = new Error('Get recommended set error');

    getRecommendedSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSetId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getRecommendedSet).toHaveBeenCalledTimes(1);
      expect(getRecommendedSet).toHaveBeenCalledWith(
        mockSetId,
        {},
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { recommendedSetId: mockSetId },
          type: actionTypes.GET_RECOMMENDED_SET_REQUEST,
        },
        {
          payload: {
            error: expectedError,
            recommendedSetId: mockSetId,
          },
          type: actionTypes.GET_RECOMMENDED_SET_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product recommended set procedure is successful', async () => {
    getRecommendedSet.mockResolvedValueOnce(mockSet);

    await store.dispatch(action(mockSetId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getRecommendedSet).toHaveBeenCalledTimes(1);
    expect(getRecommendedSet).toHaveBeenCalledWith(
      mockSetId,
      {},
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        payload: { recommendedSetId: mockSetId },
        type: actionTypes.GET_RECOMMENDED_SET_REQUEST,
      },
      {
        payload: expect.any(Object),
        type: actionTypes.GET_RECOMMENDED_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_RECOMMENDED_SET_SUCCESS,
      }),
    ).toMatchSnapshot('Get product recommended set success payload');
  });

  it('should create the correct actions for when the get product recommended set procedure is successful without receiving options', async () => {
    store = productDetailsMockStoreWithoutMiddlewares(newState);
    getRecommendedSet.mockResolvedValueOnce(mockSet);

    await store.dispatch(action(mockSetId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getRecommendedSet).toHaveBeenCalledTimes(1);
    expect(getRecommendedSet).toHaveBeenCalledWith(
      mockSetId,
      {},
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        payload: { recommendedSetId: mockSetId },
        type: actionTypes.GET_RECOMMENDED_SET_REQUEST,
      },
      {
        payload: expect.any(Object),
        type: actionTypes.GET_RECOMMENDED_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_RECOMMENDED_SET_SUCCESS,
      }),
    ).toMatchSnapshot(
      'Get product recommended set success payload without receiving options',
    );
  });
});

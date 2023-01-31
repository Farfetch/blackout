import { doGetCategoriesTop } from '../';
import { mockStore } from '../../../../../tests';
import { mockTopCategories } from 'tests/__fixtures__/categories';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: reducer() }, state);

describe('doGetCategoriesTop() action creator', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const expectedConfig = undefined;
  const getCategoriesTop = jest.fn();
  const action = doGetCategoriesTop(getCategoriesTop);

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should create the correct actions in case the get top categories procedure fails', async () => {
    const expectedError = new Error('get top categories error');

    getCategoriesTop.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCategoriesTop).toHaveBeenCalledTimes(1);
      expect(getCategoriesTop).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_CATEGORIES_TOP_REQUEST },
          {
            type: actionTypes.GET_CATEGORIES_TOP_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions in case the get top categories procedure is successful', async () => {
    getCategoriesTop.mockResolvedValueOnce(mockTopCategories);
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCategoriesTop).toHaveBeenCalledTimes(1);
    expect(getCategoriesTop).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toEqual(
      expect.arrayContaining([
        { type: actionTypes.GET_CATEGORIES_TOP_REQUEST },
        {
          payload: expect.any(Object),
          type: actionTypes.GET_CATEGORIES_TOP_SUCCESS,
        },
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_CATEGORIES_TOP_SUCCESS,
      }),
    ).toMatchSnapshot('Get categories top success payload');
  });
});

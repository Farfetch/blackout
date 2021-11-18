import { doGetCategories } from '../';
import { mockCategories } from 'tests/__fixtures__/categories';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: reducer() }, state);

describe('doGetCategories() action creator', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const expectedConfig = undefined;
  const getCategories = jest.fn();
  const action = doGetCategories(getCategories);

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should create the correct actions in case the get categories procedure fails', async () => {
    const expectedError = new Error('get categories error');

    getCategories.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCategories).toHaveBeenCalledTimes(1);
      expect(getCategories).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_CATEGORIES_REQUEST },
          {
            type: actionTypes.GET_CATEGORIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions in case the get categories procedure is successful', async () => {
    getCategories.mockResolvedValueOnce(mockCategories);

    await store.dispatch(action());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCategories).toHaveBeenCalledTimes(1);
    expect(getCategories).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toEqual(
      expect.arrayContaining([
        { type: actionTypes.GET_CATEGORIES_REQUEST },
        {
          payload: expect.any(Object),
          type: actionTypes.GET_CATEGORIES_SUCCESS,
        },
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get categories success payload');
  });
});

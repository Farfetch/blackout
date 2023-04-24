import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer/categories.js';
import { mockStore } from '../../../../tests/index.js';
import { resetCategories } from '../index.js';

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: INITIAL_STATE }, state);

describe('resetCategories() action creator', () => {
  let store: ReturnType<typeof buildCategoriesMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetCategories()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      {
        type: actionTypes.RESET_CATEGORIES_STATE,
      },
    ]);
  });
});

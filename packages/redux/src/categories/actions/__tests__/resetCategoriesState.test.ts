import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer/categories';
import { mockStore } from '../../../../tests';
import { resetCategoriesState } from '..';

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: INITIAL_STATE }, state);

describe('resetCategoriesState() action creator', () => {
  let store: ReturnType<typeof buildCategoriesMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetCategoriesState()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      {
        type: actionTypes.RESET_CATEGORIES_STATE,
      },
    ]);
  });
});

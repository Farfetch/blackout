import { mockStore } from '../../../../../tests';
import { reset } from '../';
import reducer, { actionTypes } from '../../';

const buildCategoriesMockStore = (state = {}) =>
  mockStore({ categories: reducer() }, state);

describe('reset() action creator', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildCategoriesMockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(reset());

    expect(store.getActions()).toMatchObject([
      {
        type: actionTypes.RESET_CATEGORIES,
      },
    ]);
  });
});

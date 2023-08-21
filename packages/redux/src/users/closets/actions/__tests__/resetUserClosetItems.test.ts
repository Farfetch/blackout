import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { resetUserClosetItems } from '../index.js';

const closetsMockStore = (state = {}) =>
  mockStore({ closets: INITIAL_STATE }, state);
let store: ReturnType<typeof closetsMockStore>;

describe('resetUserClosetItems() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = closetsMockStore();
  });

  it('should dispatch the correct action for when the reset user closet items is called', async () => {
    await resetUserClosetItems()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_USER_CLOSET_ITEMS_STATE },
    ]);
  });
});

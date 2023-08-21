import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { resetUserClosets } from '../index.js';

const closetsMockStore = (state = {}) =>
  mockStore({ closets: INITIAL_STATE }, state);
let store: ReturnType<typeof closetsMockStore>;

describe('resetUserClosets() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = closetsMockStore();
  });

  it('should dispatch the correct action for when the reset user closets is called', async () => {
    await resetUserClosets()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_USER_CLOSETS },
    ]);
  });
});

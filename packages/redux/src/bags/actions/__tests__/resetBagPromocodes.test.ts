import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetBagPromocodes } from '../index.js';

describe('resetBagPromocodes() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ bag: INITIAL_STATE }, {});
  });

  it('should dispatch the correct actions', () => {
    resetBagPromocodes()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        type: actionTypes.RESET_BAG_PROMOCODES_STATE,
      },
    ]);
  });
});

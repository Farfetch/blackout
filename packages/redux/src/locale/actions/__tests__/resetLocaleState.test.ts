import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE_LOCALE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetLocaleState } from '..';

describe('resetLocaleState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore({ bag: INITIAL_STATE_LOCALE }, {});

    resetLocaleState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_LOCALE_STATE,
      },
    ]);
  });
});

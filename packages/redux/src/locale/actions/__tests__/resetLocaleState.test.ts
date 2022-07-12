import { localeActionTypes as actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import { resetLocaleState } from '..';

describe('resetLocaleState() action creator', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetLocaleState());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_LOCALE_STATE,
      },
    ]);
  });
});

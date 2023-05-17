import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetMerchantsLocations } from '..//index.js';

const merchantsLocationsMockStore = (state = {}) =>
  mockStore({ merchantsLocations: INITIAL_STATE }, state);

describe('resetMerchantsLocations() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = merchantsLocationsMockStore();
    resetMerchantsLocations()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_MERCHANTS_LOCATIONS_STATE,
      },
    ]);
  });
});

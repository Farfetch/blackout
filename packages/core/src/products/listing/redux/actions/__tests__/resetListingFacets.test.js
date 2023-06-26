import { actionTypes } from '../..';
import { mockStore } from '../../../../../../tests';
import resetListingFacets from '../resetListingFacets';

describe('doGetListingFacets() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetListingFacets());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_LISTING_FACETS,
      },
    ]);
  });
});

import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer/configurations';
import { mockStore } from '../../../../tests';
import { resetConfigurationsState } from '..';

const buildConfigurationsMockStore = (state = {}) =>
  mockStore({ configurations: INITIAL_STATE }, state);

describe('resetConfigurationsState() action creator', () => {
  let store: ReturnType<typeof buildConfigurationsMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildConfigurationsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetConfigurationsState()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      {
        type: actionTypes.RESET_CONFIGURATIONS_STATE,
      },
    ]);
  });
});

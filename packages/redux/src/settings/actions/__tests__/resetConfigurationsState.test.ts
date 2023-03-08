import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer/configurations.js';
import { mockStore } from '../../../../tests/index.js';
import { resetConfigurationsState } from '../index.js';

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

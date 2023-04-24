import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer/configurations.js';
import { mockStore } from '../../../../tests/index.js';
import { resetConfigurations } from '../index.js';

const buildConfigurationsMockStore = (state = {}) =>
  mockStore({ configurations: INITIAL_STATE }, state);

describe('resetConfigurations() action creator', () => {
  let store: ReturnType<typeof buildConfigurationsMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = buildConfigurationsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetConfigurations()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      {
        type: actionTypes.RESET_CONFIGURATIONS_STATE,
      },
    ]);
  });
});

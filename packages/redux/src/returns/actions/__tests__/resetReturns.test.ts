import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetReturns } from '../index.js';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('resetReturns() action creator', () => {
  let store: ReturnType<typeof returnsMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should reset the returns area including the entities', async () => {
    await resetReturns(true)(store.dispatch);

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { resetEntities: true },
          type: actionTypes.RESET_RETURNS,
        },
      ]),
    );
  });

  it('should reset the returns area excluding the entities', async () => {
    await resetReturns(false)(store.dispatch);

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { resetEntities: false },
          type: actionTypes.RESET_RETURNS,
        },
      ]),
    );
  });

  it('should reset the returns area excluding the entities by default', async () => {
    await resetReturns()(store.dispatch);

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { resetEntities: false },
          type: actionTypes.RESET_RETURNS,
        },
      ]),
    );
  });
});

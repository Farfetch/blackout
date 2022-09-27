import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetReturns } from '..';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('resetReturns() action creator', () => {
  let store: ReturnType<typeof returnsMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should reset the returns area including the entities', async () => {
    expect.assertions(1);

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
    expect.assertions(1);

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
    expect.assertions(1);

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

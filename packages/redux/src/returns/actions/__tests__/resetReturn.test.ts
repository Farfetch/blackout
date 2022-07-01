import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetReturn } from '..';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('resetReturn() action creator', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should reset the returns area including the entities', async () => {
    expect.assertions(1);

    await store.dispatch(resetReturn(true));

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { resetEntities: true },
          type: actionTypes.RESET_RETURN,
        },
      ]),
    );
  });

  it('should reset the returns area exluding the entities', async () => {
    expect.assertions(1);

    await store.dispatch(resetReturn(false));

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { resetEntities: false },
          type: actionTypes.RESET_RETURN,
        },
      ]),
    );
  });
});

import { mockStore } from '../../../../tests';
import doResetReturn from '../../actions/doResetReturn';
import reducer, { actionTypes } from '../../';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('doUpdateReturn() action creator', () => {
  let store;

  const action = doResetReturn;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should reset the returns area including the entities', async () => {
    expect.assertions(1);

    await store.dispatch(action(true));

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

    await store.dispatch(action(false));

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

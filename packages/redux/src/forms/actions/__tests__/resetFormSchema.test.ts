import { mockStore } from '../../../../tests';
import { resetFormSchema } from '../';
import reducer, { actionTypes } from '../../';

let store: ReturnType<typeof mockStore>;
const randomAction = { type: 'this_is_a_random_action' };

beforeEach(jest.clearAllMocks);

describe('reset action', () => {
  it('should dispatch the correct action type for forms schemas', () => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
    resetFormSchema()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SCHEMAS,
      },
    ]);
  });
});

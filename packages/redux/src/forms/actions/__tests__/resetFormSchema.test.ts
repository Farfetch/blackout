import { formsActionTypes, formsReducer } from '../../';
import { mockStore } from '../../../../tests';
import { resetFormSchema } from '../';

let store: ReturnType<typeof mockStore>;
const randomAction = { type: 'this_is_a_random_action' };

beforeEach(jest.clearAllMocks);

describe('reset action', () => {
  it('should dispatch the correct action type for forms schemas', () => {
    store = mockStore(
      { subscriptions: formsReducer(undefined, randomAction) },
      {},
    );
    resetFormSchema()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: formsActionTypes.RESET_FORM_SCHEMAS,
      },
    ]);
  });
});

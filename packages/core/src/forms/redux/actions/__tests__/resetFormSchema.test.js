import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { resetFormSchema } from '../';

let store;

beforeEach(jest.clearAllMocks);

describe('reset action', () => {
  it('should dispatch the correct action type for forms schemas', () => {
    store = mockStore();
    store.dispatch(resetFormSchema());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SCHEMAS,
      },
    ]);
  });
});

import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetReturnState } from '..';
import { returnId } from 'tests/__fixtures__/returns';

describe('resetReturnState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    const returnsToReset = [returnId];

    resetReturnState(returnsToReset)(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: returnsToReset,
        type: actionTypes.RESET_RETURN_STATE,
      },
    ]);
  });
});

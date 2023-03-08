import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetReturnState } from '../index.js';
import { returnId } from 'tests/__fixtures__/returns/index.mjs';

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

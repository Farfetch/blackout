import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { resetReturn } from '../index.js';
import { returnId } from 'tests/__fixtures__/returns/index.mjs';

describe('resetReturn() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    const returnsToReset = [returnId];

    resetReturn(returnsToReset)(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: returnsToReset,
        type: actionTypes.RESET_RETURN_STATE,
      },
    ]);
  });
});

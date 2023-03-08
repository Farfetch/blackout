import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE_CONTENT } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetContents } from '../index.js';

describe('reset contents action', () => {
  it('should dispatch the correct action type', () => {
    const store = mockStore({ contents: INITIAL_STATE_CONTENT }, {});

    resetContents()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CONTENTS,
      },
    ]);
  });
});

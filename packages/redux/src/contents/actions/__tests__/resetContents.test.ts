import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetContents } from '..';

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

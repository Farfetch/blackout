import { contentsActionTypes as actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import { resetContents } from '..';

describe('reset contents action', () => {
  it('should dispatch the correct action type', () => {
    const store = mockStore();

    store.dispatch(resetContents());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CONTENTS,
      },
    ]);
  });
});

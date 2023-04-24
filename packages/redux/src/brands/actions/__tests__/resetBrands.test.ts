import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetBrands } from '../index.js';

describe('resetBrands() action', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ brands: INITIAL_STATE }, {});

    resetBrands()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_BRANDS_STATE,
      },
    ]);
  });
});

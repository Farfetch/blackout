import {
  ADD_BAG_ITEM_SUCCESS,
  FETCH_BAG_SUCCESS,
  REMOVE_BAG_ITEM_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS,
} from '../../actionTypes.js';
import {
  fetchBagOperation,
  resetBagOperationsEntities,
  resetBagState,
} from '../../actions/index.js';
import { fetchBagOperationsOnBagRequestSuccess } from '..//index.js';
import {
  mockBagId,
  mockBagOperationId,
  mockState,
} from 'tests/__fixtures__/bags/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  fetchBagOperation: jest.fn(() => ({ type: 'foo' })),
  resetBagState: jest.fn(() => ({ type: 'foo' })),
  resetBagOperationsEntities: jest.fn(() => ({ type: 'foo' })),
}));

describe('fetchBagOperationsOnBagRequestSuccess', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should do nothing if the action is not a bag request', () => {
    const store = mockStore(null, {}, [fetchBagOperationsOnBagRequestSuccess]);

    store.dispatch({ type: 'foo' });

    expect(fetchBagOperation).not.toHaveBeenCalled();
  });

  it.each([
    ADD_BAG_ITEM_SUCCESS,
    REMOVE_BAG_ITEM_SUCCESS,
    FETCH_BAG_SUCCESS,
    UPDATE_BAG_ITEM_SUCCESS,
  ])('should intercept %s, reset the state and get operations', actionType => {
    const store = mockStore(null, mockState, [
      fetchBagOperationsOnBagRequestSuccess,
    ]);

    store.dispatch({
      type: actionType,
    });

    expect(resetBagState).toHaveBeenCalledWith(['bagOperations']);
    expect(resetBagOperationsEntities).toHaveBeenCalled();
    expect(fetchBagOperation).toHaveBeenCalledWith(
      mockBagId,
      mockBagOperationId,
    );
  });
});

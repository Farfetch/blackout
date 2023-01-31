import {
  ADD_ITEM_TO_BAG_SUCCESS,
  DELETE_BAG_ITEM_SUCCESS,
  GET_BAG_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS,
} from '../../actionTypes';
import {
  doGetBagOperation,
  resetBagOperationsEntities,
  resetState,
} from '../../actions';
import { getOperationsOnBagRequestSuccess } from '../';
import {
  mockBagId,
  mockBagOperationId,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../../tests';

const mockGetOperation = jest.fn(() => ({ type: 'foo' }));
jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  doGetBagOperation: jest.fn(() => mockGetOperation),
  resetState: jest.fn(() => ({ type: 'foo' })),
  resetBagOperationsEntities: jest.fn(() => ({ type: 'foo' })),
}));

describe('getOperationsOnBagRequestSuccess', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should do nothing if the action is not a bag request', () => {
    const store = mockStore(null, {}, [getOperationsOnBagRequestSuccess]);

    store.dispatch({ type: 'foo' });

    expect(doGetBagOperation).not.toHaveBeenCalled();
  });

  it.each([
    ADD_ITEM_TO_BAG_SUCCESS,
    DELETE_BAG_ITEM_SUCCESS,
    GET_BAG_SUCCESS,
    UPDATE_BAG_ITEM_SUCCESS,
  ])('should intercept %s, reset the state and get operations', actionType => {
    const store = mockStore(null, mockState, [
      getOperationsOnBagRequestSuccess,
    ]);

    store.dispatch({
      type: actionType,
    });

    expect(resetState).toHaveBeenCalledWith(['bagOperations']);
    expect(resetBagOperationsEntities).toHaveBeenCalled();
    expect(doGetBagOperation).toHaveBeenCalled();
    expect(mockGetOperation).toHaveBeenCalledWith(
      mockBagId,
      mockBagOperationId,
    );
  });
});

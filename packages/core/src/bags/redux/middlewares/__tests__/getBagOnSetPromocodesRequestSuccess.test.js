import { doGetBag } from '../../actions';
import { getBagOnSetPromocodesRequestSuccess } from '..';
import { mockBagId, mockState } from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../../tests';
import { SET_BAG_PROMOCODES_SUCCESS } from '../../actionTypes';

const mockGetBag = jest.fn(() => ({ type: 'foo' }));
jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  doGetBag: jest.fn(() => mockGetBag),
}));

describe('getBagOnSetPromocodesRequestSuccess', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should do nothing if the action is not SET_BAG_PROMOCODES_SUCCESS', () => {
    const store = mockStore(null, {}, [getBagOnSetPromocodesRequestSuccess]);

    store.dispatch({ type: 'foo' });

    expect(doGetBag).not.toHaveBeenCalled();
  });

  it('should intercept SET_BAG_PROMOCODES_SUCCESS and get bag', () => {
    const store = mockStore(null, mockState, [
      getBagOnSetPromocodesRequestSuccess,
    ]);

    store.dispatch({
      type: SET_BAG_PROMOCODES_SUCCESS,
    });

    expect(mockGetBag).toHaveBeenCalledWith(mockBagId);
  });
});

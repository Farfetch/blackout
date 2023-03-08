import { fetchBag } from '../../actions/index.js';
import { fetchBagOnSetPromocodesRequestSuccess } from '../index.js';
import { mockBagId, mockState } from 'tests/__fixtures__/bags/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { SET_BAG_PROMOCODES_SUCCESS } from '../../actionTypes.js';
import thunk from 'redux-thunk';
import type { BagsState } from '../../types/index.js';

const getOptions = () => ({ productImgQueryParam: '?c=2' });
const mockMiddlewares = [
  fetchBagOnSetPromocodesRequestSuccess,
  thunk.withExtraArgument({
    getOptions,
  }),
];

jest.mock('../../actions', () => ({
  ...jest.requireActual('../../actions'),
  fetchBag: jest.fn(() => ({ type: 'foo' })),
}));

describe('fetchBagOnSetPromocodesRequestSuccess', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should do nothing if the action is not a bag request', () => {
    const store = mockStore(null, {}, mockMiddlewares);

    store.dispatch({ type: 'foo' });

    expect(fetchBag).not.toHaveBeenCalled();
  });

  describe('when SET_BAG_PROMOCODES_SUCCESS action is intercepted', () => {
    it('should do nothing if there is no bag id in the state', () => {
      const store = mockStore(null, { bag: {} as BagsState }, mockMiddlewares);

      store.dispatch({
        type: SET_BAG_PROMOCODES_SUCCESS,
      });

      expect(fetchBag).not.toHaveBeenCalled();
    });

    it('should call fetch bag action if there is a bag id in the state', () => {
      const store = mockStore(null, mockState, mockMiddlewares);

      store.dispatch({
        type: SET_BAG_PROMOCODES_SUCCESS,
      });

      expect(fetchBag).toHaveBeenCalledWith(mockBagId);
    });
  });
});

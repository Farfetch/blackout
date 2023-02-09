import { doSetBagPromocodes } from '..';
import {
  mockBagId,
  mockBagPromocodesData,
  mockBagPromocodesResponse,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: reducer() }, state, mockMiddlewares);
const expectedConfig = undefined;

describe('doSetBagPromocodes() action creator', () => {
  let store;

  const setBagPromocodes = jest.fn();
  const action = doSetBagPromocodes(setBagPromocodes);
  const payload = {
    result: mockBagId,
    entities: {
      bagPromocodesInformation: {
        [mockBagId]: mockBagPromocodesResponse.promoCodesInformation,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    store = bagMockStore(mockState);
  });

  it('should create the correct actions for when the set bag promocodes procedure fails', async () => {
    const expectedError = new Error('set bag promocodes error');

    setBagPromocodes.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockBagPromocodesData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(setBagPromocodes).toHaveBeenCalledTimes(1);
      expect(setBagPromocodes).toHaveBeenCalledWith(
        mockBagId,
        mockBagPromocodesData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.SET_BAG_PROMOCODES_REQUEST,
          },
          {
            payload: {
              error: expectedError,
            },
            type: actionTypes.SET_BAG_PROMOCODES_FAILURE,
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set bag item procedure is successful', async () => {
    setBagPromocodes.mockResolvedValueOnce(mockBagPromocodesResponse);
    await store.dispatch(action(mockBagPromocodesData));

    const actionResults = store.getActions();

    expect(setBagPromocodes).toHaveBeenCalledTimes(1);
    expect(setBagPromocodes).toHaveBeenCalledWith(
      mockBagId,
      mockBagPromocodesData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_BAG_PROMOCODES_REQUEST },
      {
        payload,
        type: actionTypes.SET_BAG_PROMOCODES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_BAG_PROMOCODES_SUCCESS,
      }),
    ).toMatchSnapshot('set bag promocodes success payload');
  });
});

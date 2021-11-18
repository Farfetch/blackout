import {
  checkoutId,
  expectedNormalizedPayload,
  mockResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doSetPromocode from '../doSetPromocode';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

describe('doSetPromocode() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const putPromocode = jest.fn();
  const action = doSetPromocode(putPromocode);

  const data = {
    promocode: 'something',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set promocode procedure fails', async () => {
    const expectedError = new Error('set promocode error');

    putPromocode.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putPromocode).toHaveBeenCalledTimes(1);
      expect(putPromocode).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_PROMOCODE_REQUEST },
          {
            type: actionTypes.SET_PROMOCODE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set promocode procedure is successful', async () => {
    putPromocode.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(checkoutId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putPromocode).toHaveBeenCalledTimes(1);
    expect(putPromocode).toHaveBeenCalledWith(checkoutId, data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_PROMOCODE_REQUEST },
      {
        type: actionTypes.SET_PROMOCODE_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_PROMOCODE_SUCCESS,
      }),
    ).toMatchSnapshot('set promocode success payload');
  });
});

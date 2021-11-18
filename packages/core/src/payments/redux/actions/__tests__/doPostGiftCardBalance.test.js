import { mockGiftCardBalanceResponse } from '../../__fixtures__/giftCard.fixtures';
import { mockStore } from '../../../../../tests';
import doPostGiftCardBalance from '../doPostGiftCardBalance';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPostGiftCardBalance() action creator', () => {
  const postGiftCardBalance = jest.fn();
  const action = doPostGiftCardBalance(postGiftCardBalance);
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the post gift card balance procedure fails', async () => {
    const expectedError = new Error('post gift card balance error');

    postGiftCardBalance.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postGiftCardBalance).toHaveBeenCalledTimes(1);
      expect(postGiftCardBalance).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_GIFT_CARD_BALANCE_REQUEST },
          {
            type: actionTypes.POST_GIFT_CARD_BALANCE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the post gift card balance procedure is successful', async () => {
    postGiftCardBalance.mockResolvedValueOnce(mockGiftCardBalanceResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postGiftCardBalance).toHaveBeenCalledTimes(1);
    expect(postGiftCardBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_GIFT_CARD_BALANCE_REQUEST },
      {
        type: actionTypes.POST_GIFT_CARD_BALANCE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_GIFT_CARD_BALANCE_SUCCESS,
      }),
    ).toMatchSnapshot('post gift card balance success payload');
  });
});

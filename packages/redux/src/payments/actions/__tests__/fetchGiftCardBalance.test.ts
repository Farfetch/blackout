import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockGiftCardBalanceResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import { postCheckGiftCardBalance } from '@farfetch/blackout-client/payments';
import fetchGiftCardBalance from '../fetchGiftCardBalance';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  postCheckGiftCardBalance: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchGiftCardBalance() action creator', () => {
  const data = {
    something: 'something',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch gift card balance procedure fails', async () => {
    const expectedError = new Error('fetch gift card balance error');

    postCheckGiftCardBalance.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchGiftCardBalance(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postCheckGiftCardBalance).toHaveBeenCalledTimes(1);
      expect(postCheckGiftCardBalance).toHaveBeenCalledWith(
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST },
          {
            type: actionTypes.FETCH_GIFT_CARD_BALANCE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch gift card balance procedure is successful', async () => {
    postCheckGiftCardBalance.mockResolvedValueOnce(mockGiftCardBalanceResponse);
    await store.dispatch(fetchGiftCardBalance(data));

    const actionResults = store.getActions();

    expect(postCheckGiftCardBalance).toHaveBeenCalledTimes(1);
    expect(postCheckGiftCardBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST },
      {
        type: actionTypes.FETCH_GIFT_CARD_BALANCE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_GIFT_CARD_BALANCE_SUCCESS,
      }),
    ).toMatchSnapshot('fetch gift card balance success payload');
  });
});

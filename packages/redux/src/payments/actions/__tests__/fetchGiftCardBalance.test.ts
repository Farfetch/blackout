import * as actionTypes from '../../actionTypes';
import { getGiftCardBalance } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockGiftCardBalanceResponse } from 'tests/__fixtures__/payments';
import { mockStore } from '../../../../tests';
import fetchGiftCardBalance from '../fetchGiftCardBalance';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getGiftCardBalance: jest.fn(),
}));

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof paymentsMockStore>;

describe('fetchGiftCardBalance() action creator', () => {
  const data = {
    giftCardNumber: '1232211',
    giftCardCsc: '111212',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the fetch gift card balance procedure fails', async () => {
    const expectedError = new Error('fetch gift card balance error');

    (getGiftCardBalance as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchGiftCardBalance(data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getGiftCardBalance).toHaveBeenCalledTimes(1);
    expect(getGiftCardBalance).toHaveBeenCalledWith(data, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST },
        {
          type: actionTypes.FETCH_GIFT_CARD_BALANCE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch gift card balance procedure is successful', async () => {
    (getGiftCardBalance as jest.Mock).mockResolvedValueOnce(
      mockGiftCardBalanceResponse,
    );
    await fetchGiftCardBalance(data)(store.dispatch);

    const actionResults = store.getActions();

    expect(getGiftCardBalance).toHaveBeenCalledTimes(1);
    expect(getGiftCardBalance).toHaveBeenCalledWith(data, expectedConfig);
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

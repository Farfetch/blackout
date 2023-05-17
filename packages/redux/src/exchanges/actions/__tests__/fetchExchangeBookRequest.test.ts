import * as actionTypes from '../../actionTypes.js';
import {
  bookRequestId,
  exchangeId,
  responses,
} from 'tests/__fixtures__/exchanges/index.mjs';
import { fetchExchangeBookRequest } from '../index.js';
import { find } from 'lodash-es';
import { getExchangeBookRequest } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getExchangeBookRequest: jest.fn(),
}));

const exchangesMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchExchangeBookRequest() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof exchangesMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the fetch exchange book request procedure fails', async () => {
    const expectedError = new Error('fetch exchange book request error');

    (getExchangeBookRequest as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchExchangeBookRequest(
          exchangeId,
          bookRequestId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getExchangeBookRequest).toHaveBeenCalledTimes(1);
    expect(getExchangeBookRequest).toHaveBeenCalledWith(
      exchangeId,
      bookRequestId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_REQUEST },
        {
          type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch exchange book request procedure is successful', async () => {
    (getExchangeBookRequest as jest.Mock).mockResolvedValueOnce(
      responses.getExchangeBookRequest.success,
    );

    await fetchExchangeBookRequest(exchangeId, bookRequestId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getExchangeBookRequest).toHaveBeenCalledTimes(1);
    expect(getExchangeBookRequest).toHaveBeenCalledWith(
      exchangeId,
      bookRequestId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_REQUEST },
      {
        payload: responses.getExchangeBookRequest.success,
        type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('fetch exchange book request success payload');
  });
});

import {
  bookRequestId,
  exchangeId,
  responses,
} from '../../__fixtures__/exchanges.fixtures';
import { mockStore } from '../../../../../tests';
import doGetExchangeBookRequest from '../../actions/doGetExchangeBookRequest';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: reducer() }, state);

describe('doGetExchangeBookRequest() action creator', () => {
  const expectedConfig = undefined;
  let store;

  const getExchangeBookRequest = jest.fn();
  const action = doGetExchangeBookRequest(getExchangeBookRequest);

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the get exchange book request request fails', async () => {
    const expectedError = new Error('get exchange book request error');

    getExchangeBookRequest.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(exchangeId, bookRequestId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getExchangeBookRequest).toHaveBeenCalledTimes(1);
      expect(getExchangeBookRequest).toHaveBeenCalledWith(
        exchangeId,
        bookRequestId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_EXCHANGE_BOOK_REQUEST_REQUEST },
          {
            type: actionTypes.GET_EXCHANGE_BOOK_REQUEST_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get exchange book request procedure is successful', async () => {
    getExchangeBookRequest.mockResolvedValueOnce(
      responses.getExchangeBookRequest.success,
    );

    await store.dispatch(action(exchangeId, bookRequestId));

    const actionResults = store.getActions();

    expect(getExchangeBookRequest).toHaveBeenCalledTimes(1);
    expect(getExchangeBookRequest).toHaveBeenCalledWith(
      exchangeId,
      bookRequestId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_EXCHANGE_BOOK_REQUEST_REQUEST },
      {
        payload: responses.getExchangeBookRequest.success,
        type: actionTypes.GET_EXCHANGE_BOOK_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_EXCHANGE_BOOK_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('get exchange book request success payload');
  });
});

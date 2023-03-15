import * as actionTypes from '../../actionTypes.js';
import { createExchangeBookRequest } from '../index.js';
import {
  exchangeId,
  requestData,
  responses,
} from 'tests/__fixtures__/exchanges/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postExchangeBookRequest } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postExchangeBookRequest: jest.fn(),
}));

const exchangesMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('createExchangeBookRequest() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof exchangesMockStore>;
  const data = requestData.postExchangeBookRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the create exchange book request procedure fails', async () => {
    const expectedError = new Error('create exchange book request error');

    (postExchangeBookRequest as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createExchangeBookRequest(exchangeId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postExchangeBookRequest).toHaveBeenCalledTimes(1);
    expect(postExchangeBookRequest).toHaveBeenCalledWith(
      exchangeId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_REQUEST },
        {
          type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create exchange book request procedure is successful', async () => {
    (postExchangeBookRequest as jest.Mock).mockResolvedValueOnce(
      responses.postExchangeBookRequest.success,
    );

    await createExchangeBookRequest(exchangeId, data)(store.dispatch);

    const actionResults = store.getActions();

    expect(postExchangeBookRequest).toHaveBeenCalledTimes(1);
    expect(postExchangeBookRequest).toHaveBeenCalledWith(
      exchangeId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_REQUEST },
      {
        type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_SUCCESS,
      }),
    ).toMatchSnapshot('create exchange book request success payload');
  });
});

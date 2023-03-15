import * as actionTypes from '../../actionTypes.js';
import { createExchangeFilter } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postExchangeFilter } from '@farfetch/blackout-client';
import { requestData, responses } from 'tests/__fixtures__/exchanges/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postExchangeFilter: jest.fn(),
}));

const exchangesMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('createExchangeFilter() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof exchangesMockStore>;
  const data = requestData.postExchangeFilter;

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the create exchange filter procedure fails', async () => {
    const expectedError = new Error('create exchange filter error');

    (postExchangeFilter as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createExchangeFilter(data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postExchangeFilter).toHaveBeenCalledTimes(1);
    expect(postExchangeFilter).toHaveBeenCalledWith(data, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST },
        {
          type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create exchange filter procedure is successful', async () => {
    (postExchangeFilter as jest.Mock).mockResolvedValueOnce(
      responses.postExchangeFilter.success,
    );

    await createExchangeFilter(data)(store.dispatch);

    const actionResults = store.getActions();

    expect(postExchangeFilter).toHaveBeenCalledTimes(1);
    expect(postExchangeFilter).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST },
      {
        payload: responses.postExchangeFilter.success,
        type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
      }),
    ).toMatchSnapshot('create exchange filter success payload');
  });
});

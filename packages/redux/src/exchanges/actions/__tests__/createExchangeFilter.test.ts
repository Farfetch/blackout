import * as actionTypes from '../../actionTypes.js';
import { createExchangeFilter } from '../index.js';
import {
  expectedExchangeFiltersNormalizedPayload,
  orderItemUuid,
  requestData,
  responses,
} from 'tests/__fixtures__/exchanges/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postExchangeFilter } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postExchangeFilter: jest.fn(),
}));

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: INITIAL_STATE }, state);

describe('createExchangeFilter() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof exchangesMockStore>;
  const data = requestData.postExchangeFilter;
  const dataWithoutOrderItemUuid =
    requestData.postExchangeFilterWithoutOrderItemUuid;

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
        {
          type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST,
          meta: { orderItemUuid },
        },
        {
          type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
          meta: { orderItemUuid },
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
      {
        type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST,
        meta: { orderItemUuid },
      },
      {
        payload: expectedExchangeFiltersNormalizedPayload,
        meta: { orderItemUuid },
        type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
      }),
    ).toMatchSnapshot('create exchange filter success payload');
  });

  it('should create the correct actions when the orderItemUuid is not provided and the procedure fails', async () => {
    const expectedError = new Error('No orderItemUuid found');

    (postExchangeFilter as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        // @ts-expect-error
        await createExchangeFilter(dataWithoutOrderItemUuid)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postExchangeFilter).toHaveBeenCalledTimes(0);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
          meta: { orderItemUuid: '' },
          payload: { error: expectedError },
        },
      ]),
    );
  });
});

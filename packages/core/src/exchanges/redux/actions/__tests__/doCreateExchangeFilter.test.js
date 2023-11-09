import {
  expectedExchangeFiltersNormalizedPayload,
  orderItemUuid,
  requestData,
  responses,
} from '../../__fixtures__/exchanges.fixtures';
import { mockStore } from '../../../../../tests';
import doCreateExchangeFilter from '../../actions/doCreateExchangeFilter';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: reducer() }, state);

describe('doCreateExchangeFilter() action creator', () => {
  const expectedConfig = undefined;
  let store;

  const postExchangeFilter = jest.fn();
  const action = doCreateExchangeFilter(postExchangeFilter);
  const data = { ...requestData.postExchangeFilter };
  const dataWithoutOrderItemUuid =
    requestData.postExchangeFilterWithoutOrderItemUuid;

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the create exchange filter request fails', async () => {
    const expectedError = new Error('create exchange filter error');

    postExchangeFilter.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the create exchange filter procedure is successful', async () => {
    postExchangeFilter.mockResolvedValueOnce(
      responses.postExchangeFilter.success,
    );

    await store.dispatch(action(data));

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
        meta: { orderItemUuid },
      }),
    ).toMatchSnapshot('create exchange filter success payload');
  });

  it('should create the correct actions when the orderItemUuid is not provided and the procedure fails', async () => {
    const expectedError = new Error('No orderItemUuid found');

    postExchangeFilter.mockRejectedValueOnce(expectedError);

    try {
      await store.dispatch(action(dataWithoutOrderItemUuid));
    } catch (error) {
      expect(error).toStrictEqual(expectedError);
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
    }
  });
});

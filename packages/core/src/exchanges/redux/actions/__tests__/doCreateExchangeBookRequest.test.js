import { mockStore } from '../../../../../tests';
import { requestData, responses } from '../../__fixtures__/exchanges.fixtures';
import doCreateExchangeBookRequest from '../../actions/doCreateExchangeBookRequest';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: reducer() }, state);

describe('doCreateExchangeBookRequest() action creator', () => {
  const expectedConfig = undefined;
  let store;

  const postExchangeBookRequest = jest.fn();
  const action = doCreateExchangeBookRequest(postExchangeBookRequest);
  const exchangeId = '000000-0000';
  const data = { ...requestData.postExchangeBookRequest };

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the create exchange book request request fails', async () => {
    const expectedError = new Error('create exchange book request error');

    postExchangeBookRequest.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(exchangeId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the create exchange book request procedure is successful', async () => {
    postExchangeBookRequest.mockResolvedValueOnce(
      responses.postExchangeBookRequest.success,
    );

    await store.dispatch(action(exchangeId, data));

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

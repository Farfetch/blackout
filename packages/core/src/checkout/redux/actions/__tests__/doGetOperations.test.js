import { checkoutId } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOperations from '../doGetOperations';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetOperations() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const query = {
    page: 1,
    pageSize: 60,
  };
  const getOperations = jest.fn();
  const action = doGetOperations(getOperations);
  const mockResponse = {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        createdDate: '2022-02-16T11:24:12.234Z',
        changes: [
          {
            changeType: 'ItemIsUnavailable',
            productId: 0,
            variantId: '00000000-0000-0000-0000-000000000000',
          },
        ],
      },
    ],
  };
  const expectedOperationsResult = mockResponse;
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the get operations procedure fails', async () => {
    const expectedError = new Error('get operations error');

    getOperations.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOperations).toHaveBeenCalledTimes(1);
      expect(getOperations).toHaveBeenCalledWith(
        checkoutId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_OPERATIONS_REQUEST },
          {
            type: actionTypes.GET_OPERATIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get operations procedure is successful', async () => {
    getOperations.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(checkoutId, query));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getOperations).toHaveBeenCalledTimes(1);
    expect(getOperations).toHaveBeenCalledWith(
      checkoutId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_OPERATIONS_REQUEST },
      {
        type: actionTypes.GET_OPERATIONS_SUCCESS,
        payload: expectedOperationsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_OPERATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('get operations success payload');
  });
});

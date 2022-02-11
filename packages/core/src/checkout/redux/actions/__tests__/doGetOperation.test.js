import { checkoutId } from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetOperation from '../doGetOperation';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetOperation() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const getOperation = jest.fn();
  const action = doGetOperation(getOperation);
  const operationId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  const mockResponse = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    createdDate: '2022-02-18T11:27:15.858Z',
    changes: [
      {
        changeType: 'ItemIsUnavailable',
        productId: 0,
        variantId: '00000000-0000-0000-0000-000000000000',
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

  it('should create the correct actions for when the get operation procedure fails', async () => {
    const expectedError = new Error('get operation error');

    getOperation.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, operationId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getOperation).toHaveBeenCalledTimes(1);
      expect(getOperation).toHaveBeenCalledWith(
        checkoutId,
        operationId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_OPERATION_REQUEST },
          {
            type: actionTypes.GET_OPERATION_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get operation procedure is successful', async () => {
    getOperation.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(checkoutId, operationId));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getOperation).toHaveBeenCalledTimes(1);
    expect(getOperation).toHaveBeenCalledWith(
      checkoutId,
      operationId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_OPERATION_REQUEST },
      {
        type: actionTypes.GET_OPERATION_SUCCESS,
        payload: expectedOperationsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_OPERATION_SUCCESS,
      }),
    ).toMatchSnapshot('get operation success payload');
  });
});

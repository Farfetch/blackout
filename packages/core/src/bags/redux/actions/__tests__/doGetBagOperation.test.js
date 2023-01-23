import { doGetBagOperation } from '../';
import {
  mockBagId,
  mockBagOperation,
  mockBagOperationId,
  mockBagOperationsNormalizedPayload,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const bagOperationMockStore = (state = {}) =>
  mockStore({ bagOperations: reducer() }, state);

describe('doGetBagOperation()', () => {
  let store;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getBagOperation = jest.fn();
  const action = doGetBagOperation(getBagOperation);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = bagOperationMockStore({
      bagOperations: { id: mockBagOperationId },
    });
  });

  it('should create the correct actions for when the get bagOperation procedure fails', async () => {
    const expectedError = new Error('get bagOperation error');

    getBagOperation.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockBagId, mockBagOperationId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getBagOperation).toHaveBeenCalledTimes(1);
      expect(getBagOperation).toHaveBeenCalledWith(
        mockBagId,
        mockBagOperationId,
        expectedConfig,
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_BAG_OPERATION_REQUEST,
            payload: { bagOperationId: mockBagOperationId },
          },
          {
            type: actionTypes.GET_BAG_OPERATION_FAILURE,
            payload: {
              error: expectedError,
              bagOperationId: mockBagOperationId,
            },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get bagOperation procedure is successful', async () => {
    getBagOperation.mockResolvedValueOnce(mockBagOperation);
    await store.dispatch(action(mockBagId, mockBagOperationId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBagOperation).toHaveBeenCalledTimes(1);
    expect(getBagOperation).toHaveBeenCalledWith(
      mockBagId,
      mockBagOperationId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.GET_BAG_OPERATION_REQUEST,
        payload: { bagOperationId: mockBagOperationId },
      },
      {
        payload: mockBagOperationsNormalizedPayload,
        type: actionTypes.GET_BAG_OPERATION_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_BAG_OPERATION_SUCCESS }),
    ).toMatchSnapshot('get bagOperation success payload');
  });
});

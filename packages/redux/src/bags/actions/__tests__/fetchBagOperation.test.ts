import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchBagOperation } from '../';
import { getBagOperation } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBagId,
  mockBagOperation,
  mockBagOperationId,
  mockBagOperationsNormalizedPayload,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getBagOperation: jest.fn(),
}));

const bagOperationMockStore = (state = {}) =>
  mockStore({ bagOperations: INITIAL_STATE.bagOperations }, state);
let store: ReturnType<typeof bagOperationMockStore>;

describe('fetchBagOperation()', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = bagOperationMockStore({
      bagOperations: { id: mockBagOperationId },
    });
  });

  it('should create the correct actions for when the get bagOperation procedure fails', async () => {
    const expectedError = new Error('get bagOperation error');

    (getBagOperation as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchBagOperation(mockBagId, mockBagOperationId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getBagOperation).toHaveBeenCalledTimes(1);
    expect(getBagOperation).toHaveBeenCalledWith(
      mockBagId,
      mockBagOperationId,
      expectedConfig,
    );

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_BAG_OPERATION_REQUEST,
          meta: { bagOperationId: mockBagOperationId },
        },
        {
          type: actionTypes.FETCH_BAG_OPERATION_FAILURE,
          payload: {
            error: expectedError,
          },
          meta: {
            bagOperationId: mockBagOperationId,
          },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get bagOperation procedure is successful', async () => {
    (getBagOperation as jest.Mock).mockResolvedValueOnce(mockBagOperation);
    await fetchBagOperation(mockBagId, mockBagOperationId)(store.dispatch);

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
        type: actionTypes.FETCH_BAG_OPERATION_REQUEST,
        meta: { bagOperationId: mockBagOperationId },
      },
      {
        payload: mockBagOperationsNormalizedPayload,
        type: actionTypes.FETCH_BAG_OPERATION_SUCCESS,
        meta: { bagOperationId: mockBagOperationId },
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_BAG_OPERATION_SUCCESS }),
    ).toMatchSnapshot('get bagOperation success payload');
  });
});

import {
  expectedCreditMovementsNormalizedPayload,
  mockGetCreditMovementsResponse,
} from '../../__fixtures__/creditMovements.fixtures';
import { mockStore } from '../../../../../tests';
import doGetCreditMovements from '../doGetCreditMovements';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetCreditMovements action creator', () => {
  const getCreditMovements = jest.fn();
  const action = doGetCreditMovements(getCreditMovements);
  const id = '123456';
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get credit movements procedure fails', async () => {
    const expectedError = new Error('get credit movements error');

    getCreditMovements.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(id, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCreditMovements).toHaveBeenCalledTimes(1);
      expect(getCreditMovements).toHaveBeenCalledWith(
        id,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_CREDIT_MOVEMENTS_REQUEST },
          {
            type: actionTypes.GET_CREDIT_MOVEMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get credit movements procedure is successful', async () => {
    getCreditMovements.mockResolvedValueOnce(mockGetCreditMovementsResponse);

    await store.dispatch(action(id, query));

    const actionResults = store.getActions();

    expect(getCreditMovements).toHaveBeenCalledTimes(1);
    expect(getCreditMovements).toHaveBeenCalledWith(id, query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_CREDIT_MOVEMENTS_REQUEST },
      {
        payload: expectedCreditMovementsNormalizedPayload,
        type: actionTypes.GET_CREDIT_MOVEMENTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CREDIT_MOVEMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('get credit movements success payload');
  });
});

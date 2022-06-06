import { actionTypes } from '../..';
import { fetchReturnReferences } from '..';
import { getReturnReferences } from '@farfetch/blackout-client/returns';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  getReturnReferences: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchReturnReferences() action creator', () => {
  const query = {};
  const expectedConfig = undefined;
  let store;
  const name = 'ReturnNote';
  const returnId = '5926969';

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get references procedure fails', async () => {
    const expectedError = new Error('get references error');

    getReturnReferences.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchReturnReferences(returnId, name, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getReturnReferences).toHaveBeenCalledTimes(1);
      expect(getReturnReferences).toHaveBeenCalledWith(
        returnId,
        name,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_RETURN_REFERENCES_REQUEST },
          {
            type: actionTypes.FETCH_RETURN_REFERENCES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get references procedure is successful', async () => {
    getReturnReferences.mockResolvedValueOnce({});
    await store.dispatch(fetchReturnReferences(returnId, name, query));

    const actionResults = store.getActions();

    expect(getReturnReferences).toHaveBeenCalledTimes(1);
    expect(getReturnReferences).toHaveBeenCalledWith(
      returnId,
      name,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_REFERENCES_REQUEST },
      {
        type: actionTypes.FETCH_RETURN_REFERENCES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RETURN_REFERENCES_SUCCESS,
      }),
    ).toMatchSnapshot('update return success payload');
  });
});

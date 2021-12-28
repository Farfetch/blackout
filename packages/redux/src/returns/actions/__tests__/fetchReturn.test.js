import * as normalizr from 'normalizr';
import { mockStore } from '../../../../tests';
import {
  responses,
  returnsNormalizedPayload,
} from 'tests/__fixtures__/returns';
import fetchReturn from '../../actions/fetchReturn';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('fetchReturn action creator', () => {
  const query = {};
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  let store;

  const getReturn = jest.fn();
  const action = fetchReturn(getReturn);
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get return procedure fails', async () => {
    const expectedError = new Error('get return error');

    getReturn.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(returnId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getReturn).toHaveBeenCalledTimes(1);
      expect(getReturn).toHaveBeenCalledWith(returnId, query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_RETURN_REQUEST },
          {
            type: actionTypes.FETCH_RETURN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get return procedure is successful', async () => {
    getReturn.mockResolvedValueOnce(responses.get.success);
    await store.dispatch(action(returnId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getReturn).toHaveBeenCalledTimes(1);
    expect(getReturn).toHaveBeenCalledWith(returnId, query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_REQUEST },
      {
        type: actionTypes.FETCH_RETURN_SUCCESS,
        payload: returnsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_RETURN_SUCCESS }),
    ).toMatchSnapshot('get return success payload');
  });
});

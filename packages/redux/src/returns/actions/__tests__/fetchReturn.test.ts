import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import { fetchReturn } from '..';
import { getReturn } from '@farfetch/blackout-client/returns';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  responses,
  returnsNormalizedPayload,
} from 'tests/__fixtures__/returns';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  getReturn: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchReturn() action creator', () => {
  let store;
  const query = {};
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the fetch return procedure fails', async () => {
    const expectedError = new Error('fetch return error');

    getReturn.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchReturn(returnId, query));
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

  it('should create the correct actions for when the fetch return procedure is successful', async () => {
    getReturn.mockResolvedValueOnce(responses.get.success);
    await store.dispatch(fetchReturn(returnId, query));

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
    ).toMatchSnapshot('fetch return success payload');
  });
});

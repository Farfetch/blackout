import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchReturn } from '..';
import { getReturn } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  responses,
  returnsNormalizedPayload,
} from 'tests/__fixtures__/returns';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getReturn: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchReturn() action creator', () => {
  let store: ReturnType<typeof returnsMockStore>;
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the fetch return procedure fails', async () => {
    const expectedError = new Error('fetch return error');

    (getReturn as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await fetchReturn(returnId)(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getReturn).toHaveBeenCalledTimes(1);
      expect(getReturn).toHaveBeenCalledWith(returnId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_RETURN_REQUEST, meta: { returnId } },
          {
            type: actionTypes.FETCH_RETURN_FAILURE,
            payload: { error: expectedError },
            meta: { returnId },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch return procedure is successful', async () => {
    (getReturn as jest.Mock).mockResolvedValueOnce(responses.get.success);
    await fetchReturn(returnId)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getReturn).toHaveBeenCalledTimes(1);
    expect(getReturn).toHaveBeenCalledWith(returnId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_REQUEST, meta: { returnId } },
      {
        type: actionTypes.FETCH_RETURN_SUCCESS,
        payload: returnsNormalizedPayload,
        meta: { returnId },
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_RETURN_SUCCESS }),
    ).toMatchSnapshot('fetch return success payload');
  });
});

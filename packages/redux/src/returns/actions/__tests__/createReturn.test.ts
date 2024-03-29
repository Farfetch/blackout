import * as actionTypes from '../../actionTypes.js';
import { createReturn } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postReturn } from '@farfetch/blackout-client';
import {
  responses,
  returnsNormalizedPayload,
} from 'tests/__fixtures__/returns/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postReturn: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('createReturn() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof returnsMockStore>;
  const data = { ...responses.post.success };

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions when the create return procedure fails', async () => {
    const expectedError = new Error('create return error');

    (postReturn as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createReturn(data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postReturn).toHaveBeenCalledTimes(1);
    expect(postReturn).toHaveBeenCalledWith(data, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_RETURN_REQUEST },
        {
          type: actionTypes.CREATE_RETURN_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create return procedure is successful', async () => {
    (postReturn as jest.Mock).mockResolvedValueOnce(responses.post.success);

    await createReturn(data)(store.dispatch);

    const actionResults = store.getActions();

    expect(postReturn).toHaveBeenCalledTimes(1);
    expect(postReturn).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_RETURN_REQUEST },
      {
        payload: returnsNormalizedPayload,
        type: actionTypes.CREATE_RETURN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_RETURN_SUCCESS,
      }),
    ).toMatchSnapshot('create return success payload');
  });
});

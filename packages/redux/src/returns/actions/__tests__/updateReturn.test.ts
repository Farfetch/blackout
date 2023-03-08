import * as actionTypes from '../../actionTypes.js';
import { returnTimeWindowData as data } from 'tests/__fixtures__/returns/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { patchReturn } from '@farfetch/blackout-client';
import { updateReturn } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchReturn: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('updateReturn() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof returnsMockStore>;
  const returnId = 5926969;

  const expectedData = {
    start: `/Date(${data.start})/`,
    end: data.end,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the update return procedure fails', async () => {
    const expectedError = new Error('update return error');

    (patchReturn as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await updateReturn(returnId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchReturn).toHaveBeenCalledTimes(1);
    expect(patchReturn).toHaveBeenCalledWith(
      returnId,
      expectedData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.UPDATE_RETURN_REQUEST, meta: { returnId } },
        {
          type: actionTypes.UPDATE_RETURN_FAILURE,
          payload: { error: expectedError },
          meta: { returnId },
        },
      ]),
    );
  });

  it('should create the correct actions for when the update return procedure is successful', async () => {
    (patchReturn as jest.Mock).mockResolvedValueOnce(data);

    await updateReturn(returnId, data)(store.dispatch);

    const actionResults = store.getActions();

    expect(patchReturn).toHaveBeenCalledTimes(1);
    expect(patchReturn).toHaveBeenCalledWith(
      returnId,
      expectedData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_RETURN_REQUEST, meta: { returnId } },
      {
        type: actionTypes.UPDATE_RETURN_SUCCESS,
        meta: { returnId },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_RETURN_SUCCESS,
      }),
    ).toMatchSnapshot('update return success payload');
  });
});

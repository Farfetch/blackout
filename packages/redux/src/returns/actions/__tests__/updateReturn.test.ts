import * as actionTypes from '../../actionTypes';
import { returnTimeWindowData as data } from 'tests/__fixtures__/returns';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchReturn } from '@farfetch/blackout-client';
import { updateReturn } from '..';
import find from 'lodash/find';

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
    expect.assertions(4);

    await updateReturn(
      returnId,
      data,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
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

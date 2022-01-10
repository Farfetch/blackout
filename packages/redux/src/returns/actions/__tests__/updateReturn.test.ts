import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchReturn } from '@farfetch/blackout-client/returns';
import { updateReturn } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  patchReturn: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('updateReturn() action creator', () => {
  const query = {};
  const expectedConfig = undefined;
  let store;
  const returnId = 5926969;

  const data = {
    start: '1574445600000',
    end: '/Date(1574413200000)/',
  };

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

    patchReturn.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateReturn(returnId, data, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchReturn).toHaveBeenCalledTimes(1);
      expect(patchReturn).toHaveBeenCalledWith(
        returnId,
        expectedData,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_RETURN_REQUEST },
          {
            type: actionTypes.UPDATE_RETURN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update return procedure is successful', async () => {
    patchReturn.mockResolvedValueOnce();

    await store.dispatch(updateReturn(returnId, data, query));

    const actionResults = store.getActions();

    expect(patchReturn).toHaveBeenCalledTimes(1);
    expect(patchReturn).toHaveBeenCalledWith(
      returnId,
      expectedData,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_RETURN_REQUEST },
      {
        type: actionTypes.UPDATE_RETURN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_RETURN_SUCCESS,
      }),
    ).toMatchSnapshot('update return success payload');
  });
});

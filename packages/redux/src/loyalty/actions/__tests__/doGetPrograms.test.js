import * as normalizr from 'normalizr';
import { mockStore } from '../../../../tests';
import doGetPrograms from '../doGetPrograms';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetPrograms() action creator', () => {
  const programId = 1;
  const mockResponseProgram = {
    id: programId,
    name: 'string',
  };
  const mockResponsePrograms = [mockResponseProgram];
  const expectedNormalizedPayloadProgram = {
    entities: {
      programs: { [programId]: mockResponseProgram },
    },
    result: programId,
  };
  const expectedNormalizedPayloadPrograms = {
    ...expectedNormalizedPayloadProgram,
    result: [programId],
  };

  const getPrograms = jest.fn();
  const action = doGetPrograms(getPrograms);

  beforeEach(() => {
    jest.clearAllMocks();
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the get programs procedure fails', async () => {
    const expectedError = new Error('get programs error');

    getPrograms.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPrograms).toHaveBeenCalledTimes(1);
      expect(getPrograms).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_PROGRAMS_REQUEST },
          {
            type: actionTypes.GET_PROGRAMS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get programs procedure is successful', async () => {
    getPrograms.mockResolvedValueOnce(mockResponsePrograms);
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getPrograms).toHaveBeenCalledTimes(1);
    expect(getPrograms).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PROGRAMS_REQUEST },
      {
        type: actionTypes.GET_PROGRAMS_SUCCESS,
        payload: {
          ...expectedNormalizedPayloadPrograms,
          result: [programId],
        },
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_PROGRAMS_SUCCESS }),
    ).toMatchSnapshot('get programs success payload');
  });
});

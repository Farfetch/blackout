import * as normalizr from 'normalizr';
import { getPrograms } from '@farfetch/blackout-client/loyalty';
import { mockStore } from '../../../../tests';
import fetchPrograms from '../fetchPrograms';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/loyalty', () => ({
  ...jest.requireActual('@farfetch/blackout-client/loyalty'),
  getPrograms: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchPrograms() action creator', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the fetch programs procedure fails', async () => {
    const expectedError = new Error('fetch programs error');

    getPrograms.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPrograms());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPrograms).toHaveBeenCalledTimes(1);
      expect(getPrograms).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PROGRAMS_REQUEST },
          {
            type: actionTypes.FETCH_PROGRAMS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch programs procedure is successful', async () => {
    getPrograms.mockResolvedValueOnce(mockResponsePrograms);
    await store.dispatch(fetchPrograms());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getPrograms).toHaveBeenCalledTimes(1);
    expect(getPrograms).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PROGRAMS_REQUEST },
      {
        type: actionTypes.FETCH_PROGRAMS_SUCCESS,
        payload: {
          ...expectedNormalizedPayloadPrograms,
          result: [programId],
        },
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_PROGRAMS_SUCCESS }),
    ).toMatchSnapshot('fetch programs success payload');
  });
});

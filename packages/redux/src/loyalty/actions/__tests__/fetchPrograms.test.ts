import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  expectedNormalizedPayloadPrograms,
  mockResponsePrograms,
} from 'tests/__fixtures__/loyalty/loyalty.fixtures.mjs';
import { find } from 'lodash-es';
import { getPrograms } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import fetchPrograms from '../fetchPrograms.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getPrograms: jest.fn(),
}));

const rewardsMockStore = (state = {}) =>
  mockStore({ rewards: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof rewardsMockStore>;

describe('fetchPrograms() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = rewardsMockStore();
  });

  it('should create the correct actions for when the fetch programs procedure fails', async () => {
    const expectedError = new Error('fetch programs error');

    (getPrograms as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchPrograms()(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch programs procedure is successful', async () => {
    (getPrograms as jest.Mock).mockResolvedValueOnce(mockResponsePrograms);
    await fetchPrograms()(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getPrograms).toHaveBeenCalledTimes(1);
    expect(getPrograms).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PROGRAMS_REQUEST },
      {
        type: actionTypes.FETCH_PROGRAMS_SUCCESS,
        payload: expectedNormalizedPayloadPrograms,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_PROGRAMS_SUCCESS }),
    ).toMatchSnapshot('fetch programs success payload');
  });
});

import * as normalizr from 'normalizr';
import { actionTypes } from '../..';
import {
  expectedBenefitsNormalizedPayload,
  mockGetBenefitsResponse,
} from 'tests/__fixtures__/users';
import { fetchBenefits } from '..';
import { getBenefits } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getBenefits: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchBenefits action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get benefits procedure fails', async () => {
    const expectedError = new Error('get benefits error');

    getBenefits.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchBenefits());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getBenefits).toHaveBeenCalledTimes(1);
      expect(getBenefits).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_BENEFITS_REQUEST },
          {
            type: actionTypes.FETCH_BENEFITS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get benefits procedure is successful', async () => {
    getBenefits.mockResolvedValueOnce(mockGetBenefitsResponse);

    await store.dispatch(fetchBenefits());

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBenefits).toHaveBeenCalledTimes(1);
    expect(getBenefits).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_BENEFITS_REQUEST },
      {
        payload: expectedBenefitsNormalizedPayload,
        type: actionTypes.FETCH_BENEFITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_BENEFITS_SUCCESS,
      }),
    ).toMatchSnapshot('get benefits success payload');
  });
});

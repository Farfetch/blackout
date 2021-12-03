import * as normalizr from 'normalizr';
import {
  expectedBenefitsNormalizedPayload,
  mockGetBenefitsResponse,
} from '../../__fixtures__/benefits.fixtures';
import { fetchBenefits } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchBenefits action creator', () => {
  const getBenefits = jest.fn();
  const action = fetchBenefits(getBenefits);

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get benefits procedure fails', async () => {
    const expectedError = new Error('get benefits error');

    getBenefits.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action());
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

    await store.dispatch(action());

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

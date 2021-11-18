import {
  expectedBenefitsNormalizedPayload,
  mockGetBenefitsResponse,
} from '../../__fixtures__/benefits.fixtures';
import { mockStore } from '../../../../../tests';
import doGetBenefits from '../doGetBenefits';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;
const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

describe('doGetBenefits action creator', () => {
  const getBenefits = jest.fn();
  const action = doGetBenefits(getBenefits);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
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
          { type: actionTypes.GET_BENEFITS_REQUEST },
          {
            type: actionTypes.GET_BENEFITS_FAILURE,
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
      { type: actionTypes.GET_BENEFITS_REQUEST },
      {
        payload: expectedBenefitsNormalizedPayload,
        type: actionTypes.GET_BENEFITS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_BENEFITS_SUCCESS,
      }),
    ).toMatchSnapshot('get benefits success payload');
  });
});

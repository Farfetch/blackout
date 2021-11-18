import { doGetSizeScale } from '../';
import {
  mockScaleId,
  mockSizeScale,
  mockState,
} from 'tests/__fixtures__/sizeScales';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const sizeScalesMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetSizeScale() action creator', () => {
  let store;
  const getSizeScale = jest.fn();
  const action = doGetSizeScale(getSizeScale);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScalesMockStore(mockState);
  });

  it('should create the correct actions for when the get product sizeScale procedure fails', async () => {
    const expectedError = new Error('Get product sizeScale error');

    getSizeScale.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockScaleId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSizeScale).toHaveBeenCalledTimes(1);
      expect(getSizeScale).toHaveBeenCalledWith(mockScaleId, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { sizeScaleId: mockScaleId },
          type: actionTypes.GET_SIZESCALE_REQUEST,
        },
        {
          payload: {
            error: expectedError,
          },
          meta: {
            sizeScaleId: mockScaleId,
          },
          type: actionTypes.GET_SIZESCALE_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product size scale procedure is successful', async () => {
    getSizeScale.mockResolvedValueOnce(mockSizeScale);

    await store.dispatch(action(mockScaleId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledWith(mockScaleId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: {
          sizeScaleId: mockScaleId,
        },
        type: actionTypes.GET_SIZESCALE_REQUEST,
      },
      {
        payload: expect.any(Object),
        meta: expect.any(Object),
        type: actionTypes.GET_SIZESCALE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_SIZESCALE_SUCCESS,
      }),
    ).toMatchSnapshot('Get product size scales success payload');
  });
});

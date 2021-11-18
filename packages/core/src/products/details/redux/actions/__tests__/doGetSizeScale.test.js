// @TODO: Remove this file in version 2.0.0.
import { doGetSizeScale } from '../';
import {
  mockProduct,
  mockProductId,
  mockSizeScale,
  mockSizeScaleId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetSizeScale() action creator', () => {
  let store;
  const getSizeScale = jest.fn();
  const action = doGetSizeScale(getSizeScale);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();
    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: mockProduct,
        },
      },
      details: {},
    });
  });

  it('should create the correct actions for when the get product sizeScale procedure fails', async () => {
    const expectedError = new Error('Get product sizeScale error');

    getSizeScale.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSizeScale).toHaveBeenCalledTimes(1);
      expect(getSizeScale).toHaveBeenCalledWith(
        mockSizeScaleId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { scaleId: mockSizeScaleId },
          type: actionTypes.GET_SIZESCALE_REQUEST,
        },
        {
          payload: {
            error: expectedError,
            scaleId: mockSizeScaleId,
          },
          type: actionTypes.GET_SIZESCALE_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product size scale procedure is successful', async () => {
    getSizeScale.mockResolvedValueOnce(mockSizeScale);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledTimes(1);
    expect(getSizeScale).toHaveBeenCalledWith(mockSizeScaleId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        payload: {
          scaleId: mockSizeScaleId,
        },
        type: actionTypes.GET_SIZESCALE_REQUEST,
      },
      {
        payload: expect.any(Object),
        type: actionTypes.GET_SIZESCALE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_SIZESCALE_SUCCESS,
      }),
    ).toMatchSnapshot('Get product sizeguides success payload');
  });
});

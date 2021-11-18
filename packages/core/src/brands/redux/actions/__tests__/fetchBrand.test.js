import { fetchBrand } from '../';
import { mockBrandId, mockBrandResponse } from 'tests/__fixtures__/brands';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const brandsMockStore = (state = {}) => mockStore({ brands: reducer() }, state);

describe('fetchBrand() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getBrand = jest.fn();
  const action = fetchBrand(getBrand);
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();
    store = brandsMockStore();
  });

  it('should create the correct actions for when the fetch brand procedure fails', async () => {
    const expectedError = new Error('Fetch brand error');

    getBrand.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockBrandId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getBrand).toHaveBeenCalledTimes(1);
      expect(getBrand).toHaveBeenCalledWith(mockBrandId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.FETCH_BRAND_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.FETCH_BRAND_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch brand procedure is successful', async () => {
    getBrand.mockResolvedValueOnce(mockBrandResponse);

    await store.dispatch(action(mockBrandId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBrand).toHaveBeenCalledTimes(1);
    expect(getBrand).toHaveBeenCalledWith(mockBrandId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.FETCH_BRAND_REQUEST,
          },
          {
            payload: mockBrandResponse,
            type: actionTypes.FETCH_BRAND_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.FETCH_BRAND_SUCCESS }),
    ).toMatchSnapshot('Fetch brand success payload');
  });
});

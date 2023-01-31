import { doGetSizeScales } from '../';
import { mockSizeScale } from 'tests/__fixtures__/sizeScales';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const categoryId = mockSizeScale.categoryId;
const mockQuery = {
  categoryId,
};

const sizeScalesMockStore = (state = {}) =>
  mockStore({ sizeScales: reducer() }, state);

describe('doGetSizeScales() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getSizeScales = jest.fn();
  const action = doGetSizeScales(getSizeScales);

  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeScalesMockStore();
  });

  it('should create the correct actions for when getting size scales fail', async () => {
    const expectedError = new Error('Get size scales error');

    getSizeScales.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSizeScales).toHaveBeenCalledTimes(1);
      expect(getSizeScales).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SIZESCALES_REQUEST,
            },
            {
              meta: mockQuery,
              payload: { error: expectedError },
              type: actionTypes.GET_SIZESCALES_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search procedure is successful', async () => {
    const response = [mockSizeScale];
    getSizeScales.mockResolvedValueOnce(response);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(getSizeScales).toHaveBeenCalledTimes(1);
    expect(getSizeScales).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SIZESCALES_REQUEST,
          },
          {
            meta: mockQuery,
            payload: response,
            type: actionTypes.GET_SIZESCALES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_SIZESCALES_SUCCESS,
      }),
    ).toMatchSnapshot('Get size scales success payload');
  });
});

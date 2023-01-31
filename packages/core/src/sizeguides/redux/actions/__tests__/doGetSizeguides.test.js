import { doGetSizeguides } from '../';
import { mockQuery, mockSizeguides } from 'tests/__fixtures__/sizeguides';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const sizeguidesMockStore = (state = {}) =>
  mockStore({ sizeguides: reducer() }, state);

describe('doGetSizeguides() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getSizeguides = jest.fn();
  const action = doGetSizeguides(getSizeguides);

  beforeEach(() => {
    jest.clearAllMocks();
    store = sizeguidesMockStore();
  });

  it('should create the correct actions for when the get sizeguides procedure fails', async () => {
    const expectedError = new Error('Get sizeguides error');

    getSizeguides.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSizeguides).toHaveBeenCalledTimes(1);
      expect(getSizeguides).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SIZEGUIDES_REQUEST,
            },
            {
              meta: mockQuery,
              payload: { error: expectedError },
              type: actionTypes.GET_SIZEGUIDES_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search procedure is successful', async () => {
    getSizeguides.mockResolvedValueOnce(mockSizeguides);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(getSizeguides).toHaveBeenCalledTimes(1);
    expect(getSizeguides).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SIZEGUIDES_REQUEST,
          },
          {
            meta: mockQuery,
            payload: mockSizeguides,
            type: actionTypes.GET_SIZEGUIDES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_SIZEGUIDES_SUCCESS,
      }),
    ).toMatchSnapshot('Get size guide success payload');
  });
});

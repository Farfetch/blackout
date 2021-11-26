import { mockStore } from '../../../../../tests';
import doGetReferences from '../../actions/doGetReferences';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('doGetReferences() action creator', () => {
  const query = {};
  const expectedConfig = undefined;
  let store;
  const getReferences = jest.fn();
  const action = doGetReferences(getReferences);
  const name = 'ReturnNote';
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get references procedure fails', async () => {
    const expectedError = new Error('get references error');

    getReferences.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(returnId, name, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getReferences).toHaveBeenCalledTimes(1);
      expect(getReferences).toHaveBeenCalledWith(
        returnId,
        name,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_REFERENCES_REQUEST },
          {
            type: actionTypes.GET_REFERENCES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get references procedure is successful', async () => {
    getReferences.mockResolvedValueOnce({});
    await store.dispatch(action(returnId, name, query));

    const actionResults = store.getActions();

    expect(getReferences).toHaveBeenCalledTimes(1);
    expect(getReferences).toHaveBeenCalledWith(
      returnId,
      name,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_REFERENCES_REQUEST },
      {
        type: actionTypes.GET_REFERENCES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_REFERENCES_SUCCESS,
      }),
    ).toMatchSnapshot('update return success payload');
  });
});

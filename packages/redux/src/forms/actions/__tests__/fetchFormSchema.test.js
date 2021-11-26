import { actionTypes } from '../..';
import { fetchFormSchema } from '..';
import {
  formSchemaResponse,
  query as getFormSchemasQuery,
} from 'tests/__fixtures__/forms/formsSchema';
import { getFormSchema } from '@farfetch/blackout-client/forms';
import { mockStore } from 'redux/tests';
import find from 'lodash/find';
import reducer from '../../reducer';

const formsMockStore = (state = {}) => mockStore(reducer(), state);
const expectedConfig = undefined;
let store;

jest.mock('@farfetch/blackout-client/forms', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/forms'),
    getFormSchema: jest.fn(),
  };
});

beforeEach(jest.clearAllMocks);

describe('fetchFormSchema() action creator', () => {
  beforeEach(() => {
    store = formsMockStore();
  });

  it('should create the correct actions when fetch get form schemas procedure fails', async () => {
    const expectedError = new Error('Fetch form schema error');

    getFormSchema.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(
        fetchFormSchema(
          formSchemaResponse.code,
          getFormSchemasQuery,
          expectedConfig,
        ),
      )
      .catch(error => {
        expect(error).toBe(expectedError);
        expect(getFormSchema).toHaveBeenCalledTimes(1);
        expect(getFormSchema).toHaveBeenCalledWith(
          formSchemaResponse.code,
          getFormSchemasQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            expect.objectContaining(
              {
                type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
                meta: { schemaCode: formSchemaResponse.code },
              },
              {
                payload: { error: expectedError },
                type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
              },
            ),
          ]),
        );
      });
  });

  it('should create the correct actions for when the fetch form schemas procedure is successful', async () => {
    const mockResult = {
      foo: 'bar',
    };
    getFormSchema.mockResolvedValueOnce(mockResult);

    await store
      .dispatch(
        fetchFormSchema(
          formSchemaResponse.code,
          getFormSchemasQuery,
          expectedConfig,
        ),
      )
      .then(clientResult => {
        expect(clientResult).toBe(mockResult);
      });

    const actionResults = store.getActions();

    expect(getFormSchema).toHaveBeenCalledTimes(1);
    expect(getFormSchema).toHaveBeenCalledWith(
      formSchemaResponse.code,
      getFormSchemasQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.FETCH_FORM_SCHEMA_REQUEST,
            meta: { schemaCode: formSchemaResponse.code },
          },
          {
            payload: {},
            type: actionTypes.FETCH_FORM_SCHEMA_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_FORM_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('Fetch form schemas payload');
  });
});

import { actionTypes } from '../../';
import { doGetFormSchema } from '../';
import {
  formSchemaResponse,
  query as getFormSchemasQuery,
} from './__mocks__/formsSchema';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer from '../../reducer';

const formsMockStore = (state = {}) => mockStore(reducer(), state);
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doGetFormSchema() action creator', () => {
  const getFormSchemas = jest.fn();
  /**
   * @see {getFormSchema}
   */
  const action = doGetFormSchema(getFormSchemas);

  beforeEach(() => {
    store = formsMockStore();
  });

  it('should create the correct actions when the get form schemas procedure fails', async () => {
    const expectedError = new Error('Get form schema error');

    getFormSchemas.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(
        action(formSchemaResponse.code, getFormSchemasQuery, expectedConfig),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getFormSchemas).toHaveBeenCalledTimes(1);
      expect(getFormSchemas).toHaveBeenCalledWith(
        formSchemaResponse.code,
        getFormSchemasQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_FORM_SCHEMA_FAILURE,
              meta: { schemaCode: formSchemaResponse.code },
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_FORM_SCHEMA_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get form schemas procedure is successful', async () => {
    getFormSchemas.mockResolvedValueOnce();

    await store.dispatch(
      action(formSchemaResponse.code, getFormSchemasQuery, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(getFormSchemas).toHaveBeenCalledTimes(1);
    expect(getFormSchemas).toHaveBeenCalledWith(
      formSchemaResponse.code,
      getFormSchemasQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_FORM_SCHEMA_REQUEST,
            meta: { schemaCode: formSchemaResponse.code },
          },
          {
            payload: {},
            type: actionTypes.GET_FORM_SCHEMA_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_FORM_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('Get form schemas payload');
  });
});

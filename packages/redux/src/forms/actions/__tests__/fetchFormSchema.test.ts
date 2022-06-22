import { fetchFormSchema } from '..';
import { formsActionTypes } from '../..';
import {
  formSchemaResponse,
  query as getFormSchemasQuery,
} from 'tests/__fixtures__/forms';
import { getFormSchema } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

const formsMockStore = (state = {}) =>
  mockStore({ forms: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof formsMockStore>;

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
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

    (getFormSchema as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await fetchFormSchema(
      formSchemaResponse.code,
      getFormSchemasQuery,
      expectedConfig,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getFormSchema).toHaveBeenCalledTimes(1);
      expect(getFormSchema).toHaveBeenCalledWith(
        formSchemaResponse.code,
        getFormSchemasQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: formsActionTypes.FETCH_FORM_SCHEMA_FAILURE,
            meta: { schemaCode: formSchemaResponse.code },
          }),
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch form schemas procedure is successful', async () => {
    const mockResult = {
      foo: 'bar',
    };
    (getFormSchema as jest.Mock).mockResolvedValueOnce(mockResult);

    await fetchFormSchema(
      formSchemaResponse.code,
      getFormSchemasQuery,
      expectedConfig,
    )(store.dispatch).then(clientResult => {
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
        expect.objectContaining({
          type: formsActionTypes.FETCH_FORM_SCHEMA_REQUEST,
          meta: { schemaCode: formSchemaResponse.code },
        }),
      ]),
    );
    expect(
      find(actionResults, {
        type: formsActionTypes.FETCH_FORM_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('Fetch form schemas payload');
  });
});

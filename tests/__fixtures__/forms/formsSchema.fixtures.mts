export const schemaCode = 'test';

export const query = {
  resolveJsonSchemaPresets: false,
  includeJsonSchema: false,
};

export const formSchemaResponse = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  code: 'contact-us',
  name: 'Contact Us',
  tenantId: 0,
  schemaId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  jsonSchema: {
    title: 'Newsletter Subscription',
    description: 'Newsletter Subscription schema',
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email',
      },
    },
    required: ['name', 'email'],
  },
  processors: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
  settings: {},
  active: true,
  createdAt: '2020-02-11T16:07:43.647Z',
  updatedAt: '2020-02-11T16:07:43.647Z',
  uiSchema: {},
};

export const postFormDataPayload = {
  formData: {
    subject: 'product_info',
    message: 'Need some help',
    firstName: 'John',
    lastName: 'Jackson',
    email: 'john.jackson@test.com',
    phone: '123456789',
    orderNumber: '12345',
  },
};

export const postFormDataResponse = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  formId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  formData: postFormDataPayload.formData,
  context: {
    additionalProp1: 'string',
    additionalProp2: 'string',
    additionalProp3: 'string',
  },
  tenantId: 0,
  createdAt: '2020-02-05T15:56:36.494Z',
  updatedAt: '2020-02-05T15:56:36.494Z',
  userId: '123',
  formCode: '123',
  fileIds: {},
};

export const mockState = {
  forms: {
    result: { [formSchemaResponse.code]: formSchemaResponse },
    error: { [formSchemaResponse.code]: 'Error - Content not loaded.' },
    isLoading: { [formSchemaResponse.code]: false },
    isSubmitFormLoading: { [formSchemaResponse.code]: false },
    submitFormError: {
      [formSchemaResponse.code]: 'Error - Content not loaded.',
    },
  },
};

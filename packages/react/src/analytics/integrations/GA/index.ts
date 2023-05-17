export { default } from './GA.js';
export * from './types/index.js';

// To allow the user to configure its own event schemas,
// export yup as a different name
export { validationSchemaBuilder } from '../shared/validation/eventSchemas.js';

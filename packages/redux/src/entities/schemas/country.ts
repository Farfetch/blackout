import { schema } from 'normalizr';
import state from './state.js';

export default new schema.Entity(
  'countries',
  {
    states: [state],
  },
  {
    idAttribute: 'code',
  },
);

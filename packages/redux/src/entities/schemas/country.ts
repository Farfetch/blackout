import { schema } from 'normalizr';
import state from './state';

export default new schema.Entity(
  'countries',
  {
    states: [state],
  },
  {
    idAttribute: 'code',
  },
);

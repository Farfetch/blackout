import { schema } from 'normalizr';
import city from './city.js';

export default new schema.Entity('states', {
  cities: [city],
});

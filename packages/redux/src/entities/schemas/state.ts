import { schema } from 'normalizr';
import city from './city';

export default new schema.Entity('states', {
  cities: [city],
});

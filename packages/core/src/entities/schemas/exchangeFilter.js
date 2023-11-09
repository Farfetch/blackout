import { schema } from 'normalizr';

const exchangeFiltersSchema = new schema.Entity(
  'exchangeFilters',
  {},
  {
    idAttribute: value => value.exchangeFilterItems[0].orderItemUuid,
  },
);

export default exchangeFiltersSchema;

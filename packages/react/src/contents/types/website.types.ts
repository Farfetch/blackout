import type { PropertyValueSpecification, SearchAction } from 'schema-dts';

// For SearchAction schema, the typing doesn't have the key 'query-input', only the 'query' and generates a type error.
// The problem is that Search Engines like Google only allow a search action to perform with 'query-input' with a PropertyValueSpecification.
// Solution approach here: https://github.com/google/schema-dts/issues/114
export type CustomSearchAction = SearchAction & {
  'query-input': PropertyValueSpecification;
};

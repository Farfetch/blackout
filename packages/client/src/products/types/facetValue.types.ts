export type FacetValue = {
  value: number;
  valueUpperBound: number;
  description: string;
  slug: string | null;
  url: string;
  parentId: number;
  groupsOn: number;
  _isDisabled: boolean;
  _isActive: boolean;
  count: number;
};

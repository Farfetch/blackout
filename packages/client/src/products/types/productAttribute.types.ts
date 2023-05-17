export type ProductAttribute = {
  id: number;
  name: string;
  values: Array<{
    id: number;
    value: string;
  }>;
};

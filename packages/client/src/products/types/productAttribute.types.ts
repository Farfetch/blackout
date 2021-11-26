export type ProductAttribute = {
  id: number;
  name: string;
  values: Array<{
    id: number;
    name: string;
  }>;
};

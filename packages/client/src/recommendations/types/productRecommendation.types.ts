export type ProductRecommendation = {
  id?: string;
  values?: ProductItem[];
};

export type ProductItem = {
  id: string;
  score: number;
};

enum TypeEnum {
  Category = 1,
  Brand,
  Merchant,
  Other,
}

export type SearchDidYouMean = {
  suggestion: string;
  type: TypeEnum;
  resourceId: number;
  slug: string | null;
};

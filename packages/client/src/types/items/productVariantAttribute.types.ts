export type ProductVariantAttribute = {
  type: ProductVariantAttributeType;
  value: string;
  description: string;
};

export enum ProductVariantAttributeType {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

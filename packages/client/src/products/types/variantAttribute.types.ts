export enum VariantAttributeTypeEnum {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

export type VariantAttribute = {
  type: VariantAttributeTypeEnum;
  value: string;
  description: string;
};

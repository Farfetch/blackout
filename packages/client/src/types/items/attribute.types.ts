export type Attribute = {
  type: AttributeType;
  value: string;
  description: string;
};

export enum AttributeType {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

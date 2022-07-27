export type CustomAttributesAdapted = Record<string, any> | null | string;

export type AdaptCustomAttributes = (
  attributes: string,
) => CustomAttributesAdapted;

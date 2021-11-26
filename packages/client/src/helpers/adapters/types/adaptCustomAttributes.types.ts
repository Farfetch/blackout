export type CustomAttributesAdapted = Record<string, string> | string;

export type AdaptCustomAttributes = (
  attributes: string,
) => CustomAttributesAdapted;

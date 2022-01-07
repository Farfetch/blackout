export type CustomAttributesAdapted = Record<string, string> | string | null;

export type AdaptCustomAttributes = (
  attributes: string,
) => CustomAttributesAdapted;

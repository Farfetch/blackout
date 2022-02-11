export type CustomAttributesAdapted = unknown | null;

export type AdaptCustomAttributes = (
  attributes: string,
) => CustomAttributesAdapted;

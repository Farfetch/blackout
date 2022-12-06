export type DateCreatedAdapted = number | null;

export type AdaptDate = (dateCreated: string) => DateCreatedAdapted;

export type HypermediaLink = {
  href: string;
  isHrefTemplate?: boolean;
  method?: string;
  encoding?: string;
  schema?: string;
  accept?: Array<string>;
};

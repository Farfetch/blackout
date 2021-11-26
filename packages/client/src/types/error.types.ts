export type Error = {
  code?: string;
  message?: string;
  developerMessage?: string;
  exception?: Record<string, string | number>;
  moreInformation?: string;
};

export type BlackoutError = Error & {
  code: string;
  developerMessage?: string;
  exception?: Record<string, string | number>;
  moreInformation?: string;
  status?: number;
  name?: string;
  transportLayerErrorCode?: string;
};

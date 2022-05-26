export type BlackoutError = Error & {
  code: number;
  developerMessage?: string;
  exception?: Record<string, string | number>;
  moreInformation?: string;
  status?: number;
  name?: string;
  transportLayerErrorCode?: string;
};

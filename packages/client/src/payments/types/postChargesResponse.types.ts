import type { Charge } from '.';

export type PostChargesResponse = {
  data: Charge;
  headers: Record<string, string>;
};

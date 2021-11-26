import type { Country } from '.';

export type Continent = {
  id: number;
  name: string;
  countries: Country[];
};

import type { Config } from '../../types/index.js';
import type { Country } from './country.js';

export type GetCountries = (config?: Config) => Promise<Country[]>;

import type { Config } from '../../types';
import type { Country } from './country';

export type GetCountries = (config?: Config) => Promise<Country[]>;

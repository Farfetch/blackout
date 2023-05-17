import type { Config } from '../../types/index.js';
import type { GetTranslationsQuery } from './getTranslationsQuery.type.js';
import type { Translations } from './translations.type.js';

export type GetTranslations = (
  query: GetTranslationsQuery,
  config?: Config,
) => Promise<Translations>;

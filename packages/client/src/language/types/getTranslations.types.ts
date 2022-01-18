import type { Config } from '../../types';
import type { GetTranslationsQuery } from './getTranslationsQuery.type';
import type { Translations } from './translations.type';

export type GetTranslations = (
  query: GetTranslationsQuery,
  config?: Config,
) => Promise<Translations>;

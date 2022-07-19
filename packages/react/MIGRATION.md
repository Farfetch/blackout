This guide will help you migrate `@farfetch/blackout-react` to the latest version.

# Table of Contents

## Migrating from react v1.x.x to v2.0.0

- [Analytics](#analytics)
- [Contents](#contents)
- [Search](#search)

### Analytics:

#### What's new:

In this new version we will no longer give direct support and will remove the following integrations from our source code: `Forter`, `Nethone` and `Riskified`.
We have now a new integration called `Vitorino` that wraps all three integrations into a single one and it must be used instead.
This new integration is responsible to load the respective third-party scripts and make the necessary calls to the omnitracking service.

#### What you need to change:

To make sure everything works as before, please remove the calls to analytics's `addIntegration` method of these integrations and load `Vitorino` instad, like the following example:

```js
// Previously
import analytics, {
  integrations,
  pageTypes,
} from '@farfetch/blackout-react/analytics';

function setupAnalytics() {
  // (...)

  analytics.addIntegration('riskified', integrations.Riskified);

  analytics.addIntegration('nethone', integrations.Nethone, {
    sensitiveFields: {
      [pageTypes.LOGIN_REGISTER]: [
        sensitiveFieldsIds.LOGIN,
        sensitiveFieldsIds.REGISTER_PASSWORD,
        sensitiveFieldsIds.REGISTER_CONFIRM_PASSWORD,
      ],
    },
  });

  analytics.addIntegration('Forter', integrations.Forter, {
    siteId: { forterIntegrationSiteId },
    origin: 'WHITELABEL PORTAL',
  });

  // (...)
}

// Change to:

import analytics, {
  integrations,
  pageTypes,
} from '@farfetch/blackout-react/analytics';

function setupAnalytics() {
  // (...)

  analytics.addIntegration('vitorino', integrations.Vitorino, {
    sensitiveFields: {
      [pageTypes.LOGIN_REGISTER]: [
        sensitiveFieldsIds.LOGIN,
        sensitiveFieldsIds.REGISTER_PASSWORD,
        sensitiveFieldsIds.REGISTER_CONFIRM_PASSWORD,
      ],
    },
  });

  // (...)
}
```

- Note: All necessary configurations for the `Nethone` integration should be passed now to the `Vitorino` instead. Configurations for `Forter` can be ignored as Vitorino will calculate them automatically.

### Contents:

#### What's new:

- `react-helmet` dependecy was removed. You can now use a different dependency to set metatags on your document head.
- Remove of component `Head`. Now you can request the respective meta and link tags object with hook useMetaTags.
- Remove `structured-data` components and now functions are exported to render HTML tags.

#### What you need to change:

- Chunk nomenclature changed `@farfetch/blackout-react/content` to `@farfetch/blackout-react/contents`.
- Add a new dependency on theme project like `react-helmet`.
- On your App.js replace the `Head` component to the new dependency implementation, and can provide the obejct from useMetaTags
  to dependency props.
- The new implementation doesn't include `lang`, `theme-color` and `title` so, you need to implement on theme side.

  ```js
  // Previously
  import { Head, useSEO } from '@farfetch/blackout-react/content';
  import { Article as StructuredArticle } from '@farfetch/blackout-react/content';

  ...
  <Head seo={seo} lang={lang} themeColor={themeColor} appIconLinks={AppIconLinks} />
  <StructuredArticle
      metadata={metadata}
      date={publicationDate}
      url={pathname}
  />

  // Change to:
  import { useMetaTags } from '@farfetch/blackout-react/contents';
  import { Helmet } from 'react-helmet';
  import { article as structuredArticle } from '@farfetch/blackout-react/contents/structured-data';

  ...
  const { meta } = useMetaTags({ query, appIconLinks });
  const { title: headTitle, ...otherMeta } = meta;
  const helmetProps = {
      defaultTitle: 'White Label',
      htmlAttributes: { lang: cultureCode || 'en' },
      ...otherMeta
  };
  ...
  {meta && (
      <Helmet {...helmetProps}>
          <title>{headTitle}</title>
          {StructuredArticle(
              metadata,
              publicationDate,
              pathname,
              ...
          )}
      </Helmet>
  )}
  ```

- NOTE: When using `helmet`, if you already have the tag `theme-color` or` manifest`, they are not replaced because
  `helmet` includes a `data-react-helmet="true"` property in this tags, and the overwrite doesn't take effect. If you need
  that overwrite take effect, please include the property `data-react-helmet="true"` in your default tags (e.g. renderDocumentToString on entry-server).

### Search:

#### What's new:

- On the `useSearchIntents` hook, the returned function `getSearchIntents`
  was renamed to `fetchSearchIntents`.

#### What you need to change:

- Rename `getSearchIntents` to `fetchSearchIntents` when using the
  useSearchIntents hook.

  ```js
  // Previously
  import { useSearchIntents } from '@farfetch/blackout-react/search';

  const { getSearchIntents } = useSearchIntents();

  // Change to:
  import { useSearchIntents } from '@farfetch/blackout-react/search';

  const { fetchSearchIntents } = useSearchIntents();
  ```

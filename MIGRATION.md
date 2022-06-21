# Migrating from @farfetch/blackout-core

The `@farfetch/blackout-core` package has been split in 3 different packages now: `@farfetch/blackout-client`, `@farfetch/blackout-analytics` and `@farfetch/blackout-redux`.

If you were using client modules from `@farfetch/blackout-core/*/client`, check the [migration file for @farfetch/blackout-client](packages/client/MIGRATION.md) to know how you can upgrade to the `@farfetch/blackout-client` package and use its corresponding modules.

If you were using analytics modules from `@farfetch/blackout-core/analytics`, check the [migration file for @farfetch/blackout-analytics](packages/analytics/MIGRATION.md) to know how you can upgrade to the `@farfetch/blackout-analytics` package and use its corresponding modules.

If you were using redux modules from `@farfetch/blackout-core/*/redux` or using some utils like `buildListingHash`, check the [migration file for @farfetch/blackout-redux](packages/redux/MIGRATION.md) to know how you can upgrade to the `@farfetch/blackout-redux` package and use its corresponding modules.

# Migrating from @farfetch/blackout-react 0.X

- [Migration file for @farfetch/blackout-react](packages/react/MIGRATION.md)

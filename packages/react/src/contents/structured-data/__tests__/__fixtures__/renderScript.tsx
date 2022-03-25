import React from 'react';
import type { Thing } from 'schema-dts';

export const MockRenderScript = (structuredData: Thing) =>
  <script type="application/ld+json">{structuredData}</script>;

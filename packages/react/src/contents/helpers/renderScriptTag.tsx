import React, { ReactElement } from 'react';
import type { Thing } from 'schema-dts';

/**
 * A helper to render a script tag with JSON-LD structured data.
 *
 * @param structuredData - Helper to render the JSON-LD object.
 * @param space          - Add whitespace and indentation to the serialized output.
 *
 * @returns - A script tag to JSON-LD structured data.
 */
export default function renderScriptTag<T extends Thing>(
  structuredData: T,
  space?: number,
): ReactElement {
  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData, null, space)}
    </script>
  );
}

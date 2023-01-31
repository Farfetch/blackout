import React from 'react';

/**
 * A helper to render a script tag with JSON-LD structured data.
 *
 * @function
 * @memberof module:content/helpers
 *
 * @param {Function} structuredData - Helper to render the JSON-LD object.
 * @param {number}   space - Add whitespace and indentation to the serialized output.
 *
 * @returns {Node} - A script tag to JSON-LD structured data.
 */
export default function renderScriptTag(structuredData, space) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData, null, space)}
    </script>
  );
}

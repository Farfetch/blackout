import * as schemaProperties from './schemas/schemaProperties.js';
import { renderScriptTag } from '../helpers/index.js';
import generateSchemaOrgProperty from '../utils/generateSchemaOrgProperty.js';
import schemaPotentialAction from './schemas/schemaPotentialAction.js';
import type { Address, Contact } from '../types/index.js';
import type { Organization, WithContext } from 'schema-dts';
import type { ReactElement } from 'react';
import type { SEOMetadata } from '@farfetch/blackout-client';

/**
 * Generate Structured Data (JSON-LD) for Organization.
 *
 * @example
 * ```
 * import { structuredOrganization } from '@farfetch/blackout-react';
 *
 * <Helmet>
 *  {structuredOrganization(
 *    metadata,
 *    name,
 *    url,
 *    logoUrl,
 *    address: {
 *      street: '...',
 *      locality: '...',
 *      ...
 *    },
 *    contact: {
 *      phone: '...',
 *      type: '...',
 *      ...
 *    },
 *    sameAs: ['...', '...'],
 *    2)
 *   }
 * </Helmet>
 *
 * ```
 *
 * @param metadata    - SEO metadata for type Organization on Homepage.
 * @param name        - Name of the Organization.
 * @param url         - Relative url of the page (location.pathname).
 * @param logoUrl     - Complete url for logotype.
 * @param address     - Full address information.
 * @param contact     - Full Contact information.
 * @param sameAs      - SameAs links of organization (e.g. Links to facebook and/or instagram).
 * @param space       - Add whitespace and indentation to the serialized output.
 * @param legalName   - Legal name of the Organization.
 * @param description - Description of the Organization.
 * @param searchTitle - Website title (Use in combination with urlTemplate to include potentialAction property).
 * @param urlTemplate - Complete url to query on.
 *
 * @returns - A script tag with Organization JSON-LD structured data.
 */
const structuredOrganization = (
  metadata: SEOMetadata,
  name: string,
  url: string,
  logoUrl: string,
  address: Address,
  contact: Contact,
  sameAs: string[],
  space?: number,
  legalName?: string,
  description?: string,
  searchTitle?: string,
  urlTemplate?: string,
): ReactElement => {
  const ORGANIZATION: WithContext<Organization> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_ORGANISATION,
    name: generateSchemaOrgProperty('organization:name', metadata) || name,
    url: generateSchemaOrgProperty('organization:url', metadata) || url,
    logo: generateSchemaOrgProperty('organization:logo', metadata) || logoUrl,
    sameAs:
      generateSchemaOrgProperty('organization:sameAS', metadata) || sameAs,
    address: {
      '@type': schemaProperties.DEFAULT_TYPE_ADDRESS,
      streetAddress:
        generateSchemaOrgProperty('organization:streetAddress', metadata) ||
        address?.street,
      addressLocality:
        generateSchemaOrgProperty('organization:addressLocality', metadata) ||
        address?.locality,
      addressRegion:
        generateSchemaOrgProperty('organization:addressRegion', metadata) ||
        address?.region,
      postalCode:
        generateSchemaOrgProperty('organization:postalCode', metadata) ||
        address?.postalCode,
      addressCountry:
        generateSchemaOrgProperty('organization:addressCountry', metadata) ||
        address?.country,
    },
    contactPoint: {
      '@type': schemaProperties.DEFAULT_TYPE_CONTACT_POINT,
      telephone:
        generateSchemaOrgProperty('organization:telephone', metadata) ||
        contact?.phone,
      contactType:
        generateSchemaOrgProperty('organization:contactType', metadata) ||
        contact?.type,
      email:
        generateSchemaOrgProperty('organization:email', metadata) ||
        contact?.email,
      contactOption:
        generateSchemaOrgProperty('organization:contactOption', metadata) ||
        contact?.option,
      areaServed:
        generateSchemaOrgProperty('organization:areaServed', metadata) ||
        contact?.areaServed,
    },
    ...(legalName
      ? {
          legalName:
            generateSchemaOrgProperty('organization:legalName', metadata) ||
            legalName,
        }
      : {}),
    ...(description
      ? {
          description:
            generateSchemaOrgProperty('organization:description', metadata) ||
            description,
        }
      : {}),
    ...(searchTitle && urlTemplate
      ? {
          potentialAction: schemaPotentialAction(
            searchTitle,
            urlTemplate,
            metadata,
          ),
        }
      : {}),
  };

  return renderScriptTag(ORGANIZATION, space);
};

export default structuredOrganization;

import { params } from 'tests/__fixtures__/contents';
import React from 'react';
import useNavbars from '../../useNavbars';

export const Navbars = () => {
  const { isNavigationLoading, navigation, navigationError } = useNavbars(
    'footer',
    params,
  );
  const title = navigation?.[0]?.components?.[0]?.fields?.title?.value;
  const subtitle = navigation?.[0]?.components?.[0]?.fields?.subtitle?.value;
  const link = navigation?.[0]?.components?.[0]?.fields?.link?.value;
  const targetLink =
    navigation?.[0]?.components?.[0]?.fields?.openLinkInNewTab?.value;

  if (isNavigationLoading) {
    return <span data-test="navigation-loading">Loading...</span>;
  }

  if (navigationError) {
    return <span data-test="navigation-error">Something went wrong!</span>;
  }

  return (
    <>
      {navigation && (
        <nav data-test="navigation">
          <ul>
            <li data-test="navigation-link">
              <a
                href={link}
                target={targetLink ? '_blank' : '_self'}
                data-test="navigation-link-text"
                rel="noreferrer"
              >
                {title}
                <br />
                {subtitle}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

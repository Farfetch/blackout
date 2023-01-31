import { params } from 'tests/__fixtures__/contents';
import React from 'react';
import useWidget from '../../useWidget';

export const Widget = () => {
  const { isWidgetLoading, widget, widgetError } = useWidget(
    'newsletter-terms-and-conditions-widget',
    params,
  );
  const widgetContent = widget?.[0]?.components.find(
    component => component.name === 'widget',
  );

  if (isWidgetLoading) {
    return <span data-test="widget-loading">Loading...</span>;
  }

  if (widgetError) {
    return <span data-test="widget-error">Something went wrong!</span>;
  }

  return (
    <>
      {widget && <span data-test="widget-data">{widgetContent.content}</span>}
    </>
  );
};

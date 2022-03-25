import React from 'react';
import useWidget from '../../useWidget';

export const Widget = () => {
  const { widget } = useWidget('newsletter-terms-and-conditions-widget');
  const widgetContent = widget?.[0]?.components.find(
    component => component.name === 'widget',
  );

  return (
    <>
      {widget && <span data-test="widget-data">{widgetContent.content}</span>}
    </>
  );
};

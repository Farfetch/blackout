/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import type { ComponentType } from '@farfetch/blackout-client/contents/types';

interface ComponentProps {
  component: ComponentType;
  children?: React.ReactNode;
}

type Components = Record<string, React.ElementType>;

export const components: Components = {};

/**
 * Registers a react component to be rendered for a given CMS component type.
 *
 * @param  {string} type - Component type. Should be the exact component type in the CMS.
 * @param  {ReactElement} component - Component to be registered.
 *
 * @returns {ReactElement} Ready component.
 */
export const registerComponent = (
  type: string,
  component: React.ElementType,
): React.ElementType => {
  if (components[type]) {
    console.warn(
      `[react-content] Component with "type=${type}" already registered on components. Will override with new component.`,
    );
  }

  components[type] = component;

  return component;
};

/**
 * @typedef ComponentProps
 * @property {object} component - Object containing the data needed to render.
 * @property {React.ReactNode} children - A React Node.
 */

/**
 * Editorial component.
 * Renders a component by looking it up in the registered types.
 *
 * @component
 * @memberof module:contents/components
 *
 * @param {ComponentProps} props - All props of component.
 *
 * @returns {ReactElement} - A registered component.
 *
 * @example
 * import Component from '@farfetch/blackout-react/content/component';
 * @example
 * <Component
 *      component={{ type, ...data }}
 *      {...props} />
 */
const Component = ({
  component,
  children,
  ...props
}: ComponentProps): ReactElement | null => {
  const { type, customType } = component;
  const typeToRender = customType || type;
  // Lookup a component based on the type
  const ComponentToRender = components[typeToRender];

  if (!ComponentToRender) {
    console.warn(
      `[react-content] No component with "type=${typeToRender}" is defined.`,
    );

    return null;
  }

  return (
    <ComponentToRender data={component} {...props}>
      {children}
    </ComponentToRender>
  );
};

export default Component;

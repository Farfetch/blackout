/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import type { ComponentType } from '@farfetch/blackout-client';

interface ComponentProps {
  component: ComponentType;
  children?: React.ReactNode;
}

type Components = Record<string, React.ElementType>;

export const components: Components = {};

/**
 * Registers a react component to be rendered for a given CMS component type.
 *
 * @param type      - Component type. Should be the exact component type in the CMS.
 * @param component - Component to be registered.
 *
 * @returns Ready component.
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
 * Editorial component. Renders a component by looking it up in the registered
 * types.
 *
 * @example
 * ```
 * import Component from '@farfetch/blackout-react/content/component';
 * ```
 * @example
 * ```
 * <Component
 *      component={{ type, ...data }}
 *      {...props} />
 * ```
 *
 * @param props - All props of component.
 *
 * @returns - A registered component.
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

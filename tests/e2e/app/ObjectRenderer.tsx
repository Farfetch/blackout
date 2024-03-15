import React from 'react';

export const FULL_OBJECT_VALUE_TEST_ID = '__FULL_OBJECT__';

const makeObjectJsonStringifiable = (
  objectOrArray: Record<string, unknown> | Array<unknown>,
) => {
  if (!objectOrArray) {
    return objectOrArray;
  }

  return Object.keys(objectOrArray).reduce((acc, key) => {
    const value = objectOrArray[key];

    switch (typeof value) {
      case 'function': {
        acc[key] = `Function: ${value.name ? value.name : '<anonymous>'}`;
        break;
      }
      case 'object': {
        acc[key] = makeObjectJsonStringifiable(value);
        break;
      }
      case 'undefined': {
        acc[key] = objectOrArray[key] = 'undefined';
        break;
      }
      default: {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};

const renderJsonElement = (data: Record<string, unknown> | Array<unknown>) => {
  const stringifiableObject = makeObjectJsonStringifiable(data);

  return (
    <span className="p-2">{JSON.stringify(stringifiableObject, null, 2)}</span>
  );
};

const renderObject = (
  data: Record<string, unknown> | Array<unknown>,
  currentProp = '',
  header = '',
) => {
  return (
    <table
      className={`border-coxllapse border border-[#30363d] ${
        currentProp ? 'm-1' : ''
      }`}
    >
      {header && (
        <thead className="w-full bg-[#121b27b8]">
          <tr className="border-b border-b-[#30363d]">
            <th className="p-4 text-lg text-start" colSpan={2}>
              {header}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {Object.keys(data).map(key => {
          const fullyQualifiedPropertyName = currentProp
            ? `${currentProp}.${key}`
            : key;

          return (
            <tr key={key}>
              <td className="py-2 px-4 bg-[#161b22] font-semibold align-top">
                {key}
              </td>
              <td
                className="bg-[#121212]"
                data-testid={`${fullyQualifiedPropertyName}`}
              >
                {renderItem(data[key], fullyQualifiedPropertyName)}
              </td>
            </tr>
          );
        })}
        {!currentProp && (
          <tr key={'__full-object-json-row'}>
            <td className="py-2 px-4 bg-[#161b22] font-semibold align-top">
              Full Object
            </td>
            <td
              className="bg-[#121212]"
              data-testid={FULL_OBJECT_VALUE_TEST_ID}
            >
              {renderJsonElement(data)}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const renderItem = (data: unknown, currentProp: string | undefined) => {
  switch (typeof data) {
    case 'object':
      if (data === null) {
        return <span className="py-2 px-4">null</span>;
      }

      return renderObject(
        data as Record<string, unknown>,
        currentProp,
        undefined,
      );

    case 'function': {
      return (
        <span className="py-2 px-4">{`Function: ${
          data.name ? data.name : '<anonymous>'
        }`}</span>
      );
    }
    default:
      return <span className="py-2 px-4">{`${data}`}</span>;
  }
};

export type ObjectRendererProps = {
  data: Record<string, unknown> | Array<unknown>;
  header?: string;
};

const ObjectRenderer: React.FC<ObjectRendererProps> = ({ data, header }) => {
  return renderObject(data, '', header);
};

export default ObjectRenderer;

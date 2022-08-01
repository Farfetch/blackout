/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This plugin transformer replaces any expressions that import/requires
 * package.json files with the values requested from the package.json. Make sure
 * it is applied as the first plugin in the plugins array to avoid having some
 * plugin transforming the code to another tree that will not work with this implementation.
 *
 * @example
 * // Input
 * const \{ name, version \} = require('./package.json');
 * // Output
 * const name = 'my-package-name', version = '1.0.0';
 */

const path = require('path');

module.exports = function packageJsonTransformer({ types: t }) {
  const isCallExpressionRequireOfPackageJson = callExpression => {
    const isRequireCall = callExpression.callee.name === 'require';

    if (!isRequireCall) {
      return false;
    }

    const requireArgument = callExpression.arguments[0].value;

    return requireArgument.includes('package.json');
  };

  const findRequirePackageJsonCallExpressionFromInitializer = initializer => {
    if (!initializer) {
      return null;
    }

    let possibleRequireCallExpression;

    if (t.isCallExpression(initializer)) {
      possibleRequireCallExpression = initializer;
    } else if (
      t.isMemberExpression(initializer) &&
      t.isCallExpression(initializer.object)
    ) {
      possibleRequireCallExpression = initializer.object;
    }

    if (!possibleRequireCallExpression) {
      return null;
    }

    if (isCallExpressionRequireOfPackageJson(possibleRequireCallExpression)) {
      return possibleRequireCallExpression;
    }

    return null;
  };

  const getPackageJson = (requireCallExpression, currentFilename) => {
    const requireArgument = requireCallExpression.arguments[0].value;

    if (!requireArgument.includes('package.json')) {
      return;
    }

    const packageJsonPath = path.resolve(
      path.dirname(currentFilename),
      requireArgument,
    );

    return require(packageJsonPath);
  };

  const getProcessedDeclarators = declarator => {
    const declaratorId = declarator.id;

    if (t.isObjectPattern(declaratorId)) {
      const properties = declaratorId.properties;

      return properties.map(property => {
        return {
          name: property.value.name,
          key: property.key.name,
        };
      });
    }

    if (t.isIdentifier(declaratorId)) {
      return [
        {
          name: declaratorId.name,
          key: declarator.init.property.name,
        },
      ];
    }
  };

  const getVariableDeclaratorsWithPackageJsonValues = (
    declarator,
    packageJson,
  ) => {
    const processedDeclarators = getProcessedDeclarators(declarator);

    const returnValue = processedDeclarators.map(declarator => {
      return t.variableDeclarator(
        t.identifier(declarator.name),
        t.stringLiteral(packageJson[`${declarator.key}`]),
      );
    });

    return returnValue;
  };

  return {
    name: 'packageJsonTransformer',
    visitor: {
      VariableDeclaration(path) {
        const declarations = path.node.declarations;
        let variableDeclarators = [];

        declarations.forEach(declarator => {
          if (!t.isVariableDeclarator(declarator)) {
            return;
          }

          const requirePackageJsonCallExpression =
            findRequirePackageJsonCallExpressionFromInitializer(
              declarator.init,
            );

          if (requirePackageJsonCallExpression) {
            const packageJson = getPackageJson(
              requirePackageJsonCallExpression,
              this.file.opts.filename,
            );

            const resultValue = getVariableDeclaratorsWithPackageJsonValues(
              declarator,
              packageJson,
            );

            variableDeclarators = variableDeclarators.concat(resultValue);
          }
        });

        if (variableDeclarators.length) {
          path.replaceWith(
            t.variableDeclaration(path.node.kind, variableDeclarators),
          );
        }
      },

      ImportDeclaration(path) {
        if (path.node.source.value.includes('package.json')) {
          const p = require(path.node.source.value, this.file.opts.filename);
          const specifiers = path.node.specifiers;

          const variableDeclarators = specifiers.map(specifier => {
            return t.variableDeclarator(
              t.identifier(specifier.local.name),
              t.stringLiteral(p[`${specifier.imported.name}`]),
            );
          });

          path.replaceWith(t.variableDeclaration('const', variableDeclarators));
        }
      },
    },
  };
};

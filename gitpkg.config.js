module.exports = function getGitPkgConfig() {
  return {
    getTagName: pkg => {
      const { execSync } = require('child_process');

      const branchName = execSync('git rev-parse --abbrev-ref HEAD')
        .toString('utf8')
        .replace(/[\n\r\s]+$/, '')
        .replace(/[_]/g, '-');

      const date = new Date().toISOString().replace(/[:]/g, '-');

      return `${pkg.name}-${branchName}-v${pkg.version}-${date}-gitpkg`;
    },
  };
};

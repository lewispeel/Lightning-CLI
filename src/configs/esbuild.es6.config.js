const helpers = require('../helpers/build')
const os = require('os')
const alias = require('../plugins/esbuild-alias')
const path = require('path')

module.exports = (folder, globalName) => {
  const sourcemap =
    process.env.LNG_BUILD_SOURCEMAP === 'true'
      ? true
      : process.env.LNG_BUILD_SOURCEMAP === 'inline'
      ? 'inline'
      : false

  return {
    plugins: [
      alias([
        { find: '@', filter: /@\//, replace: path.resolve(process.cwd(), 'src/') },
        { find: '~', filter: /~\//, replace: path.resolve(process.cwd(), 'node_modules/') },
      ]),
    ],
    entryPoints: [`${process.cwd()}/src/index.js`],
    bundle: true,
    outfile: `${folder}/appBundle.js`,
    minifyWhitespace: true,
    sourcemap,
    format: 'iife',
    globalName,
    banner: [
      '/*',
      ` App version: ${helpers.getAppVersion()}`,
      ` SDK version: ${helpers.getSdkVersion()}`,
      ` CLI version: ${helpers.getCliVersion()}`,
      '',
      ` gmtDate: ${new Date().toGMTString()}`,
      '*/',
    ].join(os.EOL),
  }
}
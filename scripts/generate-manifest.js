const { writeFile } = require('fs').promises;
const { name, description, version } = require('../package.json');
const { join } = require('path');

const main = async () => {
  const manifest = {
    name,
    description,
    version,
    manifest_version: 3,
    icons: {
      16: 'icons/icon16.png',
      32: 'icons/icon32.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
      192: 'icons/icon192.png',
      512: 'icons/icon512.png',
    },
    action: {
      default_popup: 'views/popup.html',
    },
    options_ui: {
      page: 'views/options.html',
      open_in_tab: false,
    },
    content_scripts: [
      {
        matches: ['*://*.powerlanguage.co.uk/*'],
        js: ['src/content-script.js'],
      },
    ],
  };

  return writeFile(
    join(__dirname, '../manifest.json'),
    JSON.stringify(manifest, null, 2),
    { encoding: 'utf-8' }
  );
};

return main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    return process.exit(1);
  });

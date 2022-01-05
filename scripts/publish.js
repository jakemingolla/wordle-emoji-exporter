const fs = require('fs');
const archiver = require('archiver');
const { join } = require('path');

const { name, version } = require('../package.json');

const output = fs.createWriteStream(
  join(__dirname, '../dist', name + '-' + version + '.zip')
);
const archive = archiver('zip');

output.on('close', () => {
  console.log(
    archive.pointer() +
      ' total bytes zipped to dist/' +
      name +
      '-' +
      version +
      '.zip'
  );
});

archive.on('warning', (err) => {
  if (err.code !== 'ENOENT') {
    // throw error
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

archive.directory('src/');
archive.directory('views/');
archive.directory('icons/');
archive.file('manifest.json', { name: 'manifest.json' });

archive.finalize();

'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');

const inlineResources = require('./inline-resources');


const libName = 'wallet';
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

_relativeCopy(`**/*`, srcFolder, tempLibFolder)
  .then(() => inlineResources(tempLibFolder))
// Compile to ES2015.
.then(() => Promise.resolve(ngc(['-p',`${tempLibFolder}/tsconfig.json`])))
// Compile to ES5.
.then(() => Promise.resolve(ngc(['-p',`${tempLibFolder}/tsconfig.es5.json`])))
// Copy typings and metadata to `dist/` folder.
.then(() => Promise.resolve()
  .then(() => _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder))
.then(() => _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder))
.then(() => console.log('Typings and metadata copy succeeded.'))
)
// Bundle lib.
.then(() => {
  // Base configuration.
  const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
const rollupBaseConfig = {
  external: [],
  plugins: [
    sourcemaps()
  ]
};

// UMD bundle.
const umdConfig = Object.assign({}, rollupBaseConfig, {
  input: es5Entry,
  output: {
    name: camelCase(libName),
    sourcemap: true,
    globals: {
      '@angular/core': 'ng.core'
    },
    file: path.join(distFolder, `bundles`, `${libName}.umd.js`),
    format: 'umd'
  }
});

// Minified UMD bundle.
const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
  input: es5Entry,
  output: {
    name: camelCase(libName),
    sourcemap: true,
    globals: {
      '@angular/core': 'ng.core'
    },
    file: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
    format: 'umd'
  },
  plugins: rollupBaseConfig.plugins.concat([uglify({})])
});

// ESM+ES5 flat module bundle.
const fesm5config = Object.assign({}, rollupBaseConfig, {
  input: es5Entry,
  output: {
    name: camelCase(libName),
    sourcemap: true,
    globals: {
      '@angular/core': 'ng.core'
    },
    file: path.join(distFolder, `${libName}.es5.js`),
    format: 'es'
  }
});

// ESM+ES2015 flat module bundle.
const fesm2015config = Object.assign({}, rollupBaseConfig, {
  input: es2015Entry,
  output: {
    name: camelCase(libName),
    sourcemap: true,
    globals: {
      '@angular/core': 'ng.core'
    },
    file: path.join(distFolder, `${libName}.js`),
    format: 'es'
  }
});

const allBundles = [
  umdConfig,
  minifiedUmdConfig,
  fesm5config,
  fesm2015config
].map(cfg => {
  console.log(JSON.stringify(cfg))
rollup.rollup(cfg).then(bundle => bundle.write(cfg.output));
});

return Promise.all(allBundles)
  .then(() => console.log('All bundles generated successfully.'))
})
// Copy package files
.then(() => Promise.resolve()
  .then(() => _relativeCopy('LICENSE', rootFolder, distFolder))
.then(() => _relativeCopy('package.json', rootFolder, distFolder))
.then(() => _relativeCopy('README.md', rootFolder, distFolder))
.then(() => console.log('Package files copy succeeded.'))
)
.catch(e => {
  console.error('\Build failed. See below for errors.\n');
console.error(e);
process.exit(1);
});


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
    if (err) reject(err);
    files.forEach(file => {
      const origin = path.join(from, file);
    const dest = path.join(to, file);
    const data = fs.readFileSync(origin, 'utf-8');
    _recursiveMkDir(path.dirname(dest));
    fs.writeFileSync(dest, data);
    resolve();
  })
  })
});
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

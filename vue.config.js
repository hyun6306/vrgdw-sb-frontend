const { defineConfig } = require('@vue/cli-service');
const path = require('path');

let entryV = '';
let entryVb = '';
let outputDirV = '';
let scssDir = '';

let localhostRg = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiMnVeQKUHJDjW2y71jtk+wteqHQ1mRMIXzEcGIrzZpzzNTakk0yR9UcO/hzNodVsIiqQNVtxmmYt';
let domainRg = 'upVcPE+wPOmtLjqyBIh9RoBwWAefaNXUWdW9bu2N+23B0YNMVhWTg/t6m6UA+pl2Ad7ebPs5Hfmbw6tv6aeLNlgtRauUG9epNWfjyB7VEh3/MXU9yfRrwTU2pJNMkfVHXHvx9fjAvFZdutHaj0ftYte9DtRkTm1qm8ZFgFuEppxpkbEZiC58Jg==';

let licence = '';
let version = '0.6';

if (process.env.VUE_APP_MODE.includes('MOBILE')) {
  entryV = 'src-m/main.js';
  entryVb = 'srcbm/main.js';
  outputDirV = 'build-m';
  scssDir = `@import "@m/assets/scss/_mixin.scss";`;
} else {
  entryV = 'src/main.js';
  entryVb = 'srcb/main.js';
  outputDirV = 'build';
  scssDir = `@import "@/assets/scss/_mixin.scss";`;
}

if (process.env.VUE_APP_MODE.includes('BUILD')) {
  licence = domainRg;
} else {
  licence = localhostRg;
}

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: scssDir,
      },
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    // config.output.filename = 'js/[name].[hash].js';
    // config.output.chunkFilename = 'js/[name].[hash].js';
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
        '@wb': path.join(__dirname, 'srcb/'),
        '@m': path.join(__dirname, 'src-m/'),
        '@mb': path.join(__dirname, 'srcbm/'),
        // "@mb": path.join(__dirname, "src-mb/"),
      },
    },

    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[hash].js',
    },
  },

  outputDir: outputDirV,

  pages: {
    index: {
      entry: entryV,
      template: 'public/index.html',
      filename: 'index.html',
      title: 'D-Sales',
      version: version,
      realGrid: licence,
    },
    b: {
      entry: entryVb,
      template: 'public/board.html',
      filename: 'board.html',
      title: 'D-Sales',
      version: version,
      realGrid: licence,
    },
    // m: {
    //   entry: 'src-m/main.js',
    //   template: 'public/mobile.html',
    //   filename: 'mobile.html',
    // },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false,
    },
  },
});

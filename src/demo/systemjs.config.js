/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/flex-layout': 'npm:@angular/flex-layout/bundles/flex-layout.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
      '@angular/cdk/accordion': 'npm:@angular/cdk/bundles/cdk-accordion.umd.js',
      '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
      '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
      '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
      '@angular/cdk/layout': 'npm:@angular/cdk/bundles/cdk-layout.umd.js',
      '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
      '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
      '@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',
      '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
      '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
      '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
      '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
      '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
      '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',


      // other libraries
      'rxjs': 'npm:rxjs',
      'randomhex': 'npm:randomhex/src/index.js',
      'underscore': 'npm:underscore/underscore-min.js',
      'swarm-js': 'npm:swarm-js/src/swarm.js',
      'ethjs-unit': 'npm:ethjs-unit/dist/ethjs-unit.min.js',
      'waves-api': 'npm:waves-api/dist/waves-api.js',
      'tslib': 'npm:tslib/tslib.js',

      '@bindoc/loading': 'npm:@bindoc/loading/bundles/loading.umd.min.js',

      '@scienceroot/design': 'npm:@scienceroot/design/bundles/design.umd.min.js',
      '@scienceroot/security': 'npm:@scienceroot/security/bundles/security.umd.min.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'wallet': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);

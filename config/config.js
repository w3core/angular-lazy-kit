var config = {
  VERSION: '1.0.0',
  baseUrl: '/',
  componentsURL: 'component',
  viewsURL: 'view',
  libsURL: 'lib',
  apiURL: 'api',
  map: {
    '*': {
      'css': 'https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.8/css.min.js'
    }
  },
  paths: {
    'app': 'app',
    'angular': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min',
    'angular-resource': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-resource.min',
    'angular-ui-router': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min',
    'angular-async-loader': 'https://rawgit.com/subchen/angular-async-loader/master/angular-async-loader.min',
    'ckeditor': 'https://cdn.ckeditor.com/4.5.11/standard/ckeditor',
    'ngCkeditor': 'https://cdnjs.cloudflare.com/ajax/libs/ng-ckeditor/0.2.1/ng-ckeditor',
    'tableview': 'lib/angular.tableview/angular.tableview',
    'fileimage': 'component/directive/fileimage/fileimage',
    'spinner': 'component/directive/spinner/spinner',
    'layout-subheader': 'view/default/subheader/subheader',
  },
  appBootModules: ['angular', 'angular-resource', 'angular-ui-router', 'angular-async-loader', 'layout-subheader', 'app'],
  appDependencyModules: ['ngResource', 'ui.router'],
  shim: {
    'angular': {exports: 'angular'},
    'angular-resource': {deps: ['angular']},
    'angular-ui-router': {deps: ['angular']},
    'ngCkeditor': {deps:['ckeditor']},
    'tableview': {deps: [
        'css!lib/angular.tableview/angular.tableview',
        'css!lib/angular.tableview/angular.tableview.material'
      ]},
  }
};

var resourceURLs = {
  directive: config.componentsURL,
  factory: config.componentsURL,
  filter: config.componentsURL,
  provider: config.componentsURL,
  service: config.componentsURL,
  view: config.viewsURL,
  lib: config.libsURL
};

/**
 * Return object with paths to modules like as requirejs and paths to modules resources (css, html)
 * @param {String} resourceType - [directive, factory, filter, provider, service, view, lib]
 * @param {String} resourceName
 * @returns {Object|null}
 */
config.$path = function (resourceType, resourceName) {
  if (!(resourceType in resourceURLs)) return null;

  var path = [];
  var resourceNameParts = resourceName.split('/');

  path.push(resourceURLs[resourceType]);

  if (resourceType !== 'view' && resourceType !== 'lib') {
    path.push(resourceType);
  }

  path.push(resourceName);

  if (resourceNameParts.length > 1) {
    path.push(resourceNameParts.pop());
  }

  path = path.join('/');

  return {controller: path, template: path + '.html', css: path + '.css'};
};
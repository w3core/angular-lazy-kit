define(function (require, exports, module) {
  var angular = require('angular');
  var app = angular.module('app', config.appDependencyModules);
  var asyncLoader = require('angular-async-loader');

  asyncLoader.configure(app);
  module.exports = app;

  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider

      // Content
      .state('content/banners', {
        url: '/',
        title: 'Banners',
        templateUrl: config.$path('view', 'content/banners').template,
        controllerUrl: config.$path('view', 'content/banners').controller,
        controller: 'contentBanners'
      })
      .state('content/static', {
        title: 'Static content',
        url: '/content/static',
        templateUrl: config.$path('view', 'content/static').template,
        controllerUrl: config.$path('view', 'content/static').controller,
        controller: 'contentStatic'
      })

      // System
      .state('system/user', {
        title: 'System user profile',
        url: '/system/user',
        templateUrl: config.$path('view', 'system/user').template,
        controllerUrl: config.$path('view', 'system/user').controller,
        controller: 'systemUser'
      })
    ;

  });

  app.run(function ($state, $stateParams, $rootScope, $http) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$title = '';
    $rootScope.redraw = function redraw () {
      if (!$rootScope.$$phase) $rootScope.$digest();
    };

    $rootScope.$layout = {$content: true, $subheader: false};

    $rootScope.$on('$stateChangeStart', function (event, next) {
      $rootScope.$layout.$subheader = config.$path('view', 'default/subheader').template;
      $rootScope.$title = next.title || '';
    });

    /**
     * angular-async-loader does not checks that the module is already exists.
     * It causes an error in AngularJS.
     * Follow hack solves this issue
     */
    var _useModule = app.useModule,
        _registeredModules = {};
    app.useModule = function (name) {
      if (!_registeredModules[name]) {
        _registeredModules[name] = true;
        _useModule(name);
      }
      return app;
    };

    function initHTTPSpinner () {
      var $spinner = new (require('Spinner'));
      $spinner.node.setAttribute('spinner-modal', true);

      $rootScope.$watch(
        function () {
          return $http.pendingRequests.length > 0 && !document.querySelector('.spinner');
        },
        function (status) {
          setTimeout(function(){
            if (status) $spinner.show(document.body);
            else $spinner.hide();
          }, 0);
        }
      );
    }
    initHTTPSpinner();
  });

});
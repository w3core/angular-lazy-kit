define(function (require) {
  require(['app'], function (app) {
      app.controller('defaultSubheader', function ($scope) {
          console.log('defaultSubheader ctrl run');
      });
  });
});
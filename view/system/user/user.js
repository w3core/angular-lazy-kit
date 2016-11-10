define(['app', 'fileimage', 'spinner'], function (app, fileimage) {
  app.useModule('fileimage');
  app.useModule('spinner');
  app.controller('systemUser', function systemUser($scope) {
    console.log(arguments.callee.name);

    $scope.imageHandler = function () {
      console.log(arguments.callee.name, arguments);
    };
  });
});
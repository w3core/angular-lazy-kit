define(["Spinner"], function (Spinner) {
angular
.module("spinner", [])
.directive("spinner", function ($compile) {
  return {
    restrict: "A",
    scope: {
      spinner: "=",
      spinnerPrepend: "="
    },
    compile: function ($element, $attr) {
      return function ($scope, $element, $attr) {
        var spinner = new Spinner(), root = $element[0];
        $scope.$watch("spinner", function (status) {
          if (status) spinner.show(root, $scope.spinnerPrepend);
          else spinner.hide();
        });
      };
    }
  };
});
});
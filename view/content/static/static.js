define([config.$path('factory', 'Content.resource').controller, 'tableview', 'app', 'ngCkeditor'], function (Content, tableview, app) {

  app.useModule('tableview').useModule('ngCkeditor');

  app.controller('contentStatic', function contentStatic($scope, Content) {

    $scope.staticList = [];
    $scope.content = {};
    $scope.showEdit = false;

    $scope.editorOptions = {
      height: '13.8em'
    };

    $scope.edit = function($row){
      $scope.showEdit = true;
      $scope.content = $row;
    };

    $scope.cancel = function(){
      $scope.showEdit = false;
    }

    $scope.save = function(){
      $scope.showEdit = false;
    }

    $scope.addContent = function(){
      $scope.showEdit = true;
    }

    $scope.tableContentOptions = {
      columns:
        [
          {field: 'id', title: 'Id', sortable: true, template: {'body.cell': 'static.body.cell.id'}},
          {field: 'name', title: 'Name', sortable: true},
          {field: 'status', title: 'Status', sortable: true, template: {'body.cell': 'static.body.cell.status'}},
          {name: 'manage', title: 'Manage', template: {'body.cell': 'static.body.cell.manage'}}
        ],
      provider: requestStaticList,
      request: {limit: 10},
      multisorting: false,
      limits: [10, 25, 50, 100]
    };

    function requestStaticList (request, callback) {
      Content.getStaticList(request).$promise.then(function(response) {

        $scope.staticList = response.data;

        callback({
          page: request.page,
          limit: request.limit,
          amount: 100,
          rows: $scope.staticList
        });
      });
    };
  });
});
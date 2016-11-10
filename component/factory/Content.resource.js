define(['app'], function (app) {
  app.factory('Content', function ($resource) {
    return $resource(config.apiURL + '/:action:page:stub', {}, {
      getBannerList: {method: 'GET', params: {action: 'bannerList', stub: '.json'}},
      getStaticList: {method: 'GET', params: {action: 'staticList', stub: '.json'}}
    });
  });
});
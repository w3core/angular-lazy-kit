(new function(window, document, require){
  require.config({
    baseUrl: '/',
    waitSeconds: 120,
    paths: {
      config: '/config/config'
    }
  });
  
  require(['config'], function () {
    require.config(config);
    window.config = config;
  
    require(config.appBootModules, function (angular) {
      document.getElementsByTagName('html')[0].setAttribute('ng-app', '');
      angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
      });
    });
  });

  define("Spinner", [], function () {
    return function Spinner () {
      var node;
      __construct();

      this.node = node;
      this.show = show;
      this.hide = hide;

      function __construct () {
        var root = document.createElement('div');
        root.innerHTML = '<div class="spinner"><svg class="md-spinner" viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" /></svg></div>';
        node = root.children[0];
        root.removeChild(node);
      }

      function show (root, prepend) {
        if (root && !node.parentNode) {
          if (prepend && root.children[0]) root.insertBefore(node, root.children[0]);
          else root.appendChild(node);
        }
      }

      function hide () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }
    };
  });
  require(["Spinner"]);

  setInterval(function(){
    var h=document.getElementById('head'),
        b=document.getElementById('body'),
        v=(h?h.offsetHeight:0)+'px';
    if (b&&b.style.top!=v)b.style.top=v;
  }, 0);

}(window, document, require));
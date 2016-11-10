angular
.module("fileimage", [])
.directive("fileimage", function ($compile) {

  function UIInputImage (src, node, handler, required, accept) {
    var attr = "src";
    function __construct () {
      resetFile(src);
      node.querySelector("button").addEventListener("click", function () {
        resetFile(src);
        handler(node.querySelector("input[type=file]"), src);
      }, false);
    }
    function setImageURL (url) {
      var url = url || "", img = node.querySelector('i');
      node.setAttribute(attr, url);
      img.style.backgroundImage = url ? 'url("' + url + '")' : 'none';
    }
    function readFile (node, handler) {
      var reader = new FileReader();
      reader.onload = handler;
      reader.readAsDataURL(node.files[0]);
    }
    function resetFile (url) {
      var file = document.createElement("input");
      file.type = "file";
      if (accept) file.accept = accept;
      if (required) file.required = true;
      file.addEventListener("change", function (e) {
        readFile(e.target, function (e) {
          setImageURL(e.target.result);
          handler(file, e.target.result);
        });
      }, false);
      var _file = node.querySelector("input[type=file]");
      if (_file) _file.parentNode.removeChild(_file);
      node.insertBefore(file, node.children[0]);
      setImageURL(url);
    }
    __construct();
  }

  return {
    restrict: "A",
    scope: {
      fileimage: "=",
      fileimageSrc: "=",
      icon: "="
    },
    template: ''
      + '<label class="ui-input-image">'
      + '<input type="file" />'
      + '<button class="ui-button ui-button-secondary">&times;</button>'
      + '<i class="ico ico-{{icon||defaultIcon}}"></i>'
      + '</label>'
    ,
    compile: function ($element, $attr) {
      return function ($scope, $element, $attr) {
        $scope.defaultIcon = 'add';

        UIInputImage(
          $scope.fileimageSrc,
          $element[0].querySelector("label"),
          $scope.fileimage,
          typeof $attr.required != "undefined",
          "image/*"
          );
      };
    }
  };
});
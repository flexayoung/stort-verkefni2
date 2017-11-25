"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoLoader = function () {
  function VideoLoader(container) {
    _classCallCheck(this, VideoLoader);

    this.container = container;
    this.load();
  }

  _createClass(VideoLoader, [{
    key: "load",
    value: function load() {
      var http = new XMLHttpRequest();

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          this.storeData(http.response);
        }
      }.bind(this);

      http.open("GET", "videos.json", true);
      http.send();
    }
  }, {
    key: "storeData",
    value: function storeData(data) {
      var dataObject = JSON.parse(data);
      this.categories = dataObject.categories;
      this.videos = dataObject.videos;
    }
  }]);

  return VideoLoader;
}();

document.addEventListener('DOMContentLoaded', function () {
  var videoLoader = new VideoLoader(document.querySelector('main'));
});

//# sourceMappingURL=script-compiled.js.map
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoLoader = function () {
  function VideoLoader() {
    _classCallCheck(this, VideoLoader);

    this.container = document.querySelector('main');
  }

  _createClass(VideoLoader, [{
    key: 'load',
    value: function load() {
      var savedData = window.localStorage.getItem(this.keyName);

      if (savedData) {
        var parsed = JSON.parse(savedData);
        var date = new Date(parsed.date);

        this.create(parsed.title, date);
      }
    }
  }]);

  return VideoLoader;
}();

document.addEventListener('DOMContentLoaded', function () {
  var videoLoader = new VideoLoader();
  videoLoader.load();
});

//# sourceMappingURL=script-compiled.js.map
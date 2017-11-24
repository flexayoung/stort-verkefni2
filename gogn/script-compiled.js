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
          this.constructData();
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
  }, {
    key: "constructData",
    value: function constructData() {
      for (var i = 0; i < this.categories.length; i++) {
        var category = document.createElement("div");
        category.className = "category";

        var h1 = document.createElement("H1");
        var textNode = document.createTextNode(this.categories[i].title);

        h1.appendChild(textNode);
        category.appendChild(h1);

        var videoContainer = document.createElement("div");
        videoContainer.className = "videolist";

        var row = document.createElement("div");
        row.className = "videolist__row";

        for (var k = 0; k < this.categories[i].videos.length; k++) {
          var video = this.categories[i].videos[k];

          var col = document.createElement("div");
          col.className = "videolist__col";

          var card = document.createElement("div");
          card.className = "card";

          var imageContainer = document.createElement("div");
          imageContainer.className = "card__image";

          var image = document.createElement("IMG");
          image.className = "card__img";
          image.src = this.getPosterFromId(video);

          imageContainer.appendChild(image);
          card.appendChild(imageContainer);

          console.log(card);

          var content = document.createElement("div");
          content.className = "card__content";

          var h3 = document.createElement("H3");
          var _textNode = document.createTextNode(this.getTitleFromId(video));

          h3.appendChild(_textNode);
          content.appendChild(h3);

          var p = document.createElement("p");
          p.innerHTML = "Fyrir 1 degi síðan";

          content.appendChild(p);
          card.appendChild(content);
          col.append(card);

          row.append(col);
        }
        videoContainer.appendChild(row);
        category.appendChild(videoContainer);

        var border = document.createElement("div");
        border.className = "category__border";

        category.appendChild(border);

        this.container.appendChild(category);
      }
    }
  }, {
    key: "getTitleFromId",
    value: function getTitleFromId(videoId) {
      var id = videoId;
      for (var i = 0; i < this.videos.length; i++) {
        if (this.videos[i].id == id) return this.videos[i].title;
      }
    }
  }, {
    key: "getPosterFromId",
    value: function getPosterFromId(videoId) {
      var id = videoId;
      for (var i = 0; i < this.videos.length; i++) {
        if (this.videos[i].id == id) return this.videos[i].poster;
      }
    }
  }]);

  return VideoLoader;
}();

document.addEventListener('DOMContentLoaded', function () {
  var videoLoader = new VideoLoader(document.querySelector('main'));
});

//# sourceMappingURL=script-compiled.js.map
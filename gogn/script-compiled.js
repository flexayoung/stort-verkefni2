'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoLoader = function () {
  function VideoLoader(container) {
    _classCallCheck(this, VideoLoader);

    this.container = container;
  }

  _createClass(VideoLoader, [{
    key: 'load',
    value: function load() {
      var http = new XMLHttpRequest();

      http.open('GET', './videos.json', true);

      http.onload = function checkState() {
        console.log("HERE");

        if (http.status >= 200 && http.status < 400) {
          this.storeData(http.response);
          this.constructData();
        }
      }.bind(this);

      http.send();
    }
  }, {
    key: 'storeData',
    value: function storeData(data) {
      var dataObject = JSON.parse(data);
      this.categories = dataObject.categories;
      this.videos = dataObject.videos;
    }
  }, {
    key: 'constructData',
    value: function constructData() {
      for (var i = 0; i < this.categories.length; i += 1) {
        var category = document.createElement('div');
        category.className = 'category';

        var h1 = document.createElement('H1');
        var textNode = document.createTextNode(this.categories[i].title);

        h1.appendChild(textNode);
        category.appendChild(h1);

        var videoContainer = document.createElement('div');
        videoContainer.className = 'videolist';

        var row = document.createElement('div');
        row.className = 'videolist__row';

        for (var k = 0; k < this.categories[i].videos.length; k += 1) {
          var video = this.getVideoFromId(this.categories[i].videos[k]);

          var col = document.createElement('div');
          col.className = 'videolist__col';

          var card = document.createElement('a');
          card.className = 'card';
          card.href = '/player.html?id=' + video.id;

          var imageContainer = document.createElement('div');
          imageContainer.className = 'card__image';

          var image = document.createElement('IMG');
          image.className = 'card__img';
          image.src = video.poster;

          var length = document.createElement('span');
          length.className = 'card__length';
          length.innerHTML = this.getLengthString(video.duration);

          imageContainer.appendChild(image);
          imageContainer.appendChild(length);
          card.appendChild(imageContainer);

          var content = document.createElement('div');
          content.className = 'card__content';

          var h3 = document.createElement('H3');
          textNode = document.createTextNode(video.title);
          h3.className = 'card__heading';

          h3.appendChild(textNode);
          content.appendChild(h3);

          var p = document.createElement('p');
          p.innerHTML = this.getAgeOfVideo(video.created);

          content.appendChild(p);
          card.appendChild(content);
          col.append(card);

          row.append(col);
        }
        videoContainer.appendChild(row);
        category.appendChild(videoContainer);

        var border = document.createElement('div');
        border.className = 'category__border';

        category.appendChild(border);

        this.container.appendChild(category);
      }
    }
  }, {
    key: 'getVideoFromId',
    value: function getVideoFromId(videoId) {
      var id = videoId;
      for (var i = 0; i < this.videos.length; i += 1) {
        if (this.videos[i].id === id) return this.videos[i];
      }
      return null;
    }
  }, {
    key: 'getLengthString',
    value: function getLengthString(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      if (seconds < 10) seconds = '0' + seconds;
      return minutes + ':' + seconds;
    }
  }, {
    key: 'getAgeOfVideo',
    value: function getAgeOfVideo(dateCreated) {
      var age = new Date(dateCreated);
      var now = new Date();
      var diff = now - age;
      var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      var hours = Math.ceil(diff / (1000 * 60) % 60);

      if (days > 365) {
        var year = Math.floor(days / 365);
        if (year === 1) return 'Fyrir ' + year + ' \xE1ri s\xED\xF0an';
        return 'Fyrir ' + year + ' \xE1rum s\xED\xF0an';
      } else if (days > 30) {
        var month = Math.floor(days / 30);
        if (month === 1) return 'Fyrir ' + month + ' m\xE1nu\xF0i s\xED\xF0an';
        return 'Fyrir ' + month + ' m\xE1nu\xF0um s\xED\xF0an';
      } else if (days > 7) {
        var week = Math.floor(days / 7);
        if (week === 1) return 'Fyrir ' + week + ' viku s\xED\xF0an';
        return 'Fyrir ' + week + ' vikum s\xED\xF0an';
      } else if (hours > 24) {
        if (days === 1) return 'Fyrir ' + days + ' degi s\xED\xF0an';
        return 'Fyrir ' + days + ' d\xF6gum s\xED\xF0an';
      }

      if (hours === 1) return 'Fyrir ' + hours + ' klukkut\xEDma s\xED\xF0an';
      return 'Fyrir ' + hours + ' klukkut\xEDmum s\xED\xF0an';
    }
  }]);

  return VideoLoader;
}();

document.addEventListener('DOMContentLoaded', function () {

  //  if (window.location.pathname === '/') {
  console.log("baba");
  var videoLoader = new VideoLoader(document.querySelector('#index'));
  videoLoader.load();
  //}
});

//# sourceMappingURL=script-compiled.js.map
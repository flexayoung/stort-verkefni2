
class VideoLoader {
  constructor(container) {
    this.container = container;
    this.load();
  }

  load() {
    let http = new XMLHttpRequest();

    http.onreadystatechange = function () {
      if(http.readyState == 4 && http.status == 200) {
        this.storeData(http.response);
      }
    }.bind(this);

    http.open("GET", "videos.json", true);
    http.send();
  }


storeData(data) {
  let dataObject = JSON.parse(data);
  this.categories = dataObject.categories;
  this.videos = dataObject.videos;
}

}

document.addEventListener('DOMContentLoaded', () => {
  const videoLoader = new VideoLoader(document.querySelector('main'));
});

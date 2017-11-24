class VideoLoader {
  constructor(container) {
    this.container = container;
    this.load();
  }

  load() {
    let http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        this.storeData(http.response);
        this.constructData();

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

  constructData() {
    for (var i = 0; i < this.categories.length; i++) {
      let category = document.createElement("div");
      category.className = "category"

      let h1 = document.createElement("H1");
      let textNode = document.createTextNode(this.categories[i].title);

      h1.appendChild(textNode)
      category.appendChild(h1);

      let videoContainer = document.createElement("div");
      videoContainer.className = "videolist";

      let row = document.createElement("div");
      row.className = "videolist__row";


      for (var k = 0; k < this.categories[i].videos.length; k++) {
        let video = this.categories[i].videos[k];

        let col = document.createElement("div");
        col.className = "videolist__col";

        let card = document.createElement("div");
        card.className = "card";

        let imageContainer = document.createElement("div");
        imageContainer.className = "card__image";

        let image = document.createElement("IMG");
        image.className = "card__img";
        image.src = this.getPosterFromId(video);

        imageContainer.appendChild(image);
        card.appendChild(imageContainer);

        console.log(card);

        let content = document.createElement("div");
        content.className = "card__content";

        let h3 = document.createElement("H3");
        let textNode = document.createTextNode(this.getTitleFromId(video));

        h3.appendChild(textNode)
        content.appendChild(h3);

        let p = document.createElement("p");
        p.innerHTML = "Fyrir 1 degi síðan";

        content.appendChild(p);
        card.appendChild(content);
        col.append(card);

        row.append(col);
      }
      videoContainer.appendChild(row)
      category.appendChild(videoContainer);

      let border = document.createElement("div");
      border.className = "category__border";

      category.appendChild(border);

      this.container.appendChild(category);

    }

  }

  getTitleFromId(videoId) {
    let id = videoId;
    for(var i = 0; i < this.videos.length; i ++) {
      if(this.videos[i].id == id) return this.videos[i].title;
    }
  }

  getPosterFromId(videoId) {
    let id = videoId;
    for(var i = 0; i < this.videos.length; i ++) {
      if(this.videos[i].id == id) return this.videos[i].poster;
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const videoLoader = new VideoLoader(document.querySelector('main'));
});

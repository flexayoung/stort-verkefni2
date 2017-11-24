class VideoLoader {
  constructor(container) {
    this.container = container;
    this.load();
  }

  load() {
    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        this.storeData(http.response);
        this.constructData();
      }
    }.bind(this);

    http.open('GET', 'videos.json', true);
    http.send();
  }


  storeData(data) {
    const dataObject = JSON.parse(data);
    this.categories = dataObject.categories;
    this.videos = dataObject.videos;
  }

  constructData() {
    for (let i = 0; i < this.categories.length; i += 1) {
      const category = document.createElement('div');
      category.className = 'category';

      const h1 = document.createElement('H1');
      let textNode = document.createTextNode(this.categories[i].title);

      h1.appendChild(textNode);
      category.appendChild(h1);

      const videoContainer = document.createElement('div');
      videoContainer.className = 'videolist';

      const row = document.createElement('div');
      row.className = 'videolist__row';


      for (let k = 0; k < this.categories[i].videos.length; k += 1) {
        const video = this.getVideoFromId(this.categories[i].videos[k]);

        const col = document.createElement('div');
        col.className = 'videolist__col';

        const card = document.createElement('div');
        card.className = 'card';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'card__image';

        const image = document.createElement('IMG');
        image.className = 'card__img';
        image.src = video.poster;

        const length = document.createElement('span');
        length.className = 'card__length';
        length.innerHTML = this.getLengthString(video.duration);

        imageContainer.appendChild(image);
        imageContainer.appendChild(length);
        card.appendChild(imageContainer);

        const content = document.createElement('div');
        content.className = 'card__content';

        const h3 = document.createElement('H3');
        textNode = document.createTextNode(video.title);
        h3.className = 'card__heading';

        h3.appendChild(textNode);
        content.appendChild(h3);

        const p = document.createElement('p');
        p.innerHTML = this.getAgeOfVideo(video.created);

        content.appendChild(p);
        card.appendChild(content);
        col.append(card);

        row.append(col);
      }
      videoContainer.appendChild(row);
      category.appendChild(videoContainer);

      const border = document.createElement('div');
      border.className = 'category__border';

      category.appendChild(border);

      this.container.appendChild(category);
    }
  }

  getVideoFromId(videoId) {
    const id = videoId;
    for (let i = 0; i < this.videos.length; i += 1) {
      if (this.videos[i].id === id) return this.videos[i];
    }
    return null;
  }

  getLengthString(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return(`${minutes}:${seconds}`);
  }

  getAgeOfVideo(dateCreated) {
    const age = new Date();
    age.setMilliseconds(dateCreated);
    console.log(age);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videoLoader = new VideoLoader(document.querySelector('main'));
});

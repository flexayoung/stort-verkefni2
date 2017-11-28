class VideoLoader {
  constructor(container) {
    this.container = container;
  }

  load() {
    const http = new XMLHttpRequest();

    http.open('GET', './videos.json', true);

    http.onload = function checkState() {
      if (http.status >= 200 && http.status < 400) {
        this.storeData(http.response);
        this.constructData();
      }
    }.bind(this);
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

        const card = document.createElement('a');
        card.className = 'card';
        card.href = `player.html?id=${video.id}`;

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
    return (`${minutes}:${seconds}`);
  }

  getAgeOfVideo(dateCreated) {
    const age = new Date(dateCreated);
    const now = new Date();
    const diff = now - age;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const hours = Math.ceil(((diff / (1000 * 60)) % 60));

    if (days > 365) {
      const year = Math.floor(days / 365);
      if (year === 1) return `Fyrir ${year} ári síðan`;
      return `Fyrir ${year} árum síðan`;
    } else if (days > 30) {
      const month = Math.floor(days / 30);
      if (month === 1) return `Fyrir ${month} mánuði síðan`;
      return `Fyrir ${month} mánuðum síðan`;
    } else if (days > 7) {
      const week = Math.floor(days / 7);
      if (week === 1) return `Fyrir ${week} viku síðan`;
      return `Fyrir ${week} vikum síðan`;
    } else if (hours > 24) {
      if (days === 1) return `Fyrir ${days} degi síðan`;
      return `Fyrir ${days} dögum síðan`;
    }

    if (hours === 1) return `Fyrir ${hours} klukkutíma síðan`;
    return `Fyrir ${hours} klukkutímum síðan`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/') {
    const videoLoader = new VideoLoader(document.querySelector('#index'));
    videoLoader.load();
  }
});

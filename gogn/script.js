
class VideoLoader {
  constructor(container) {
    this.container = container;
  }

  load() {

  } 

document.addEventListener('DOMContentLoaded', () => {
  const videoLoader = new VideoLoader(document.querySelector('main'));
  videoLoader.load();
});

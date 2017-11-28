class VideoPlayer {
  constructor() {
    this.video = document.querySelector('.video');
    this.title = document.querySelector('h1');
    this.fullscreenBtn = document.querySelector('#fullscreen');
    this.muteBtn = document.querySelector('#mute');
    this.backwardsBtn = document.querySelector('#back');
    this.playPauseBtn = document.querySelector('#play-pause');
    this.forwardsBtn = document.querySelector('#forward');
    this.overlay = document.querySelector('.overlay_background');


    this.fullscreenBtn.addEventListener('click', this.fullscreen.bind(this));
    this.muteBtn.addEventListener('click', this.muteUnmute.bind(this));
    this.forwardsBtn.addEventListener('click', this.forwards.bind(this));
    this.backwardsBtn.addEventListener('click', this.backwards.bind(this));
    this.playPauseBtn.addEventListener('click', this.playPause.bind(this));
    this.overlay.addEventListener('click', this.playPause.bind(this));
  }

  removeBorder() {
    const navButtons = document.querySelectorAll('.nav_button');
    navButtons.forEach((e) => {
      e.classList.remove('button_border');
    });
  }

  playPause() {
    const icon = document.querySelector('#play-pause');
    const overlayIcon = document.querySelector('.overlay');
    if (this.video.paused) {
      this.video.play();
      icon.src = 'img/pause.svg';
      overlayIcon.setAttribute('style', 'visibility: hidden;');
    } else {
      this.video.pause();
      icon.src = 'img/play.svg';
      overlayIcon.setAttribute('style', 'visibility: visible;');
    }
    this.removeBorder();
    icon.classList.add('button_border');
  }

  backwards() {
    this.video.currentTime -= 3;
    this.removeBorder();
    this.backwardsBtn.classList.add('button_border');
  }

  forwards() {
    this.video.currentTime += 3;
    this.removeBorder();
    this.forwardsBtn.classList.add('button_border');
  }

  muteUnmute() {
    const icon = document.querySelector('#mute');
    if (this.video.muted) {
      this.video.muted = false;
      icon.src = 'img/mute.svg';
    } else {
      this.video.muted = true;
      icon.src = 'img/unmute.svg';
    }
    this.removeBorder();
    this.muteBtn.classList.add('button_border');
  }

  fullscreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    } else if (this.video.msRequestFullscreen) {
      this.video.msRequestFullscreen();
    }
  }

  idNotFoundError() {
    const content = document.querySelector('.grid');
    const main = document.querySelector('main');
    const errorMsg = document.createTextNode('Myndband fannst ekki...');
    const errorContainer = document.createElement('h1');
    content.hidden = true;
    errorContainer.appendChild(errorMsg);
    main.appendChild(errorContainer);
  }

  getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i += 1) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return (false);
  }

  searchForMatchingId(data, id) {
    for (let i = 0; i < data.videos.length; i += 1) {
      if (data.videos[i].id === id) return data.videos[i];
    }
    if (data.videos.id !== id) {
      this.idNotFoundError();
    }
    return null;
  }

  gettingData(e) {
    const id = parseInt(this.getQueryVariable('id'), 10);
    const vid = this.searchForMatchingId(e, id);
    this.video.src = vid.video;
    this.title.innerHTML = vid.title;
  }
}

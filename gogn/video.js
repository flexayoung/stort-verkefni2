const video = document.querySelector('.video');
const title = document.querySelector('h1');
const fullscreenBtn = document.querySelector('#fullscreen');
const muteBtn = document.querySelector('#mute');
const backwardsBtn = document.querySelector('#back');
const playPauseBtn = document.querySelector('#play-pause');
const forwardsBtn = document.querySelector('#forward');

function removeBorder() {
  const navButtons = document.querySelectorAll('.nav_button');
  navButtons.forEach((e) => {
    e.classList.remove('button_border');
  });
}


function playPause() {
  const icon = document.querySelector('#play-pause');
  const overlayIcon = document.querySelector('.overlay');
  if (video.paused) {
    video.play();
    icon.src = 'img/pause.svg';
    overlayIcon.setAttribute('style', 'visibility: hidden;');
  } else {
    video.pause();
    icon.src = 'img/play.svg';
    overlayIcon.setAttribute('style', 'visibility: visible;');
  }
  removeBorder();
  icon.classList.add('button_border');
}

function backwards() {
  video.currentTime -= 3;
  removeBorder();
  this.classList.add('button_border');
}

function forwards() {
  video.currentTime += 3;
  removeBorder();
  this.classList.add('button_border');
}

function muteUnmute() {
  const icon = document.querySelector('#mute');
  if (video.muted) {
    video.muted = false;
    icon.src = 'img/mute.svg';
  } else {
    video.muted = true;
    icon.src = 'img/unmute.svg';
  }
  removeBorder();
  this.classList.add('button_border');
}

function fullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

fullscreenBtn.addEventListener('click', fullscreen);
muteBtn.addEventListener('click', muteUnmute);
forwardsBtn.addEventListener('click', forwards);
backwardsBtn.addEventListener('click', backwards);
playPauseBtn.addEventListener('click', playPause);

function idNotFoundError() {
  const content = document.querySelector('.grid');
  const main = document.querySelector('main');
  const errorMsg = document.createTextNode('Myndband fannst ekki...');
  const errorContainer = document.createElement('h1');
  content.hidden = true;
  errorContainer.appendChild(errorMsg);
  main.appendChild(errorContainer);
}

// on Load

function getQueryVariable(variable) {
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

function searchForMatchingId(data, id) {
  for (let i = 0; i < data.videos.length; i += 1) {
    if (data.videos[i].id === id) return data.videos[i];
  }
  if (data.videos.id !== id) {
    idNotFoundError();
  }
}

function gettingData(e) {
  const id = parseInt(getQueryVariable('id'));
  const vid = searchForMatchingId(e, id);
  video.src = vid.video;
  title.innerHTML = vid.title;
}

window.onload = function setUp() {
  const http = new XMLHttpRequest();
  let data;

  http.onreadystatechange = function check() {
    if (http.readyState === 4 && http.status === 200) {
      data = (JSON.parse(http.response));
      gettingData(data);
    }
  };
  http.open('GET', 'videos.json', true);
  http.send();
};

const video = document.querySelector('.video');
const fullscreenBtn = document.querySelector('#fullscreen');
const muteBtn = document.querySelector('#mute');
const backwardsBtn = document.querySelector('#back');
const playPauseBtn = document.querySelector('#play-pause');
const forwardsBtn = document.querySelector('#forward');



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
}

function backwards() {
  video.currentTime -= 3;
}

function forwards() {
  video.currentTime += 3;
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

// on Load
function gettingData(e) {
  console.log(e.videos[0].title);
}

window.onload = function setUp() {
  const http = new XMLHttpRequest();
  var data;

  http.onreadystatechange = function check() {
    if (http.readyState === 4 && http.status === 200) {
      data = (JSON.parse(http.response));
      gettingData(data);
    }
  };
  http.open('GET', 'videos.json', true);
  http.send();
  console.log(http);
};

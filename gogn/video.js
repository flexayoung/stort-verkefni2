const video = document.querySelector('.video');
const muteBtn = document.querySelector('#mute');

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
muteBtn.addEventListener('click', fullscreen(), false);

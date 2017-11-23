const video = document.querySelector('.video');

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

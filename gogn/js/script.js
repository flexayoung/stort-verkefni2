document.addEventListener('DOMContentLoaded', () => {

  if (window.location.pathname === '/') {
    const videoList = new VideoList(document.querySelector('#index'));
    videoList.load();
  } else {
    const http = new XMLHttpRequest();
    const videoPlayer = new VideoPlayer();
    let data;

    http.onreadystatechange = function check() {
      if (http.readyState === 4 && http.status === 200) {
        data = (JSON.parse(http.response));
        videoPlayer.gettingData(data);
      }
    };
    http.open('GET', 'videos.json', true);
    http.send();
  }
});

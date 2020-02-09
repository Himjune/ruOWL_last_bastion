// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var yt_player;
function onYouTubeIframeAPIReady() {
  yt_player = new YT.Player('ytPlayer', {
    height: '360',
    width: '640',
    videoId: 'eYN-IgtHo-c',
    events: {
      'onReady': onPlayerReady
    }
  });
  console.log(yt_player);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}
function seekVideo() {
  yt_player.seekTo(yt_player.getDuration()-30, true);
}

setInterval(function () {
  document.getElementById("fraction").innerText = yt_player.getVideoLoadedFraction();
  document.getElementById("ctime").innerText = yt_player.getCurrentTime();
  document.getElementById("gdur").innerText = yt_player.getDuration();

}, 500)
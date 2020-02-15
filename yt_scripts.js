// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var yt_player;
function onYouTubeIframeAPIReady() {
  let videoId = util_get_query_param('yt');

  if (videoId === '') {
    //videoId = get_current_yt_ow_channel();
  }

  if (videoId === '') {
    // videoId = '5Tw5xhRsonc'; // news stream
    videoId = 'mDSy-lfE4Js'; // next owl
  }

  yt_player = new YT.Player('ytPlayer', {
    height: '360',
    width: '640',
    videoId: videoId,
    controls: 0,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.


var last_fixed_end_time = -1.0;
var cur_end_time = -1.0;
var fixed_delay = 9.0;
function onPlayerReady(event) {
  event.target.playVideo();
  console.log(yt_player.getCurrentTime());
  setInterval(function () {
  
    document.getElementById("fraction").innerText = last_fixed_end_time;
    document.getElementById("ctime").innerText = yt_player.getCurrentTime();
    document.getElementById("cend").innerText = cur_end_time;
    document.getElementById("del").innerText = fixed_delay;
    document.getElementById("cspe").innerText = yt_player.getPlaybackRate();
    document.getElementById("gdur").innerText = yt_player.getDuration();
  
  /*
    if (yt_player.getCurrentTime() > 0 && last_fixed_end_time < 0) {
      last_fixed_end_time = yt_player.getCurrentTime();
      cur_end_time = last_fixed_end_time;
    } else if (yt_player.getCurrentTime() < yt_player.getDuration() * 0.75) {
      yt_player.seekTo(yt_player.getDuration(), false);
      last_fixed_end_time = yt_player.getCurrentTime();
      cur_end_time = last_fixed_end_time;
    } else {
      cur_end_time = cur_end_time + 1;
    }
  
    document.getElementById("ctar").innerText = (cur_end_time - fixed_delay);
    let diff = yt_player.getCurrentTime() - cur_end_time + fixed_delay;
  
    if (diff > 2) yt_player.setPlaybackRate(0.25);
    else if (diff > 0.3) yt_player.setPlaybackRate(0.75);
    else if (diff < -2) yt_player.setPlaybackRate(1.75);
    else if (diff < -0.3) yt_player.setPlaybackRate(1.25);
    else yt_player.setPlaybackRate(1);
  */
  }, 1000);
}

function onPlayerStateChange(event) {
  if (event.data == 1) {
    console.log('onPlay',yt_player.getCurrentTime());
  }
}



function seekVideo() {
  let new_val = document.getElementById("delayInput").value;
  new_val = parseFloat(new_val);
  fixed_delay = new_val;
}
function dropVideo() {
  yt_player.seekTo(yt_player.getDuration(), false);
  last_fixed_end_time = yt_player.getCurrentTime();
  cur_end_time = last_fixed_end_time;
}
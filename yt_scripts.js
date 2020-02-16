// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var yt_player;
function onYouTubeIframeAPIReady() {
  let videoId = util_get_query_param('yt');

  if (videoId === '') {
    //videoId = get_current_yt_ow_channel();
  }

  if (videoId === '') {
    //videoId = 'zPm6tpIupq0'; // my test
    //videoId = '5Tw5xhRsonc'; // news stream
    videoId = '9C3BjtlcxxM'; // next owl
    //videoId = '07Z7jHgmsZE' // owl highlights
  }

  yt_player = new YT.Player('ytPlayer', {
    height: '360',
    width: '640',
    playerVars: { 'autoplay': 1, 'controls': 1, 'playsinline': 1 },
    videoId: videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.


var fixed_end_time_ts = '';
var fixed_end_time = ''
var cur_end_time = '';
var fixed_delay = 0.0;
document.getElementById("delayValBtn").innerText = fixed_delay.toFixed(1) + 'с';

function changeDelay(mod) {
  mod = parseFloat(mod);
  fixed_delay = fixed_delay + mod;
  if (fixed_delay > 5.0) fixed_delay = 5.0;

  document.getElementById("delayValBtn").innerText = fixed_delay.toFixed(1) + 'с';
}

function onPlayerReady(event) {
  event.target.setVolume(10);
  setTimeout(function () {
    event.target.playVideo();
    event.target.seekTo(event.target.getDuration(), true);
  }, 5000);

  setInterval(function () {

    cur_end_time = (Date.now() - fixed_end_time_ts) / 1000 + fixed_end_time;

    if (fixed_end_time_ts !== '') {
      if (cur_end_time < yt_player.getCurrentTime()) {
        fixed_end_time_ts = Date.now();
        fixed_end_time = yt_player.getCurrentTime();
        cur_end_time = fixed_end_time;
        console.log('fix', fixed_end_time);
      }
    }

    document.getElementById("fet").innerText = fixed_end_time;
    document.getElementById("fetts").innerText = fixed_end_time_ts;
    document.getElementById("cet").innerText = cur_end_time;

    document.getElementById("ctime").innerText = yt_player.getCurrentTime();
    document.getElementById("del").innerText = fixed_delay;
    document.getElementById("cspe").innerText = yt_player.getPlaybackRate();
    document.getElementById("gdur").innerText = yt_player.getDuration();

    cur_end_time = (Date.now() - fixed_end_time_ts) / 1000 + fixed_end_time;
    document.getElementById("ctar").innerText = (cur_end_time + fixed_delay);
    let diff = cur_end_time + fixed_delay - yt_player.getCurrentTime();

    if (diff > 2) yt_player.setPlaybackRate(2);
    else if (diff > 0.3) yt_player.setPlaybackRate(1.25);
    else if (diff < -2) yt_player.setPlaybackRate(0.25);
    else if (diff < -0.3) yt_player.setPlaybackRate(0.75);
    else yt_player.setPlaybackRate(1);

  }, 1000);
}

function onPlayerStateChange(event) {
  // OnPlay
  if (event.data == 1) {
    let state = yt_player.getPlayerState();
    if (state != 1) {
      event.target.playVideo();
    }

    if (fixed_end_time_ts === '') {
      fixed_end_time_ts = Date.now();
      fixed_end_time = yt_player.getCurrentTime();
      cur_end_time = fixed_end_time;
      console.log('fix', fixed_end_time);
    }
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
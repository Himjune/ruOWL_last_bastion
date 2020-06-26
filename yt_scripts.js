// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var yt_player;
var videoId = util_get_query_param('yt');

if (videoId === '') {
  //videoId = get_current_yt_ow_channel();
}

if (videoId === '') {
  //videoId = '33ENT8wlROM'; // my test
  //videoId = '5Tw5xhRsonc'; // news stream
  videoId = 'eSu0oQ7sOfU'; // next owl
  //videoId = 'oEfQawTuAbw' // owl highlights
}

function startYt() {

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

  console.log('ytInited', yt_player);

}

var saveTimeout = setTimeout(() => {
  console.log('fromTimout');
  startYt()
}, 500);

function onYouTubeIframeAPIReady() {
  console.log('ytReady');

  clearTimeout(saveTimeout);

  startYt();

}

// 4. The API will call this function when the video player is ready.
var is_replay = false;

var fixed_end_time_ts = null;
var fixed_last_try_ts = null;

var fixed_end_time = null;
var cur_end_time = null;
var fixed_delay = 0.0;
var play_spd_def = 2;
var onlineTimerId = null;
document.getElementById("delayValBtn").innerText = fixed_delay.toFixed(1) + 'с';

function dropDelay() {
  fixed_delay = 0.0;
  document.getElementById("delayValBtn").innerText = fixed_delay.toFixed(1) + 'с';
  if (yt_player.getPlaybackRate() !== 1) yt_player.setPlaybackRate(1);
  if (!is_replay) {
    if (yt_player.getPlayerState() !== 1) yt_player.playVideo();
    yt_player.seekTo(yt_player.getDuration(), true);
  }
}

function changeDelay(mod) {
  mod = parseFloat(mod);
  fixed_delay = fixed_delay + mod;
  //if (fixed_delay > 5.0) fixed_delay = 5.0;

  document.getElementById("delayValBtn").innerText = fixed_delay.toFixed(1) + 'с';
}

function onPlayerReady(event) {
  yt_player.setVolume(1);
  yt_player.playVideo();
  console.log('GoVol',yt_player.getVolume());

  onlineTimerId = setInterval(function () {
    /*
    cur_end_time = (Date.now() - fixed_end_time_ts) / 1000 + fixed_end_time;
    document.getElementById("ctar").innerText = (cur_end_time + fixed_delay);

    document.getElementById("fet").innerText = fixed_end_time;
    document.getElementById("fetts").innerText = fixed_end_time_ts;
    document.getElementById("cet").innerText = cur_end_time;

    document.getElementById("ctime").innerText = yt_player.getCurrentTime();
    document.getElementById("del").innerText = fixed_delay;
    document.getElementById("cspe").innerText = yt_player.getPlaybackRate();
    document.getElementById("gdur").innerText = yt_player.getDuration();
    */

    /*
    if (fixed_end_time_ts !== null && (yt_player.getCurrentTime() > ((fixed_end_time - fixed_end_time_ts) + Date.now() / 1000))) {
      save_fix_end_time();
    }
    */
    var diff = 0;
    if (fixed_end_time === null) {
      if (yt_player.getPlaybackRate() !== 1) yt_player.setPlaybackRate(1);
    } else {
      play_spd_def--;
      if (play_spd_def >= 0) {
        if (yt_player.getPlaybackRate() !== 1) yt_player.setPlaybackRate(1);
      } else {
        cur_end_time = fixed_end_time - fixed_end_time_ts + Date.now() / 1000;
        diff = cur_end_time - yt_player.getCurrentTime() + fixed_delay - 0.1; // -0.1 coz youtube should be in past by default

        if (diff > 2) yt_player.setPlaybackRate(2);
        else if (diff > 0.2) yt_player.setPlaybackRate(1.25);
        else if (diff < -2) yt_player.setPlaybackRate(0.25);
        else if (diff < -0.2) yt_player.setPlaybackRate(0.75);
        else yt_player.setPlaybackRate(1);
      }
      console.log('Tim f_ts:', fixed_end_time_ts, 'f:', fixed_end_time, 'ce:', cur_end_time, 'd:', diff, 'yt:', yt_player.getCurrentTime());
    }
  }, 1000);
}

function yt_start_video(vid, time) {
  if (onlineTimerId !== null) clearInterval(onlineTimerId);
  is_replay = true;
  yt_player.loadVideoById(vid, time);
}

function onPlayerStateChange(event) {
  // OnPlay
  if (event.data == 1) {
    play_spd_def = 3;
    if (yt_player.getPlaybackRate() !== 1) yt_player.setPlaybackRate(1);
    console.log('onP f_ts:', fixed_end_time_ts, 'f:', fixed_end_time, 'ce:', cur_end_time, 'yt:', yt_player.getCurrentTime());
    if (!is_replay &&
      (fixed_end_time_ts === null ||
        (yt_player.getCurrentTime() > ((fixed_end_time - fixed_end_time_ts) + Date.now() / 1000))
      )
    ) {
      save_fix_end_time();
    }
  }
}

function save_fix_end_time() {
  if (fixed_last_try_ts === null || Date.now() - fixed_last_try_ts > 3000) {
    console.log('good try', fixed_last_try_ts, fixed_last_try_ts - Date.now());
    fixed_last_try_ts = Date.now();
    fixed_end_time_ts = Date.now() / 1000;
    fixed_end_time = yt_player.getCurrentTime();
    cur_end_time = fixed_end_time;
    console.log('fix', fixed_end_time);
  } else {
    console.log('false try', fixed_last_try_ts, fixed_last_try_ts - Date.now());
    fixed_last_try_ts = Date.now();
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
var replays = [
  { tw_id: "548852143", marks: [
    {tw_ts: 0, yt_id: "iyGLAL87LMQ", yt_ts: 1506}, // init
    {tw_ts: 1475, yt_id: "iyGLAL87LMQ", yt_ts: 2976}, // prelijung
    {tw_ts: 1554, yt_id: "iyGLAL87LMQ", yt_ts: 3055}, // lijung
    {tw_ts: 2521, yt_id: "iyGLAL87LMQ", yt_ts: 4016}, // preeinch
    {tw_ts: 2641, yt_id: "iyGLAL87LMQ", yt_ts: 4139.5}, //einch
    {tw_ts: 4715, yt_id: "iyGLAL87LMQ", yt_ts: 6221}, //prehoriz
    {tw_ts: 6250, yt_id: "iyGLAL87LMQ", yt_ts: 7755.45}, //havan
    {tw_ts: 9008, yt_id: "iyGLAL87LMQ", yt_ts: 10499},
    {tw_ts: 15293, yt_id: "eYN-IgtHo-c", yt_ts: 1077},
  ] },
  { tw_id: "549415451", marks: [
    {tw_ts: 0, yt_id: "JOZ636tLVzQ", yt_ts: 1539}, // init
  ] },
  { tw_id: "552533603", marks: [
    {tw_ts: 0, yt_id: "mDSy-lfE4Js", yt_ts: 2048}, // init
    {tw_ts: 1803, yt_id: "mDSy-lfE4Js", yt_ts: 3851}, // busan
  ] },
  { tw_id: "553104471", marks: [
    {tw_ts: 0, yt_id: "9C3BjtlcxxM", yt_ts: 2255.5}, // init
    {tw_ts: 892, yt_id: "9C3BjtlcxxM", yt_ts: 3147.5}, // lijung
  ] }
]

function start_replay(idx) {
  to_tw_main_scheme();
  dropDelay();

  idx = parseInt(idx,10);

  var replay = replays[idx];

  var mark_idx = 0;
  var cur_yt_id = replay.marks[0].yt_id;
  var diff = replay.marks[0].yt_id-replay.marks[0].tw_ts;

  tw_start_video(replay.tw_id, 0);
  yt_start_video(cur_yt_id, replay.marks[0].yt_ts);

  setInterval(() => {
    if (tw_player.isPaused()) yt_player.pauseVideo();
    else if (Math.abs(yt_player.getPlayerState()) >= 1) yt_player.playVideo();

    var tw_time = tw_player.getCurrentTime();

    mark_idx = replay.marks.findIndex(function (m){
      return m.tw_ts > tw_time;
    }) - 1;
    if (mark_idx < 0) mark_idx = replay.marks.length - 1;

    diff = replay.marks[mark_idx].yt_ts + fixed_delay - replay.marks[mark_idx].tw_ts;

    if (replay.marks[mark_idx].yt_id !== cur_yt_id) {
      cur_yt_id = replay.marks[mark_idx].yt_id;
      yt_start_video(cur_yt_id, replay.marks[mark_idx].yt_ts);
    }


    let yt_time = yt_player.getCurrentTime();

    let tar_yt_time = tw_time + diff;

    let yt_diff = tar_yt_time-yt_time;

    if (yt_diff > 5) yt_player.seekTo(tar_yt_time,true);
    else if (yt_diff > 2) yt_player.setPlaybackRate(2);
    else if (yt_diff > 0.1) yt_player.setPlaybackRate(1.25);
    else if (yt_diff < -1) yt_player.seekTo(tar_yt_time,true);
    else if (yt_diff < -0.1) yt_player.setPlaybackRate(0.75);
    else yt_player.setPlaybackRate(1);
  }, 700);
}

if (util_get_query_param("replay") !== "") {
  start_replay(util_get_query_param("replay"));
}
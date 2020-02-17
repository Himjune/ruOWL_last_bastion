var replays = [
  { tw: 548852143, marks: [{tw_ts: 0, yt_id: "iyGLAL87LMQ", yt_ts: 0}] },
  { tw: 549415451 },
  { tw: 552533603 },
  { tw: 553104471 }
]

function start_replay(vid) {
  tw_start_video(vid);
}

if (util_get_query_param("tw") !== "") {
  start_replay(util_get_query_param("tw"));
}
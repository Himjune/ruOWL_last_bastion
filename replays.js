var replays = [
  { tw: 548852143, marks: [{tw_ts: 0, yt_id: "iyGLAL87LMQ", yt_ts: 0}] },
  { tw: 549415451 },
  { tw: 552533603 },
  { tw: 553104471 }
]


var replaySelectors = document.getElementsByClassName("replay-selector");
for (var i = 0; i < replaySelectors.length; i++) {
  replaySelectors[i].addEventListener("click", start_replay);
}

function start_replay() {
  let tw_vid_id = util_get_query_param("tw");
  console.log(tw_vid_id)
  tw_start_video(553104471);
}

if (util_get_query_param("tw") !== "") {
  start_replay();
}
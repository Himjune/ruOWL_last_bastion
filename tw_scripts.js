const def_props = {
  width: 320,
  height: 180,
  channel: "outbreak",
  //channel: "himukee",
  layout: "video",
  theme: "dark",
  autoplay: true
}

var tw_player = new Twitch.Player("twPlayer", def_props);

tw_player.addEventListener(Twitch.Player.READY, () => {
  tw_player.setVolume(1.0);
  tw_player.setMuted(false);
  tw_player.play();
});

function tw_start_video(vid, time) {
  tw_player.setVideo('v'+vid, time);
}
setInterval(function () {
  //console.log ('tw',tw_player.getCurrentTime(),tw_player.getDuration(),tw_player.getEnded());
},1000);

/*
embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  console.log('em',embed);
  g_player = embed.getPlayer();
  g_player.play();
  player_ready = true;
  g_player.setVolume(1.0);
  g_player.setMuted(false);
  setInterval(function () {
    //console.log ('tw',g_player.getCurrentTime(),g_player.getDuration(),g_player.getEnded());
  },1000);
});

function tw_start_video(vid) {
  if (player_ready) {
    g_player = embed.getPlayer();
    //g_player.setVideo('v'+vid,10);
    g_player.pause();
  } else {
    setTimeout(function () {
      console.log('go',vid)
      g_player = embed.getPlayer();
      //g_player.setVideo('v'+vid,10);
    g_player.pause();
    },3000);
  }
}
*/
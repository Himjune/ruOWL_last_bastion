let props = {
  width: 320,
  height: 180,
  //video: "548294329",
  //channel: "himukee",
  channel: "outbreak",
  layout: "video",
  theme: "dark",
  autoplay: false
}

var embed = new Twitch.Embed("twPlayerEntry", props);
var g_player;
var player_ready = false;
embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  g_player = embed.getPlayer();
  g_player.play();
  player_ready = true;
  g_player.setVolume(1.0);
  g_player.setMuted(false);
  setInterval(function () {
    //console.log ('tw',g_player.getCurrentTime(),g_player.getDuration(),g_player.getEnded());
  },1000);
});
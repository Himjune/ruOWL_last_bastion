let props = {
  width: 320,
  height: 180,
  //video: "548294329",
  channel: "himukee",
  layout: "video",
  theme: "dark",
  autoplay: false
}

var embed = new Twitch.Embed("twPlayer", props);
var g_player;
var player_ready = false;
embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  g_player = embed.getPlayer();
  g_player.play();
  player_ready = true;
});

setInterval(() => {
  if (player_ready) {
    document.getElementById("twVol").innerText = g_player.getVolume();
    document.getElementById("twCur").innerText = g_player.getCurrentTime();
    document.getElementById("twDur").innerText = g_player.getDuration();
  }
}, 500);
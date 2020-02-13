var embed = new Twitch.Embed("twPlayer", {
  width: 600,
  height: 400,
  channel: "outbreak",
  layout: "video",
  autoplay: false
});
var g_player;
embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  g_player = embed.getPlayer();
  g_player.play();
});

setInterval(() => {
  document.getElementById("twVol").innerText = g_player.getVolume();
  document.getElementById("twCur").innerText = g_player.getCurrentTime();
  document.getElementById("twDur").innerText = g_player.getDuration();
}, 500);
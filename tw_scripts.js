var embed = new Twitch.Embed("twPlayer", {
  width: 854,
  height: 480,
  channel: "fitzyhere",
  layout: "video-with-chat",
  autoplay: false
});
var g_player;
embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
  g_player = embed.getPlayer();
  player.play();
});

setInterval(() => {
  document.getElementById("twVol").innerText = g_player.getVolume();
  document.getElementById("twCur").innerText = g_player.getCurrentTime();
  document.getElementById("twDur").innerText = g_player.getDuration();
  console.log(g_player.getPlaybackStats());
}, 500);
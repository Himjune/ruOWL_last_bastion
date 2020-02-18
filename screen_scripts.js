function to_yt_main_scheme () {
  let ytCont = document.getElementById("ytPlayerContainer");
  let twCont = document.getElementById("twPlayer");

  ytCont.className = "main-stream-container";
  twCont.className = "sub-stream-container";
  document.getElementsByClassName("sync-mode-placeholder")[0].className = "sync-mode-placeholder d-none";
}

function to_tw_main_scheme () {
  let ytCont = document.getElementById("ytPlayerContainer");
  let twCont = document.getElementById("twPlayer");

  ytCont.className = "sub-stream-container";
  twCont.className = "main-stream-container";
  document.getElementsByClassName("sync-mode-placeholder")[0].className = "sync-mode-placeholder d-none";
}

function to_sync_scheme () {
  let ytCont = document.getElementById("ytPlayerContainer");
  let twCont = document.getElementById("twPlayer");

  ytCont.className = "main-stream-container";
  twCont.className = "sync-stream-container";
  document.getElementsByClassName("sync-mode-placeholder")[0].className = "sync-mode-placeholder";
}

function toggle_chat() {
  let chatElem = document.getElementById("chatContainer");

  if (chatElem.className === "chat-container") {
    chatElem.className = "chat-container chat-hidden";
    document.getElementById("streamsContainer").className = "main-container";
  } else {
    chatElem.className = "chat-container";
    document.getElementById("streamsContainer").className = "main-container stream-with-chat";
  }
}

var is_fullscreen = false;
function toggle_fullscreen() {
  var elem = document.getElementById("streamsContainer");

  if (!is_fullscreen) {
    is_fullscreen = true;
    document.getElementById("toFs").style.display = "none";
    document.getElementById("fromFs").style.display = "inline-block";

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    } else {
      is_fullscreen = false;
    }
  } else {
    is_fullscreen = false;
    document.getElementById("toFs").style.display = "inline-block";
    document.getElementById("fromFs").style.display = "none";

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    } else {
      is_fullscreen = true;
    }
  }
}
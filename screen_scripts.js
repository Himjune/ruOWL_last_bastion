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

function to_notepad_scheme () {
  let ytCont = document.getElementById("ytPlayerContainer");
  let twCont = document.getElementById("twPlayer");

  ytCont.className = "sub-stream-container yt-notepad";
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

var is_iface_hidden = false;
function toggle_interface() {
  if (!is_iface_hidden) {
    is_iface_hidden = true;
    document.getElementById("showInterface").style.display = "inline-block";
    document.getElementById("hideInterface").style.display = "none";
    document.getElementById("hideBtn").style.opacity = 0.3;
    document.getElementById("fsBtn").style.opacity = 0.3;

    let elems = document.getElementsByClassName("interface");
    for (var i = 0; i < elems.length; i++) {
      elems[i].style.visibility = "hidden";
    }
  } else {
    is_iface_hidden = false;
    document.getElementById("showInterface").style.display = "none";
    document.getElementById("hideInterface").style.display = "inline-block";
    document.getElementById("hideBtn").style.opacity = 0.9;
    document.getElementById("fsBtn").style.opacity = 0.9;
    
    let elems = document.getElementsByClassName("interface");
    for (var i = 0; i < elems.length; i++) {
      elems[i].style.visibility = "visible";
    }
  }
}
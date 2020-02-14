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
  let chatElem = document.getElementById("chat_embed");

  if (chatElem.className === "chat-container") {
    chatElem.className = "chat-container chat-hidden";
    document.getElementById("streamsContainer").className = "main-container";
  } else {
    chatElem.className = "chat-container";
    document.getElementById("streamsContainer").className = "main-container stream-with-chat";
  }
}
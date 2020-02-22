const SEEN_VAL = "2202";

function hide_popover (id_str) {
  localStorage.setItem("seen_"+id_str,SEEN_VAL);
  document.getElementById(id_str).style.display = "none";

  if (id_str === "chatHelp") {
    toggle_chat();
  }
}

var popovers = ["shcemeHelp","shiftHelp","chatHelp","replaysHelp"];
function show_popovers () {
  for (var i = 0; i < popovers.length; i++) {
    let pop_id = popovers[i];
    if (localStorage.getItem("seen_"+pop_id) !== SEEN_VAL) {
      document.getElementById(pop_id).style.display = "block";
    }
  }
}

function drop_popovers () {
  for (var i = 0; i < popovers.length; i++) {
    let pop_id = popovers[i];
    localStorage.setItem("seen_"+pop_id,"none");
  }

  show_popovers();
}

show_popovers();
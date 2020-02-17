function hide_popover (id_str) {
  localStorage.setItem("seen_"+id_str,"true");
  document.getElementById(id_str).style.display = "none";

  if (id_str === "chatHelp") {
    toggle_chat();
  }
}

var popovers = ["shcemeHelp","shiftHelp","chatHelp","replaysHelp"];
for (var i = 0; i < popovers.length; i++) {
  let pop_id = popovers[i];
  if (localStorage.getItem("seen_"+pop_id) !== "true") {
    document.getElementById(pop_id).style.display = "block";
  }
}
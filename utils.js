function util_get_query_param(param_name) {
  let param_val = '' // '' will be returned if there is no such param

  const hash_string = decodeURIComponent(parent.location.hash)
  if (hash_string.length > 0) {
    // starting from char 1 to skip first '#'
    const param_strings = hash_string.substring(1).split('&')
    param_strings.forEach(function (str) {
      const cur_param_splited = str.split('=')
      if (cur_param_splited[0] === param_name) {
        param_val = cur_param_splited[1]
      }
    })
  }

  return param_val
}

function get_current_yt_ow_channel() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://www.googleapis.com/youtube/v3/search?part=id
  &channelId=UCrCco84KnzhtLEDE2LjMq7g
  &eventType=live&type=video&key=AIzaSyD3p3q_0Rv1Z1zF7WwJ0QCToYwMbnYkJQ0`, false);
  xhr.send();
  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
    return ''
  } else {
    let res = JSON.parse(xhr.responseText);
    if (res.items.length <= 0) return '';
    return res.items[0].id.videoId;
  }
}

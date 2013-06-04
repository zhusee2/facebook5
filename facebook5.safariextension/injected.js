String.prototype.decodeUnicode = function() {
  var stringReplacer = function(match, p1, string) {
    var sourceChar = "0x" + p1,
        newChar = String.fromCharCode(sourceChar);

    return newChar;
  }
  var unicodeChars = this.replace(/\\u(\d{4})/g, stringReplacer);

  return unicodeChars;
}

var videoContainer = document.querySelector('#fbxPhotoContentContainer .videoStage > div'),
    scriptBlocks = document.querySelectorAll('body > script'),
    videoScriptRaw, videoParams;

videoContainer.addEventListener('beforeload', function(event) {
  if (event.url.match(/\.gif$/)) {
    videoContainer.innerHTML = null;
    appendFacebookVideo();
  }
  return false;
}, true);

var appendFacebookVideo = function() {
  var videoParams = "",
      videoParamsObj = {},
      newVideoObject;

  for (var i = 0; i < scriptBlocks.length; i++) {
    var scriptRaw = scriptBlocks[i].innerHTML;

    if (scriptRaw.match(/JSCC\.init/)) {
      videoParams = scriptRaw.match(/\["params","([^"]+)"\]/)
    }
  }

  if (videoParams.length > 1) {
    var params = videoParams[1],
        paramsJSON = unescape(params.decodeUnicode());

    videoParamsObj = JSON.parse(paramsJSON);
    newVideoObject = document.createElement('video');

    newVideoObject.src = videoParamsObj.video_data[0].hd_src;
    newVideoObject.controls = true;
    newVideoObject.setAttribute('style', 'width:100%;');

    videoContainer.appendChild(newVideoObject);
  }
}
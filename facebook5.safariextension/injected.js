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
  videoContainer.innerHTML = null;
  return false;
}, true);

for (var i = 0; i < scriptBlocks.length; i++) {
  scriptRaw = scriptBlocks[i].innerHTML;

  if (scriptRaw.match(/JSCC\.init/)) {
    videoScriptRaw = scriptRaw;
  }
}

var videoParams = videoScriptRaw.match(/\["params","([^"]+)"\]/);

if (videoParams.length > 1) {
  var params = videoParams[1],
      paramsJSON = unescape(params.decodeUnicode()),
      paramsObj = JSON.parse(paramsJSON);

  console.log(paramsObj);
}


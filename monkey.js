// ==UserScript==
// @name         记录当前的Tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @updateURL https://github.com/nailuoGG/deno-bridge-echo/raw/master/monkey.js
// @description  try to take over the world!
// @author       liujiale
// @connect      localhost
// @match        https://*/*
// @grant          GM_xmlhttpRequest
// @noframes
// ==/UserScript==

(function () {
  'use strict';
  var oldHref = location.href;
  var title = document.title;
  function track() {
    if (document.hidden) {
      return;
    }
    var requestDetails = {
      method: "POST",
      url: "http://localhost:8000/v1/echo",
      data: JSON.stringify({
        url: oldHref,
        title: title
      }),
      headers: {
        "Content-Type": "application/json"
      },
      onload: function (response) {

      },
      onerror: function (err) {
        console.log('报错啦', err)
      }
    }
    GM_xmlhttpRequest(requestDetails);
  };
  if (document.addEventListener) {
    document.addEventListener("visibilitychange", track)
  }
  track();
})();

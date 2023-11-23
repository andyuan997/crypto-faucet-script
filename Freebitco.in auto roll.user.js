// ==UserScript==
// @name Freebitco.in auto roll
// @namespace https://freebitco.in/?r=43812622
// @description Auto roll
// @author Andy PRO
// @match https://freebitco.in/*
// @run-at document-end
// @grant GM_addStyle
// @grant GM_getResourceURL
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// @version 0.0.1
// @icon
// ==/UserScript==

var timer = undefined;
var counter = 0;
var remain = 60 * 6;

function try_roll() {
  var button = document.querySelector("#free_play_form_button"),
    myRP = document.getElementsByClassName("user_reward_points"),
    nowRPbonus = document.getElementById("bonus_container_fp_bonus");

  console.log("Detect if we can roll");
  document.title = "Can we roll?";


  if (nowRPbonus == null && parseInt(myRP[0].innerText.replace(/,/g, '')) >= 1200) {
    setTimeout(function () {
      RedeemRPProduct('fp_bonus_1000');
    }, 3000);
  }

  if (button && button.style["display"] != "none") {
    console.log("Rolling...");
    document.title = "Rooling...";
    button.click();
    remain = 606;
    counter = 0;
  }
}

function count_up() {
  counter = counter + 1;
  if (counter >= remain) {
    location.reload();
  }
  try_roll();
}

function auto_roll() {
  if (document.location.href.indexOf("freebitco.in") == -1)
    return;
  try_roll();
  timer = setInterval(count_up, 101000); /* 1 minute */
}

setTimeout(function () {
  auto_roll();
}, 3000);
// ==UserScript==
// @name         firefaucet.win auto daily and faucet
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  auto faucets
// @author       Andy PRO
// @match        https://firefaucet.win/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// ==/UserScript==

let check_address = window.location.origin;
var timer = undefined;
var counter = 0;
var remain = 60 * 6;

function try_roll() {

    // 操作特定按鈕或元素
    if (document.querySelector(".dashboard-action-btns")) {
        // 檢查是否可以點擊「Daily」按鈕，如果可以，則點擊
        if (document.querySelector("[href='/daily']") && !document.querySelector("[href='/daily']").classList.contains('disabled')) {
            document.querySelector("[href='/daily']").click();
        } else if (document.querySelector(".dashboard-action-btns [href='/faucet/']") && !document.querySelector(".dashboard-action-btns [href='/faucet/']").classList.contains('disabled')) {
            // 檢查是否可以點擊「Faucet」按鈕，如果可以，則點擊
            document.querySelector(".dashboard-action-btns [href='/faucet/']").click();
        }
    }

    // 如果在特定頁面（如「Daily」或「Faucet」），則設置間隔時間並執行一些操作
    if (window.location.href.includes(check_address + '/daily') || window.location.href.includes(check_address + '/faucet/')) {
        if (document.querySelector("#select-hcaptcha")) {
            document.querySelector("#select-hcaptcha").click();
        } else if (document.querySelector("#select-recaptcha")) {
            document.querySelector("#select-recaptcha").click();
        } else if (document.querySelector("#select-turnstile")) {
            document.querySelector("#select-turnstile").click();
        }

        if (window.location.href.includes(check_address +'/daily') || window.location.href.includes(check_address +'/faucet/')) {
            setInterval(function() {
                if (document.querySelector("button[type='submit']")) {
                    document.querySelector("button[type='submit']").click();
                }
                if(document.querySelector(".btn.earn-btns") && document.querySelector(".btn.earn-btns").innerText.includes("Continue") || document.querySelector(".btn.earn-btns").innerText.includes("Go Home")){
                    document.querySelector(".btn.earn-btns").click();
                    remain = 606;
                    counter = 0;
                }
            }, 15000);
    }
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
  if (document.location.href.indexOf("firefaucet.win") == -1)
    return;
  try_roll();
  timer = setInterval(count_up, 101000); /* 1 minute */
}

setTimeout(function () {
  location.reload();
  console.log("reload...");
}, 600000);

setTimeout(function () {
  auto_roll();
}, 3000);

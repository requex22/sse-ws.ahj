(()=>{var e={562:()=>{const e=document.forms.inputName,t=e.querySelector("input"),s=e.querySelector("button"),n=document.forms.messageForm,a=n.querySelector("textarea"),r=n.querySelector("button"),o=document.querySelector(".users"),c=document.querySelector(".messages"),d=document.querySelector(".messenger");let i;s.onclick=s=>{s.preventDefault(),""!==t.value?(t.classList.remove("invalid-name"),l.send(JSON.stringify({method:"createNewUser",name:t.value})),l.addEventListener("message",(()=>{e.parentElement.style.display="none",d.style.display="flex",i=t.value})),l.send(JSON.stringify({method:"getAllMessages"}))):t.classList.add("invalid-name")},r.onclick=e=>{e.preventDefault(),""!==a.value&&(l.send(JSON.stringify({method:"createNewMessage",author:i,text:a.value})),a.value="")};const l=new WebSocket("ws://ahj-homework8-server.herokuapp.com/ws");l.addEventListener("open",(()=>{l.addEventListener("message",(e=>{l.send(JSON.stringify({method:"getAllMessages"}));const t=JSON.parse(e.data);t.forEach((e=>{e.text?(c.innerHTML="",function(e){e.forEach((e=>{c.insertAdjacentHTML("beforeend",`\n        <div class="message ${e.autor==i?"my-message":""}">\n            <div class="message-info">\n                <span class="author">${e.autor==i?"You":e.autor}</span>\n                <span class="date">${e.createData}</span>\n            </div>\n            <p class="message-text">${e.text}</p>\n        </div>\n        `)}))}(t)):(o.innerHTML="",function(e){e.forEach((e=>{o.insertAdjacentHTML("beforeend",`\n        <div class="user-card">\n            <div class="img-container"></div>\n            <p class="name">${e.name}</p>\n        </div>\n        `)}))}(t))}))}))}))}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";s(562)})()})();
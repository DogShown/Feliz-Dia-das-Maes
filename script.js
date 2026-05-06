///////////////////////////////
// 🎬 CINEMA ENGINE
///////////////////////////////

const intro = document.getElementById("intro");
const overlay = document.querySelector(".overlay");
const messageEl = document.getElementById("message");
const nextBtn = document.getElementById("next");

const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioStarted = false;

///////////////////////////////
// 📖 MENSAGENS
///////////////////////////////
const messages = [
"Deus te sustenta em cada detalhe da vida 💖",
"O amor de mãe reflete o cuidado de Deus 🙏",
"Há paz no lar onde Deus habita ✨",
"Mãe: instrumento de graça divina ❤️",
"Nenhuma oração é esquecida por Deus 🌷"
];

function showMessage(){
  messageEl.style.opacity = 0;

  setTimeout(()=>{
    messageEl.textContent =
      messages[Math.floor(Math.random() * messages.length)];
    messageEl.style.opacity = 1;
  }, 700);
}

nextBtn.addEventListener("click", showMessage);

///////////////////////////////
// 🎧 ÁUDIO AMBIENTE (WebAudio)
///////////////////////////////
function startAudio(){
  if(audioStarted) return;

  const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctxAudio.createOscillator();
  const gain = ctxAudio.createGain();

  osc.type = "sine";
  osc.frequency.value = 432; // tom suave espiritual

  gain.gain.value = 0.015;

  osc.connect(gain);
  gain.connect(ctxAudio.destination);

  osc.start();

  audioStarted = true;
}

document.addEventListener("click", startAudio);

///////////////////////////////
// 🕯️ LUZ CINEMATOGRÁFICA (VELA)
///////////////////////////////
function drawLight(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const x = canvas.width/2;
  const y = canvas.height/2;

  const gradient = ctx.createRadialGradient(x,y,10,x,y,260);

  gradient.addColorStop(0,"rgba(255,200,140,0.9)");
  gradient.addColorStop(0.3,"rgba(255,160,100,0.25)");
  gradient.addColorStop(1,"transparent");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x,y,260,0,Math.PI*2);
  ctx.fill();

  requestAnimationFrame(drawLight);
}

///////////////////////////////
// 🎬 ENTRADA CINEMATOGRÁFICA (4 ATOS)
///////////////////////////////
function startCinema(){

  // ATO 1 — silêncio absoluto
  overlay.style.opacity = 0;

  // ATO 2 — intro nasce (luz / atmosfera)
  setTimeout(()=>{
    intro.classList.add("start-light");
  }, 600);

  // ATO 3 — transição lenta (fade out da intro)
  setTimeout(()=>{
    intro.style.opacity = 0;
  }, 2800);

  // ATO 4 — mundo “acorda”
  setTimeout(()=>{
    intro.remove();
    overlay.style.opacity = 1;

    // vela só nasce AGORA
    drawLight();

    // primeira mensagem
    showMessage();

    // inicia respiração ambiente
    startWorldBreathing();

  }, 4500);
}

window.addEventListener("load", startCinema);

///////////////////////////////
// 🌫️ RESPIRAÇÃO DO MUNDO
///////////////////////////////
function startWorldBreathing(){
  setInterval(()=>{
    document.body.style.filter =
      `brightness(${0.95 + Math.random()*0.08})`;
  }, 4000);
}

///////////////////////////////
// ✨ PARTÍCULAS AMBIENTAIS
///////////////////////////////
function createParticle(){
  const p = document.createElement("div");
  p.className = "particle";

  p.style.left = Math.random() * window.innerWidth + "px";
  p.style.top = window.innerHeight + "px";

  document.body.appendChild(p);

  setTimeout(()=>p.remove(), 6000);
}

setInterval(createParticle, 900);

///////////////////////////////
// ❤️ CORAÇÕES (INTERAÇÃO HUMANA)
///////////////////////////////
document.addEventListener("click",(e)=>{
  const h = document.createElement("div");
  h.innerHTML = "❤";
  h.style.position = "fixed";
  h.style.left = e.clientX + "px";
  h.style.top = e.clientY + "px";
  h.style.fontSize = "18px";
  h.style.color = "#ff8a80";
  h.style.pointerEvents = "none";
  h.style.animation = "rise 3s ease forwards";

  document.body.appendChild(h);

  setTimeout(()=>h.remove(),3000);
});

///////////////////////////////
// 🌙 RESPONSIVIDADE CANVAS
///////////////////////////////
window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
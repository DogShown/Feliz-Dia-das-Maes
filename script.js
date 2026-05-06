const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* 📖 MENSAGENS */
const messages = [
"Deus sustenta você em cada detalhe da vida 💖",
"O amor de mãe reflete o cuidado divino 🙏",
"Você é instrumento da graça de Deus ✨",
"Nenhuma oração de mãe é em vão ❤️",
"O Senhor te envolve em paz hoje e sempre 🌷"
];

const msg = document.getElementById("message");
const btn = document.getElementById("next");

/* 🎬 ATOS */
const acts = document.querySelectorAll(".act");
let currentAct = 0;

function nextAct(){
  acts[currentAct].classList.remove("active");
  currentAct++;

  if(acts[currentAct]){
    setTimeout(()=>{
      acts[currentAct].classList.add("active");
    },1200);
  }
}

/* ⏳ TIMING CINEMATOGRÁFICO */
setTimeout(()=> nextAct(), 2500);
setTimeout(()=> nextAct(), 5000);

/* 📖 MENSAGEM */
function newMessage(){
  msg.style.opacity = 0;

  setTimeout(()=>{
    msg.textContent = messages[Math.floor(Math.random()*messages.length)];
    msg.style.opacity = 1;
  },800);
}

/* inicial */
setTimeout(newMessage, 5500);

btn.addEventListener("click", newMessage);

/* 🕯️ VELA CINEMATOGRÁFICA (LIGHT ENGINE) */
function drawLight(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const x = canvas.width/2;
  const y = canvas.height/2;

  const gradient = ctx.createRadialGradient(x,y,10,x,y,200);

  gradient.addColorStop(0,"rgba(255,200,140,0.9)");
  gradient.addColorStop(0.3,"rgba(255,160,100,0.2)");
  gradient.addColorStop(1,"transparent");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x,y,200,0,Math.PI*2);
  ctx.fill();

  requestAnimationFrame(drawLight);
}

drawLight();

/* ❤️ CORAÇÕES CINEMATOGRÁFICOS */
document.addEventListener("click",(e)=>{
  const h=document.createElement("div");
  h.innerHTML="❤";
  h.style.position="fixed";
  h.style.left=e.clientX+"px";
  h.style.top=e.clientY+"px";
  h.style.color="#ff8a80";
  h.style.fontSize="18px";
  h.style.animation="rise 3s forwards";

  document.body.appendChild(h);

  setTimeout(()=>h.remove(),3000);
});
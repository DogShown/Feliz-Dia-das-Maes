const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const msg = document.getElementById("message");
const btn = document.getElementById("next");
const acts = document.querySelectorAll(".act");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentAct = 0;
const messages = [
    "Deus sustenta você em cada detalhe da vida 💖",
    "O amor de mãe reflete o cuidado divino 🙏",
    "Você é instrumento da graça de Deus ✨",
    "Nenhuma oração de mãe é em vão ❤️",
    "O Senhor te envolve em paz hoje e sempre 🌷"
];

/* 🎬 CONTROLE DE ATOS */
function nextAct() {
    acts[currentAct].classList.remove("active");
    currentAct++;
    if (acts[currentAct]) {
        setTimeout(() => acts[currentAct].classList.add("active"), 1200);
    }
}

setTimeout(nextAct, 2500); // Para Act 2
setTimeout(nextAct, 5000); // Para Act 3

/* 📖 MENSAGENS */
function newMessage() {
    msg.style.opacity = 0;
    setTimeout(() => {
        msg.textContent = messages[Math.floor(Math.random() * messages.length)];
        msg.style.opacity = 1;
    }, 800);
}
btn.addEventListener("click", newMessage);
setTimeout(newMessage, 5500);

/* 🕯️ ENGINE DE PARTÍCULAS E LUZ */
const particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * -0.5;
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(245, 230, 211, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particlesArray.push(new Particle());

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Luz da Vela
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const grad = ctx.createRadialGradient(x, y, 10, x, y, 250);
    grad.addColorStop(0, "rgba(255,200,140,0.15)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(drawScene);
}
drawScene();

/* ❤️ INTERAÇÕES */
function openCard(el) {
    el.classList.toggle('open');
    if(el.classList.contains('open')) {
        for(let i=0; i<5; i++) {
            const h = document.createElement("div");
            h.innerHTML = "❤️";
            h.style.position = "fixed";
            h.style.left = el.getBoundingClientRect().left + "px";
            h.style.top = el.getBoundingClientRect().top + "px";
            h.style.animation = "rise 2s forwards";
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 2000);
        }
    }
}

document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    document.querySelector('.overlay').style.transform = `translateX(${x}px) translateY(${y}px)`;
});
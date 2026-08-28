/* ================= KONFIGURASI ================= */
const NAMA_PENERIMA = "Enurrr";
const FOTO_URL = "https://feeldreams.github.io/pandamuter.gif";
const AVATAR_URL = "https://feeldreams.github.io/pusn2.gif";

const PARAGRAFS = [
   "Barakallahu fii umrik! Selamat ulang tahun karena, hari ini adalah hari ulang tahunmu 🤭 ... Selamat bertambah usia, makin sabar, kuat dan sehat selalu yaa.. 🥳",
  "Oh yaa semangattt teruss jalani harinya yaa, jangan pernah putus asa buat mengejar impian kamu 💪 — Semoga di usia baru ini Allah datangkan kemudahan dan keberkahan penuh buatt kamuu dan jangan lupa selalu bersyukur yaa, semoga semakin taat kepadanya dan tercapai segala cita-cita kamu..Aamiin 🤲"
];
const PENUTUP = "Sekali lagi 😁,\nHappy Birthday 🎉 — And ...\nWish You All The Best! 🥳";

const MUSIC_URL = "https://feeldreams.github.io/audio/angelbaby.mp3";
/* ================================================================= */

const bgm = document.getElementById('bgm');
let musicEnabled = false;
let musicRevealed = false;

if(MUSIC_URL){
  bgm.src = MUSIC_URL;
  bgm.volume = 0.7;
}

function fadeAudio(target, ms){
  const steps = 20;
  const start = bgm.volume;
  const diff = target - start;
  let i = 0;
  const iv = setInterval(()=>{
    i++;
    bgm.volume = Math.max(0, Math.min(0.7, start + diff*(i/steps)));
    if(i>=steps) clearInterval(iv);
  }, ms/steps);
}

function startMusic(){
  if(!MUSIC_URL || musicEnabled) return;
  musicEnabled = true;
  bgm.play().catch(()=>{ musicEnabled = false; });
}

function revealMusic(){
  if(!MUSIC_URL || musicRevealed) return;
  musicRevealed = true;
  if(bgm.paused){ bgm.play().catch(()=>{}); }
  fadeAudio(0.65, 1600);
}

const avatarEl = document.getElementById('avatar');
function renderAvatar(url){
  avatarEl.innerHTML = '';
  if(url){
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'foto';
    avatarEl.appendChild(img);
  }
}
renderAvatar(AVATAR_URL);

if(FOTO_URL){
  document.getElementById('photoImg').src = FOTO_URL;
}

/* ============ Canvas Background ============ */
(function drawCity(){
  const canvas = document.getElementById('cityCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, DPR;

  function seeded(seed){
    let s = seed;
    return function(){ s = (s*9301+49297)%233280; return s/233280; };
  }

  function render(){
    const rect = canvas.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.floor(rect.width * DPR));
    H = Math.max(1, Math.floor(rect.height * DPR));
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0,0,W,H);

    const rand = seeded(1337);

    ctx.fillStyle = 'rgba(35,28,58,0.55)';
    ctx.beginPath();
    ctx.moveTo(0,H*0.42);
    for(let x=0;x<=W;x+=W/24){
      const y = H*0.30 + Math.sin(x*0.004+2)*H*0.05 + rand()*H*0.04;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

    const haze = ctx.createLinearGradient(0,H*0.18,0,H*0.5);
    haze.addColorStop(0,'rgba(200,150,170,0)');
    haze.addColorStop(1,'rgba(255,190,150,0.22)');
    ctx.fillStyle = haze;
    ctx.fillRect(0,H*0.18,W,H*0.32);

    ctx.fillStyle = 'rgba(22,17,38,0.85)';
    ctx.beginPath();
    ctx.moveTo(0,H*0.62);
    for(let x=0;x<=W;x+=W/40){
      const y = H*0.5 + Math.sin(x*0.01+5)*H*0.03 + rand()*H*0.05;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

    const lightColors = [
      'rgba(255,214,150,ALPHA)',
      'rgba(255,180,120,ALPHA)',
      'rgba(255,235,190,ALPHA)',
      'rgba(255,150,150,ALPHA)'
    ];
    const nLights = 260;
    for(let i=0;i<nLights;i++){
      const t = rand();
      const x = rand()*W;
      const yBase = H*0.55 + t*H*0.42;
      const y = yBase - rand()*H*0.06;
      const depth = (y - H*0.5) / (H*0.5);
      const size = (0.6 + rand()*1.8) * DPR * (0.5 + depth);
      const alpha = (0.25 + rand()*0.55) * Math.max(0.15, depth);
      const color = lightColors[Math.floor(rand()*lightColors.length)].replace('ALPHA', alpha.toFixed(2));
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size*4;
      ctx.arc(x,y,Math.max(0.5,size),0,Math.PI*2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(12,9,22,0.92)';
    ctx.beginPath();
    ctx.moveTo(0,H*0.82);
    for(let x=0;x<=W;x+=W/30){
      const y = H*0.74 + Math.sin(x*0.015+1)*H*0.03 + rand()*H*0.06;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  }

  render();
  let resizeTimer;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });
})();

const bg = document.getElementById('bg');
function spawnBubble(){
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = 20 + Math.random()*70;
  b.style.width = size+'px';
  b.style.height = size+'px';
  b.style.left = Math.random()*100+'%';
  b.style.setProperty('--drift', (Math.random()*70-35)+'px');
  b.style.animationDuration = (10+Math.random()*8)+'s';
  bg.appendChild(b);
  setTimeout(()=>b.remove(), 20000);
}
for(let i=0;i<12;i++){ setTimeout(()=>spawnBubble(), i*420); }
setInterval(()=>spawnBubble(), 1700);

function showScene(id){
  document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
const sleep = ms => new Promise(r=>setTimeout(r, ms));

/* ============ Function Love Burst Effect (Amplop) ============ */
function createHeartBurst(){
  const envelopeEl = document.getElementById('envelope');
  const rect = envelopeEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const heartEmojis = ['❤️', '💖', '💗', '💓', '💕', '✨', '🌸', '💘'];

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    const tx = (Math.random() - 0.5) * 320; 
    const ty = -120 - Math.random() * 260; 
    const rot = (Math.random() - 0.5) * 80;
    const fontSize = 18 + Math.random() * 22;
    const delay = Math.random() * 0.45;

    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.fontSize = `${fontSize}px`;
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    heart.style.setProperty('--rot', `${rot}deg`);
    heart.style.animationDelay = `${delay}s`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2400);
  }
}

/* ============ Function Looping Love Rain Effect (Scene Final) ============ */
let finaleHeartInterval = null;

function spawnFinaleHeart(){
  const finaleOverlay = document.getElementById('finale');
  if(!finaleOverlay.classList.contains('show')) return;

  const heart = document.createElement('div');
  heart.className = 'finale-heart';
  const heartEmojis = ['❤️', '💖', '💗', '💓', '💕', '✨', '🌸', '💘'];
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const startX = Math.random() * 100;
  const fontSize = 16 + Math.random() * 26;
  const duration = 3 + Math.random() * 3.5;
  const rot = (Math.random() - 0.5) * 60;

  heart.style.left = `${startX}%`;
  heart.style.fontSize = `${fontSize}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.setProperty('--rot', `${rot}deg`);

  finaleOverlay.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function startFinaleHeartRain(){
  stopFinaleHeartRain();
  for(let i=0; i<6; i++){
    setTimeout(spawnFinaleHeart, i * 250);
  }
  finaleHeartInterval = setInterval(spawnFinaleHeart, 350);
}

function stopFinaleHeartRain(){
  if(finaleHeartInterval){
    clearInterval(finaleHeartInterval);
    finaleHeartInterval = null;
  }
  document.querySelectorAll('.finale-heart').forEach(h => h.remove());
}

const envWrapper = document.getElementById('envWrapper');
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
let started = false;

async function openEnvelope(){
  if(started) return; started = true;
  startMusic();
  
  openBtn.style.transform = 'scale(0.8)';
  openBtn.style.opacity = '0';
  openBtn.style.pointerEvents = 'none';

  envelope.classList.remove('close');
  envelope.classList.add('open');
  
  createHeartBurst();

  await sleep(1200);
  showScene('scene-photo');
  
  await sleep(2200);

  showScene('scene-card');
  revealMusic();
  
  await sleep(600);
  await runTyping();
}
envWrapper.addEventListener('click', openEnvelope);
openBtn.addEventListener('click', openEnvelope);

function typeInto(container, text, speed, wrapTag, scrollTarget){
  return new Promise(resolve=>{
    const wrap = document.createElement(wrapTag || 'span');
    const cursorRef = container.querySelector(':scope > .cursor');
    if(cursorRef){ container.insertBefore(wrap, cursorRef); }
    else { container.appendChild(wrap); }
    let i = 0;
    function step(){
      if(i < text.length){
        const ch = text[i];
        if(ch === '\n') wrap.appendChild(document.createElement('br'));
        else wrap.appendChild(document.createTextNode(ch));
        if(scrollTarget) scrollTarget.scrollTop = scrollTarget.scrollHeight;
        i++;
        setTimeout(step, speed);
      } else {
        resolve(wrap);
      }
    }
    step();
  });
}

const titleLine = document.getElementById('titleLine');
const msgBox = document.getElementById('msgBox');
const showFinaleBtn = document.getElementById('showFinaleBtn');

async function runTyping(){
  titleLine.innerHTML = '';
  msgBox.innerHTML = '';

  const titleCursor = document.createElement('span');
  titleCursor.className = 'cursor';
  titleLine.appendChild(titleCursor);

  await typeInto(titleLine, 'Happy Birthday, ', 28, 'span');
  await typeInto(titleLine, NAMA_PENERIMA, 35, 'em');
  await typeInto(titleLine, ' 🫶🏻', 28, 'span');
  titleCursor.remove();
  
  await sleep(500);

  for(let p=0; p<PARAGRAFS.length; p++){
    const para = document.createElement('p');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    msgBox.appendChild(para);
    para.appendChild(cursor);
    await typeInto(para, PARAGRAFS[p], 18, 'span', msgBox);
    cursor.remove();
    await sleep(600);
  }

  const closing = document.createElement('p');
  closing.className = 'closing';
  const closingCursor = document.createElement('span');
  closingCursor.className = 'cursor';
  msgBox.appendChild(closing);
  closing.appendChild(closingCursor);
  await typeInto(closing, PENUTUP, 22, 'span', msgBox);
  closingCursor.remove();

  await sleep(2200);
  document.getElementById('finale').classList.add('show');
  startFinaleHeartRain();
  
  showFinaleBtn.style.display = 'inline-flex';
}

/* Tombol Silang (X): Langsung kembali ke Scene 3 (Kartu Ucapan) */
document.getElementById('closeFinaleBtn').addEventListener('click', ()=>{
  document.getElementById('finale').classList.remove('show');
  stopFinaleHeartRain();
  showScene('scene-card');
});

/* Tombol "Lihat Kembali Final 🥳": Membuka kembali finale dari Scene 3 */
showFinaleBtn.addEventListener('click', ()=>{
  document.getElementById('finale').classList.add('show');
  startFinaleHeartRain();
});

/* Tombol Home: Keluar / Memuat Ulang Web */
document.getElementById('homeBtn').addEventListener('click', ()=>{
  if(confirm('Apakah Anda ingin keluar dari halaman ini?')){
    window.close();
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 100);
  }
});

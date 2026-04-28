const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); spawnParticles(); });

function rand(a, b) { return a + Math.random() * (b - a); }

function makeParticle() {
  return {
    x:           rand(0, W),
    y:           rand(H * 0.1, H * 1.1),
    len:         rand(8, 20),
    angle:       rand(-0.45, 0.45),
    speed:       rand(0.18, 0.5),
    alpha:       rand(0.035, 0.12),
    drift:       rand(-0.1, 0.1),
    wobble:      rand(0, Math.PI * 2),
    wobbleSpeed: rand(0.008, 0.022),
  };
}

function spawnParticles() {
  particles = Array.from({ length: Math.round((W * H) / 18_000) }, makeParticle);
}
spawnParticles();

function drawStroke(p) {
  const ox = Math.sin(p.wobble) * 11;
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth   = 1;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  ctx.moveTo(p.x + ox, p.y);
  ctx.lineTo(p.x + ox + Math.sin(p.angle) * p.len, p.y - Math.cos(p.angle) * p.len);
  ctx.stroke();
  ctx.globalAlpha *= 0.45;
  ctx.beginPath();
  const mx = p.x + ox + Math.sin(p.angle) * p.len * 0.45;
  const my = p.y - Math.cos(p.angle) * p.len * 0.45;
  ctx.moveTo(mx, my);
  ctx.lineTo(mx + Math.sin(p.angle + 0.8) * p.len * 0.28, my - Math.cos(p.angle + 0.8) * p.len * 0.28);
  ctx.stroke();
  ctx.restore();
}

(function animate() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    drawStroke(p);
    p.y      -= p.speed;
    p.x      += p.drift;
    p.wobble += p.wobbleSpeed;
    if (p.y < -30 || p.x < -40 || p.x > W + 40) {
      p.x = rand(0, W); p.y = H + 20; p.wobble = rand(0, Math.PI * 2);
    }
  }
  requestAnimationFrame(animate);
})();

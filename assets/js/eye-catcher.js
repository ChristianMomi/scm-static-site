(function initEyeCatcher() {
  // Create canvas overlay
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.style.backgroundColor = 'transparent';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 3 + 1,
      lifespan: Math.random() * 200 + 150,
      maxLife: Math.random() * 200 + 150,
      hue: Math.random() * 60 + 200 // blue-cyan range
    });
  }

  let animationFrameId;
  let startTime = null;

  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    for (const particle of particles) {
      
      particle.x += particle.vx;
      particle.y += particle.vy;

      
      if (particle.x < -10) particle.x = canvas.width + 10;
      if (particle.x > canvas.width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = canvas.height + 10;
      if (particle.y > canvas.height + 10) particle.y = -10;

      
      particle.lifespan -= 1;
      const opacity = Math.max(0, particle.lifespan / particle.maxLife);

      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${opacity})`;
      ctx.fill();

      
      ctx.strokeStyle = `hsla(${particle.hue}, 100%, 60%, ${opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (particle.lifespan > 0) activeParticles++;
    }

    
    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Clean up
      canvas.remove();
    }
  }

  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(animate);
    });
  } else {
    requestAnimationFrame(animate);
  }
})();


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initEyeCatcher };
}

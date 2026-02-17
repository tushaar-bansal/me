document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".hero img");
  if (!img) return;

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const MAX_ROT_X = 0.8;   // very subtle
  const MAX_ROT_Y = 1.5;
  const MAX_MOVE_X = 3;
  const MAX_MOVE_Y = 2.5;
  const Z_LIFT = -20;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let raf = null;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    raf = null;

    currentX = lerp(currentX, targetX, 0.08);
    currentY = lerp(currentY, targetY, 0.08);

    const rotY = currentX * MAX_ROT_Y;
    const rotX = -currentY * MAX_ROT_X;
    const moveX = currentX * MAX_MOVE_X;
    const moveY = currentY * MAX_MOVE_Y;

    img.style.transform =
      `translate3d(${moveX}px, ${moveY}px, ${Z_LIFT}px)
       rotateX(${rotX}deg)
       rotateY(${rotY}deg)`;

    if (Math.abs(currentX - targetX) > 0.001 ||
        Math.abs(currentY - targetY) > 0.001) {
      raf = requestAnimationFrame(animate);
    }
  }

  function handleMove(e) {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;

    targetX = nx;
    targetY = ny;

    if (!raf) raf = requestAnimationFrame(animate);
  }

  function reset() {
    targetX = 0;
    targetY = 0;
    if (!raf) raf = requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", handleMove, { passive: true });
  window.addEventListener("mouseleave", reset);
});
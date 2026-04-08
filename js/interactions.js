export const rotationState = {
  targetY: 0,
  targetX: 0
};

export function setupInteractions() {
  // Scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    rotationState.targetY = scrollProgress * Math.PI * 1.8;
    rotationState.targetX = -0.12 + scrollProgress * 0.22;
  });

  // Ratón
  window.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    rotationState.targetY += mouseX * 0.002;
    rotationState.targetX = mouseY * 0.1;
  });
}

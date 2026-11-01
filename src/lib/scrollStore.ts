/**
 * High-performance mutable scroll state holder for WebGL and Canvas animations.
 * Read directly in requestAnimationFrame / useFrame loops without triggering React re-renders.
 */
export interface ScrollState {
  scrollY: number;
  progress: number;
  velocity: number;
  direction: number;
}

export const globalScrollState: ScrollState = {
  scrollY: 0,
  progress: 0,
  velocity: 0,
  direction: 0,
};

export const updateScrollState = (scrollY: number, progress: number, velocity = 0, direction = 0) => {
  globalScrollState.scrollY = scrollY;
  globalScrollState.progress = progress;
  globalScrollState.velocity = velocity;
  globalScrollState.direction = direction;
};

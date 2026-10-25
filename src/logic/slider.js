export const AUTOPLAY_MS = 5000;
export const FADE_MS = 600;
export const SWIPE_THRESHOLD = 48;

export function wrapIndex(index, count) {
  if (!Number.isFinite(count) || count <= 0) return 0;
  return ((index % count) + count) % count;
}

export function swipeDelta(dx, dy, threshold = SWIPE_THRESHOLD) {
  if (!Number.isFinite(dx) || !Number.isFinite(dy)) return 0;
  if (Math.abs(dx) < threshold) return 0;
  if (Math.abs(dx) <= Math.abs(dy)) return 0;
  return dx < 0 ? 1 : -1;
}

export function indexFromKey(index, key, count) {
  if (key === "ArrowRight") return wrapIndex(index + 1, count);
  if (key === "ArrowLeft") return wrapIndex(index - 1, count);
  if (key === "Home") return 0;
  if (key === "End") return Math.max(0, count - 1);
  return null;
}

export function clampCount(value, min, max) {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  if (!Number.isInteger(parsed)) return null;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}

export function countFromKey(value, key, min, max) {
  const current = clampCount(value, min, max);
  if (current === null) {
    if (key === "End") return max;
    if (key === "ArrowUp" || key === "ArrowDown" || key === "Home") return min;
    return null;
  }
  if (key === "ArrowUp") return Math.min(max, current + 1);
  if (key === "ArrowDown") return Math.max(min, current - 1);
  if (key === "Home") return min;
  if (key === "End") return max;
  return null;
}

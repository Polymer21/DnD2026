export function disclosureIndex(index, key, count) {
  if (key === "Home") return 0;
  if (key === "End") return Math.max(0, count - 1);
  if (key === "ArrowDown") return index < count - 1 ? index + 1 : index;
  if (key === "ArrowUp") return index > 0 ? index - 1 : index;
  return null;
}

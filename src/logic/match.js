export function scoreTable(answers, table) {
  let score = 50;
  if (table.playstyle?.includes(answers.playstyle)) score += 30;
  if (table.schedule?.includes(answers.schedule)) score += 12;
  if (table.experience?.includes(answers.experience)) score += 8;
  if (table.goals?.includes(answers.goal)) score += 6;
  if (table.personalities?.includes(answers.personality)) score += 4;
  return Math.min(99, score);
}

export function matchTables(answers, tables) {
  return tables
    .map((table) => ({ ...table, percent: scoreTable(answers, table) }))
    .sort((a, b) => b.percent - a.percent || a.title.localeCompare(b.title));
}

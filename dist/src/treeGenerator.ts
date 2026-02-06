import * as fs from 'fs';

function generateTree(levels: number, outputPath: string): void {
  if (levels < 1) throw new Error('Levels must be at least 1');

  let tree = 'W\n\n';


  for (let i = 1; i <= levels; i++) {
    const spaces = ' '.repeat(levels * 2 - i * 2 + 1);
    const stars = '* '.repeat(i * 2 - 1).trim();
    const at = i % 2 === 0 ? '@' : '';

    tree += `${spaces}@ ${stars} ${at}\n\n`;
  }

  // Ствол (TTTTT два раза)
  tree += 'TTTTT\nTTTTT\n';

  // Запись в файл
  fs.writeFileSync(outputPath, tree, 'utf8');
  console.log(`Елка сгенерирована в ${outputPath}`);
}

if (require.main === module) {
  const levels = parseInt(process.argv[2], 10);
  const outputPath = process.argv[3];
  generateTree(levels, outputPath);
}

export { generateTree };
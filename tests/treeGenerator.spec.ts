import { test, expect } from '@playwright/test';
import { generateTree } from '../src/treeGenerator';
import * as fs from 'fs';
import * as path from 'path';

test.describe.configure({ mode: 'serial' });

test.describe('Tree Generator Tests', () => {
  const testOutput = path.join(process.cwd(), 'test_tree.txt');

  // Вспомогательная функция для безопасного чтения файла
  const readTreeFile = (filepath: string): string => {
    if (!fs.existsSync(filepath)) {
      throw new Error(`File not created: ${filepath}`);
    }
    return fs.readFileSync(filepath, 'utf8');
  };

  test.beforeEach(() => {
    // Удаляем файл перед тестом, если он существует
    if (fs.existsSync(testOutput)) {
      fs.unlinkSync(testOutput);
    }
  });

  test.afterEach(() => {
    if (fs.existsSync(testOutput)) fs.unlinkSync(testOutput); // Чистим файл после теста
  });

  test('Генерирует ёлку с правильной верхушкой', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n');

    expect(lines[0].trim()).toBe('W');
    expect(lines[1].trim()).toBe('*');
  });

  test('Генерирует ёлку с правильными уровнями', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n');

    expect(lines[2].trim()).toBe('@*****');
    expect(lines[3].trim()).toBe('********@');
    expect(lines[4].trim()).toBe('@*************');
    expect(lines[5].trim()).toBe('*****************@');
  });

  test('Генерирует ёлку с правильным стволом', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n');

    expect(lines[6].trim()).toBe('TTTTT');
    expect(lines[7].trim()).toBe('TTTTT');
  });

  test('Генерирует полную ёлку с 4 уровнями', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    const expected = [
      'W',
      '*',
      '@*****',
      '********@',
      '@*************',
      '*****************@',
      'TTTTT',
      'TTTTT'
    ];

    expect(lines).toEqual(expected);
  });

  test('Чередует @ символы правильно', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    // Уровень 1: @ в начале
    expect(lines[2].startsWith('@')).toBe(true);
    expect(lines[2].endsWith('@')).toBe(false);

    // Уровень 2: @ в конце
    expect(lines[3].startsWith('@')).toBe(false);
    expect(lines[3].endsWith('@')).toBe(true);

    // Уровень 3: @ в начале
    expect(lines[4].startsWith('@')).toBe(true);
    expect(lines[4].endsWith('@')).toBe(false);

    // Уровень 4: @ в конце
    expect(lines[5].startsWith('@')).toBe(false);
    expect(lines[5].endsWith('@')).toBe(true);
  });

  test('Содержит правильное количество звезд на каждом уровне', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    expect(lines[2].replace(/@/g, '').length).toBe(5);   // @*****
    expect(lines[3].replace(/@/g, '').length).toBe(8);   // ********@
    expect(lines[4].replace(/@/g, '').length).toBe(13);  // @*************
    expect(lines[5].replace(/@/g, '').length).toBe(17);  // *****************@
  });

  test('Создает файл по указанному пути', () => {
    generateTree(4, testOutput);
    expect(fs.existsSync(testOutput)).toBe(true);
  });

  test('Генерирует ёлку с центрированием', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n');

    // Проверяем, что верхушка и ствол имеют отступы
    expect(lines[0].startsWith(' ')).toBe(true); // W
    expect(lines[1].startsWith(' ')).toBe(true); // *
    expect(lines[6].startsWith(' ')).toBe(true); // TTTTT
  });

  test('Бросает ошибку при levels < 1', () => {
    expect(() => generateTree(0, testOutput)).toThrow('Levels must be at least 1');
  });

  test('Бросает ошибку при отрицательных levels', () => {
    expect(() => generateTree(-1, testOutput)).toThrow('Levels must be at least 1');
  });

  test('Генерирует идентичные файлы при повторном запуске', () => {
    generateTree(4, testOutput);
    const content1 = readTreeFile(testOutput);

    generateTree(4, testOutput);
    const content2 = readTreeFile(testOutput);

    expect(content1).toBe(content2);
  });

  test('Содержит ровно 8 строк для 4 уровней', () => {
    generateTree(4, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n');

    expect(lines.length).toBe(8);
  });

  test('Генерирует ёлку с 1 уровнем', () => {
    generateTree(1, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    const expected = [
      'W',
      '*',
      '@*****',
      'TTTTT',
      'TTTTT'
    ];

    expect(lines).toEqual(expected);
    expect(lines.length).toBe(5); // W + * + 1 уровень + 2 ствола
  });

  test('Генерирует ёлку с 2 уровнями', () => {
    generateTree(2, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    const expected = [
      'W',
      '*',
      '@*****',
      '********@',
      'TTTTT',
      'TTTTT'
    ];

    expect(lines).toEqual(expected);
    expect(lines.length).toBe(6); // W + * + 2 уровня + 2 ствола
  });

  test('Генерирует ёлку с 3 уровнями', () => {
    generateTree(3, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    const expected = [
      'W',
      '*',
      '@*****',
      '********@',
      '@*************',
      'TTTTT',
      'TTTTT'
    ];

    expect(lines).toEqual(expected);
    expect(lines.length).toBe(7); // W + * + 3 уровня + 2 ствола
  });

  test('Генерирует ёлку с 5 уровнями', () => {
    generateTree(5, testOutput);
    const content = readTreeFile(testOutput);
    const lines = content.split('\n').map(line => line.trim());

    expect(lines[0]).toBe('W');
    expect(lines[1]).toBe('*');
    expect(lines[2]).toBe('@*****');
    expect(lines[3]).toBe('********@');
    expect(lines[4]).toBe('@*************');
    expect(lines[5]).toBe('*****************@');
    expect(lines[6]).toBe('TTTTT');
    expect(lines[7]).toBe('TTTTT');
    expect(lines.length).toBe(8); // W + * + 4 уровня отображается + 2 ствола
  });

  test('Количество строк зависит от уровней правильно', () => {
    // 1 уровень
    generateTree(1, testOutput);
    let content = readTreeFile(testOutput);
    let lines = content.split('\n');
    expect(lines.length).toBe(5); // W + * + 1 + TTTTT + TTTTT

    // 2 уровня
    generateTree(2, testOutput);
    content = readTreeFile(testOutput);
    lines = content.split('\n');
    expect(lines.length).toBe(6); // W + * + 2 + TTTTT + TTTTT

    // 3 уровня
    generateTree(3, testOutput);
    content = readTreeFile(testOutput);
    lines = content.split('\n');
    expect(lines.length).toBe(7); // W + * + 3 + TTTTT + TTTTT

    // 4 уровня
    generateTree(4, testOutput);
    content = readTreeFile(testOutput);
    lines = content.split('\n');
    expect(lines.length).toBe(8); // W + * + 4 + TTTTT + TTTTT
  });
});
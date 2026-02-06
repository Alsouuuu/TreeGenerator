"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTree = generateTree;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function generateTree(levels, outputPath) {
    if (levels < 1)
        throw new Error('Levels must be at least 1');
    // Создаем директорию, если её нет
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const lines = [];
    // Вычисляем количество звезд для каждого уровня
    const getStarsCount = (level) => {
        // Уровень 1: 5 звезд, Уровень 2: 8, Уровень 3: 13, Уровень 4: 17
        // Паттерн: 5, 8 (+3), 13 (+5), 17 (+4)... или другая логика
        // Упрощенная формула: 5 + (level-1) * 3 + некоторый коэффициент
        const starCounts = [5, 8, 13, 17, 22, 27, 32, 37]; // Можно расширить по необходимости
        return starCounts[level - 1] || 5 + (level - 1) * 4;
    };
    // Вычисляем максимальную ширину (самый широкий уровень)
    const maxStars = getStarsCount(Math.min(levels, 4)); // Берем максимум из доступных уровней
    const maxWidth = maxStars + 1; // +1 для символа @
    // Функция для центрирования строки
    const center = (text) => {
        const padding = Math.floor((maxWidth - text.length) / 2);
        return padding > 0 ? ' '.repeat(padding) + text : text;
    };
    // Верхушка
    lines.push(center('W'));
    // Одиночная звезда
    lines.push(center('*'));
    // Генерация уровней елки
    for (let level = 1; level <= levels && level <= 4; level++) {
        const starsCount = getStarsCount(level);
        const stars = '*'.repeat(starsCount);
        // Чередуем @ в начале и в конце
        if (level % 2 === 1) {
            // Нечетные уровни: @ в начале
            lines.push(center(`@${stars}`));
        }
        else {
            // Четные уровни: @ в конце
            lines.push(center(`${stars}@`));
        }
    }
    // Ствол (TTTTT два раза)
    lines.push(center('TTTTT'));
    lines.push(center('TTTTT'));
    // Запись в файл
    const tree = lines.join('\n');
    fs.writeFileSync(outputPath, tree, 'utf8');
    console.log(`Ёлка сгенерирована в ${outputPath}`);
}
// Пример запуска: ts-node treeGenerator.ts 4 output.txt
if (require.main === module) {
    const levels = parseInt(process.argv[2], 10);
    const outputPath = process.argv[3];
    if (!levels || !outputPath) {
        console.error('Использование: ts-node treeGenerator.ts <уровни> <путь_к_файлу>');
        process.exit(1);
    }
    generateTree(levels, outputPath);
}

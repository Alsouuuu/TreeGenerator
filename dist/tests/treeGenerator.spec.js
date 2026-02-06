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
const test_1 = require("@playwright/test");
const treeGenerator_1 = require("../src/treeGenerator");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
test_1.test.describe('Tree Generator Tests', () => {
    const testOutput = path.join(__dirname, 'test_tree.txt');
    test_1.test.afterEach(() => {
        if (fs.existsSync(testOutput))
            fs.unlinkSync(testOutput); // Чистим файл после теста
    });
    (0, test_1.test)('Генерирует ёлку с правильной верхушкой', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n');
        (0, test_1.expect)(lines[0].trim()).toBe('W');
        (0, test_1.expect)(lines[1].trim()).toBe('*');
    });
    (0, test_1.test)('Генерирует ёлку с правильными уровнями', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n');
        (0, test_1.expect)(lines[2].trim()).toBe('@*****');
        (0, test_1.expect)(lines[3].trim()).toBe('********@');
        (0, test_1.expect)(lines[4].trim()).toBe('@*************');
        (0, test_1.expect)(lines[5].trim()).toBe('*****************@');
    });
    (0, test_1.test)('Генерирует ёлку с правильным стволом', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n');
        (0, test_1.expect)(lines[6].trim()).toBe('TTTTT');
        (0, test_1.expect)(lines[7].trim()).toBe('TTTTT');
    });
    (0, test_1.test)('Генерирует полную ёлку с 4 уровнями', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
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
        (0, test_1.expect)(lines).toEqual(expected);
    });
    (0, test_1.test)('Чередует @ символы правильно', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n').map(line => line.trim());
        // Уровень 1: @ в начале
        (0, test_1.expect)(lines[2].startsWith('@')).toBe(true);
        (0, test_1.expect)(lines[2].endsWith('@')).toBe(false);
        // Уровень 2: @ в конце
        (0, test_1.expect)(lines[3].startsWith('@')).toBe(false);
        (0, test_1.expect)(lines[3].endsWith('@')).toBe(true);
        // Уровень 3: @ в начале
        (0, test_1.expect)(lines[4].startsWith('@')).toBe(true);
        (0, test_1.expect)(lines[4].endsWith('@')).toBe(false);
        // Уровень 4: @ в конце
        (0, test_1.expect)(lines[5].startsWith('@')).toBe(false);
        (0, test_1.expect)(lines[5].endsWith('@')).toBe(true);
    });
    (0, test_1.test)('Содержит правильное количество звезд на каждом уровне', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n').map(line => line.trim());
        (0, test_1.expect)(lines[2].replace(/@/g, '').length).toBe(5); // @*****
        (0, test_1.expect)(lines[3].replace(/@/g, '').length).toBe(8); // ********@
        (0, test_1.expect)(lines[4].replace(/@/g, '').length).toBe(13); // @*************
        (0, test_1.expect)(lines[5].replace(/@/g, '').length).toBe(17); // *****************@
    });
    (0, test_1.test)('Создает файл по указанному пути', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        (0, test_1.expect)(fs.existsSync(testOutput)).toBe(true);
    });
    (0, test_1.test)('Генерирует ёлку с центрированием', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n');
        // Проверяем, что верхушка и ствол имеют отступы
        (0, test_1.expect)(lines[0].startsWith(' ')).toBe(true); // W
        (0, test_1.expect)(lines[1].startsWith(' ')).toBe(true); // *
        (0, test_1.expect)(lines[6].startsWith(' ')).toBe(true); // TTTTT
    });
    (0, test_1.test)('Бросает ошибку при levels < 1', () => {
        (0, test_1.expect)(() => (0, treeGenerator_1.generateTree)(0, testOutput)).toThrow('Levels must be at least 1');
    });
    (0, test_1.test)('Бросает ошибку при отрицательных levels', () => {
        (0, test_1.expect)(() => (0, treeGenerator_1.generateTree)(-1, testOutput)).toThrow('Levels must be at least 1');
    });
    (0, test_1.test)('Генерирует идентичные файлы при повторном запуске', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content1 = fs.readFileSync(testOutput, 'utf8');
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content2 = fs.readFileSync(testOutput, 'utf8');
        (0, test_1.expect)(content1).toBe(content2);
    });
    (0, test_1.test)('Содержит ровно 8 строк для 4 уровней', () => {
        (0, treeGenerator_1.generateTree)(4, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n');
        (0, test_1.expect)(lines.length).toBe(8);
    });
    (0, test_1.test)('Генерирует ёлку с 1 уровнем', () => {
        (0, treeGenerator_1.generateTree)(1, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n').map(line => line.trim());
        const expected = [
            'W',
            '*',
            '@*****',
            'TTTTT',
            'TTTTT'
        ];
        (0, test_1.expect)(lines).toEqual(expected);
        (0, test_1.expect)(lines.length).toBe(5); // W + * + 1 уровень + 2 ствола
    });
    (0, test_1.test)('Генерирует ёлку с 2 уровнями', () => {
        (0, treeGenerator_1.generateTree)(2, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n').map(line => line.trim());
        const expected = [
            'W',
            '*',
            '@*****',
            '********@',
            'TTTTT',
            'TTTTT'
        ];
        (0, test_1.expect)(lines).toEqual(expected);
        (0, test_1.expect)(lines.length).toBe(6); // W + * + 2 уровня + 2 ствола
    });
    (0, test_1.test)('Генерирует ёлку с 3 уровнями', () => {
        (0, treeGenerator_1.generateTree)(3, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
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
        (0, test_1.expect)(lines).toEqual(expected);
        (0, test_1.expect)(lines.length).toBe(7); // W + * + 3 уровня + 2 ствола
    });
    (0, test_1.test)('Генерирует ёлку с 5 уровнями', () => {
        (0, treeGenerator_1.generateTree)(5, testOutput);
        const content = fs.readFileSync(testOutput, 'utf8');
        const lines = content.split('\n').map(line => line.trim());
        (0, test_1.expect)(lines[0]).toBe('W');
        (0, test_1.expect)(lines[1]).toBe('*');
        (0, test_1.expect)(lines[2]).toBe('@*****');
        (0, test_1.expect)(lines[3]).toBe('********@');
        (0, test_1.expect)(lines[4]).toBe('@*************');
        (0, test_1.expect)(lines[5]).toBe('*****************@');
        (0, test_1.expect)(lines[6]).toBe('TTTTT');
        (0, test_1.expect)(lines[7]).toBe('TTTTT');
        (0, test_1.expect)(lines.length).toBe(8); // W + * + 4 уровня отображается + 2 ствола
    });
    (0, test_1.test)('Количество строк зависит от уровней правильно', () => {
        // 1 уровень
        (0, treeGenerator_1.generateTree)(1, testOutput);
        let content = fs.readFileSync(testOutput, 'utf8');
        let lines = content.split('\n');
        (0, test_1.expect)(lines.length).toBe(5); // W + * + 1 + TTTTT + TTTTT
        // 2 уровня
        (0, treeGenerator_1.generateTree)(2, testOutput);
        content = fs.readFileSync(testOutput, 'utf8');
        lines = content.split('\n');
        (0, test_1.expect)(lines.length).toBe(6); // W + * + 2 + TTTTT + TTTTT
        // 3 уровня
        (0, treeGenerator_1.generateTree)(3, testOutput);
        content = fs.readFileSync(testOutput, 'utf8');
        lines = content.split('\n');
        (0, test_1.expect)(lines.length).toBe(7); // W + * + 3 + TTTTT + TTTTT
        // 4 уровня
        (0, treeGenerator_1.generateTree)(4, testOutput);
        content = fs.readFileSync(testOutput, 'utf8');
        lines = content.split('\n');
        (0, test_1.expect)(lines.length).toBe(8); // W + * + 4 + TTTTT + TTTTT
    });
});

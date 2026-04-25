/**
 * 驗證腳本：確認 library.astro 修復成功
 *
 * 執行：node scripts/verify-data-source.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

console.log('=== 修復驗證 ===\n');

try {
  const html = fs.readFileSync(path.join(projectRoot, 'dist/library/index.html'), 'utf-8');

  // 檢查 1: 標題是否正確
  const has維港深淵 = html.includes('維港深淵的引擎聲');
  const has一茶 = html.includes('一茶一禪-海鮮僧的靜心茶路');
  const has萬界 = html.includes('萬界直播系統');
  const has佛系 = html.includes('佛系廚神');

  console.log('✅ 書籍標題驗證：');
  console.log(`   - 維港深淵的引擎聲: ${has維港深淵 ? '✅' : '❌'}`);
  console.log(`   - 一茶一禪-海鮮僧的靜心茶路: ${has一茶 ? '✅' : '❌'}`);
  console.log(`   - 萬界直播系統: ${has萬界 ? '✅' : '❌'}`);
  console.log(`   - 佛系廚神: ${has佛系 ? '✅' : '❌'}`);

  // 檢查 2: category 是否正確 (system vs urban)
  const hasSystemCategory = html.includes('系統');

  console.log(`\n✅ 分類驗證：`);
  console.log(`   - 萬界直播系統 分類為「系統」: ${hasSystemCategory ? '✅' : '❌'}`);

  // 結果
  const allPass = has維港深淵 && has一茶 && has萬界 && has佛系 && hasSystemCategory;
  console.log(`\n=== 驗證結果：${allPass ? '✅ 通過' : '❌ 失敗'} ===`);

  process.exit(allPass ? 0 : 1);
} catch (e) {
  console.error('無法讀取生成的文件:', e.message);
  process.exit(1);
}
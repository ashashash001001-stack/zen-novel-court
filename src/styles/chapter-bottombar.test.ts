import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Reader Bottom Bar CSS', () => {
  it('should have solid background, not transparent gradient', () => {
    // Read the chapter page file
    const chapterFilePath = path.join(process.cwd(), 'src/pages/book/[novel]/[chapter].astro');
    const content = fs.readFileSync(chapterFilePath, 'utf-8');

    // Extract the .reader-bottombar CSS block
    const bottombarMatch = content.match(/\.reader-bottombar\s*\{[^}]+\}/s);
    expect(bottombarMatch).toBeDefined();

    const bottombarCSS = bottombarMatch![0];

    // Should have background property with var(--bg-base)
    expect(bottombarCSS).toContain('background: var(--bg-base)');

    // Should NOT have background-image with gradient (which would make it transparent)
    expect(bottombarCSS).not.toContain('background-image:');

    // Should NOT contain transparent keyword
    expect(bottombarCSS).not.toContain('transparent');

    // Verify the gradient that was causing the issue is not present
    expect(bottombarCSS).not.toContain('linear-gradient');
  });
});
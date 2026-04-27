/**
 * TDD Test: CSS Spacing Token Validation
 *
 * This test verifies that CSS files use design system spacing tokens
 * instead of hardcoded values.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname);
const issues = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Issue 1: Hardcoded rem values (e.g., 0.5rem, 1.5rem)
  const hardcodedRemRegex = /margin:\s*[\d.]+rem|padding:\s*[\d.]+rem|margin-bottom:\s*[\d.]+rem|margin:\s*[\d.]+rem\s+0|margin:\s*[\d.]+rem\s+0\s+[\d.]+rem/g;
  const hardcodedMatches = content.match(hardcodedRemRegex);
  if (hardcodedMatches) {
    issues.push({
      file: filePath,
      type: 'hardcoded-rem',
      count: hardcodedMatches.length,
      examples: hardcodedMatches.slice(0, 3)
    });
  }

  // Note: --color-text-muted IS defined in tokens.css as valid design token
  // So we skip this check

  // Note: --space-* and --spacing-* are both valid design tokens in tokens.css
  // So we skip this check as both are acceptable
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (file.endsWith('.astro')) {
      checkFile(fullPath);
    }
  }
}

// Run test
console.log('=== Running Spacing Token Validation Test ===\n');
scanDirectory(path.join(projectRoot, 'src'));

if (issues.length > 0) {
  console.log(`❌ FAIL: Found ${issues.length} spacing issues:\n`);

  // Group by type
  const byType = {};
  issues.forEach(issue => {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  });

  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`[${type.toUpperCase()}]`);
    typeIssues.forEach(issue => {
      const relPath = path.relative(projectRoot, issue.file);
      console.log(`  - ${relPath}`);
      if (issue.examples) {
        issue.examples.forEach(ex => console.log(`    → ${ex}`));
      }
    });
    console.log('');
  }

  process.exit(1);
} else {
  console.log('✅ PASS: All spacing tokens are correctly used');
  process.exit(0);
}
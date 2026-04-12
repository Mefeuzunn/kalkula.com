import fs from 'fs';
import path from 'path';

const calculatorsDir = '/Users/mugefe/.gemini/antigravity/scratch/multi-tool-hub/src/components/calculators';

function auditFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find icons imported from lucide-react
  const lucideMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+["']lucide-react["']/);
  const importedIcons = lucideMatch 
    ? lucideMatch[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean)
    : [];
  
  // Also handle aliased imports like "Activity as Pulse"
  const aliasedIcons = lucideMatch 
    ? lucideMatch[1].split(',').map(s => {
        const parts = s.trim().split(/\s+as\s+/);
        return parts.length === 2 ? parts[1] : parts[0];
      }).filter(Boolean)
    : [];
    
  const allImported = [...new Set([...importedIcons, ...aliasedIcons])];

  // Find icons used in JSX (e.g., <IconName ... /> or accentIcon={<IconName ... />})
  // This is a rough regex, but should catch most cases.
  const usedIcons = [];
  const jsxRegex = /<([A-Z][a-zA-Z0-9]*)\s/g;
  let match;
  while ((match = jsxRegex.exec(content)) !== null) {
    usedIcons.push(match[1]);
  }
  
  // Find icons passed as props like icon: <IconName ... />
  const propRegex = /icon:\s*<([A-Z][a-zA-Z0-9]*)\s/g;
  while ((match = propRegex.exec(content)) !== null) {
    usedIcons.push(match[1]);
  }
  
  const uniqueUsed = [...new Set(usedIcons)];
  
  const standardComponents = ['V2CalculatorWrapper', 'V2Input', 'V2ActionRow', 'V2ResultCard', 'V2Premium3DResult', 'V2Select', 'Link', 'Fragment', 'React'];
  
  const missing = uniqueUsed.filter(icon => 
    !allImported.includes(icon) && 
    !standardComponents.includes(icon)
  );

  if (missing.length > 0) {
    console.log(`File: ${filePath}`);
    console.log(`  Imported: ${allImported.join(', ')}`);
    console.log(`  Used: ${uniqueUsed.join(', ')}`);
    console.log(`  MISSING: ${missing.join(', ')}`);
    console.log('---');
  }
}

function scanDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'ui-v2') scanDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      auditFile(fullPath);
    }
  }
}

scanDir(calculatorsDir);

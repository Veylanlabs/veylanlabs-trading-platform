const fs = require('fs');
let code = fs.readFileSync('src/app/client-page.tsx', 'utf8');

// The issue is that I changed `<div className="sec">` to `<motion.div className="sec"...>`
// But I left the closing tags as `</div>`.
// Instead of reverting the opening tags, let's find the sections and replace the closing tags!
// Or just revert the opening tags because it's much safer and simpler.

// Let's replace the 5 instances of <motion.div className="sec"...> back to <div className="sec"...>
code = code.replace(/<motion\.div\s+className="sec"[\s\S]*?initial={{ opacity: 0, y: 50 }}[\s\S]*?transition={{ duration: 0\.6, ease: "easeOut" }}\s*>/g, (match) => {
  // If it has id="features"
  if (match.includes('id="features"')) return '<div className="sec" id="features">';
  // If it has id="faq"
  if (match.includes('id="faq"')) return '<div className="sec" id="faq">';
  // If it has style={{ border: "none" }}
  if (match.includes('border: "none"')) return '<div className="sec" style={{ border: "none" }}>';
  
  // Otherwise it's just <div className="sec">
  return '<div className="sec">';
});

fs.writeFileSync('src/app/client-page.tsx', code);
console.log('Fixed syntax errors.');

// Fetch quote of the day from ZenQuotes
const request = await fetch("https://zenquotes.io/api/today");
const json = await request.json();

// Extract quote and author
const quote = json[0].q;
const author = json[0].a;

// Build template for injection
const template = `> "${quote}"\n>\n> — ${author}`;

// Read the current README content
const markdown = await Deno.readTextFile("./README.md");

// Define regex to locate the quote block
const regex =
  /^(<!--\s*QUOTEOTD:(START|start)\s*-->)(?:\n|)([\s\S]*?)(?:\n|)(<!--\s*QUOTEOTD:(END|end)\s*-->)/gm;

// Replace old content with new quote
const result = markdown.replace(regex, `$1\n${template}\n$4`);

// Write updated content back to README.md
await Deno.writeTextFile("./README.md", result);

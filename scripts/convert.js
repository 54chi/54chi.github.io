#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const POSTS_SOURCE = path.join(ROOT, '_posts');

const SKIP_DIRS = new Set([
  '_site', '_posts', '_includes', '_layouts', '_drafts',
  'assets', 'content', 'node_modules', 'page', 'tag',
  'author', 'src', 'scripts'
]);

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });

const manifest = [];

// 1. Convert root-level HTML directories
for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;

  const htmlPath = path.join(ROOT, entry.name, 'index.html');
  if (!fs.existsSync(htmlPath)) continue;

  const $ = cheerio.load(fs.readFileSync(htmlPath, 'utf8'));

  const title = $('meta[property="og:title"]').attr('content')
    || $('h1.post-title').text().trim()
    || entry.name;

  const publishedRaw = $('meta[property="article:published_time"]').attr('content');
  const date = publishedRaw ? publishedRaw.slice(0, 10) : '2016-01-01';

  const tags = [];
  $('meta[property="article:tag"]').each((_, el) => {
    const t = $(el).attr('content');
    if (t) tags.push(t);
  });

  const contentHtml = $('section.post-content').html() || '';
  const markdown = td.turndown(contentHtml);

  const slug = `${date}-${entry.name}`;
  const fm = `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndate: ${date}\ntags: [${tags.join(', ')}]\n---\n\n`;

  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fm + markdown + '\n');
  manifest.push({ slug, title, date, tags });
  console.log(`✓ HTML  ${slug}`);
}

// 2. Copy and reformat _posts/*.md
if (fs.existsSync(POSTS_SOURCE)) {
  for (const file of fs.readdirSync(POSTS_SOURCE)) {
    if (!file.endsWith('.md')) continue;

    const raw = fs.readFileSync(path.join(POSTS_SOURCE, file), 'utf8');
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) continue;

    const fmRaw = fmMatch[1];
    const body = fmMatch[2];

    const titleMatch = fmRaw.match(/^title:\s*"?(.+?)"?\s*$/m);
    const dateMatch = fmRaw.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
    const tagsBlockMatch = fmRaw.match(/^tags:\n((?:- .+\n?)+)/m);

    const title = titleMatch ? titleMatch[1] : file;
    const date = dateMatch ? dateMatch[1] : file.slice(0, 10);
    const tags = tagsBlockMatch
      ? tagsBlockMatch[1].split('\n').map(t => t.replace(/^-\s*/, '').trim()).filter(Boolean)
      : [];

    const slug = file.replace(/\.md$/, '');
    const fm = `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndate: ${date}\ntags: [${tags.join(', ')}]\n---\n\n`;

    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fm + body);
    manifest.push({ slug, title, date, tags });
    console.log(`✓ POST  ${slug}`);
  }
}

// 3. Sort and write posts.json
manifest.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(ROOT, 'posts.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n✓ posts.json written with ${manifest.length} entries`);

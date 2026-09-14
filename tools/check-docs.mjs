import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Dependency-free checks for generated documentation, not a second Xray validator.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = resolve(root, process.argv[2] || 'public');
const read = path => readFileSync(path, 'utf8');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const path = join(dir, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const json = file => JSON.parse(read(join(root, 'static/examples', file)));
const manifest = json('manifest.json');
const byFile = new Map(manifest.examples.map(example => [example.file, example]));
assert.equal(byFile.size, manifest.examples.length, 'Duplicate example');

for (const example of manifest.examples) {
  const config = json(example.file);
  assert.ok(config && !Array.isArray(config) && typeof config === 'object');
  assert.ok(Array.isArray(config.outbounds) && config.outbounds.length);
  assert.ok(!example.file.includes('.preview.'), 'Examples must use stable filenames');
  if (example.type === 'custom') {
    assert.ok([...config.name].length > 0 && [...config.name].length <= 32);
    assert.ok(config.outbounds.length <= 3);
    assert.ok(config.outbounds.every(o => Object.keys(o).length === 0), 'Custom only stores empty slots');
    assert.equal(config.routing.domainStrategy, 'IPIfNonMatch');
    const allowed = new Set(['ruleTag', 'domain', 'ip', 'port', 'network', 'protocol', 'localOS', 'outboundTag', 'balancerTag']);
    for (const rule of config.routing.rules || []) {
      assert.ok(Object.keys(rule).every(k => allowed.has(k)), example.file + ': unsupported rule field');
      assert.ok((rule.balancerTag === 'proxy' && !rule.outboundTag) ||
        (['direct', 'block'].includes(rule.outboundTag) && !rule.balancerTag));
    }
    assert.equal(config.dns.servers.filter(s => s.tag === 'app-dns-direct').length, 1);
    for (const server of config.dns.servers) {
      assert.deepEqual(Object.keys(server).sort(), ['address', 'tag']);
      if (server.tag !== 'app-dns-direct') {
        assert.equal(server.tag, 'app-dns-fake');
        assert.equal(server.address, 'fakedns');
      }
    }
  } else {
    assert.ok(example.requiresReplacement, 'Server examples must be labelled credential templates');
    assert.ok(config.outbounds.every(o => o.protocol && o.tag));
    if (example.type === 'outbound') assert.equal(config.outbounds.length, 1);
    if (example.type === 'raw') {
      assert.ok(config.name);
      for (const managed of ['log', 'metrics', 'stats', 'env', 'geodata', 'inbounds']) {
        assert.ok(!(managed in config), 'Raw template must omit managed/dependency-download fields: ' + managed);
      }
      const tags = new Set(config.outbounds.map(o => o.tag));
      const pools = new Set((config.routing.balancers || []).map(b => b.tag));
      assert.equal(tags.size, config.outbounds.length);
      for (const outbound of config.outbounds) {
        const via = outbound.streamSettings?.sockopt?.dialerProxy;
        if (via) assert.ok(tags.has(via), 'Missing dialerProxy target');
      }
      for (const rule of config.routing.rules) {
        if (rule.outboundTag) assert.ok(tags.has(rule.outboundTag));
        if (rule.balancerTag) assert.ok(pools.has(rule.balancerTag));
      }
      for (const pool of config.routing.balancers || []) {
        assert.ok(pool.selector.every(tag => tags.has(tag)), 'Use full existing tags');
        assert.ok(tags.has(pool.fallbackTag));
      }
    }
  }
  assert.deepEqual(JSON.parse(read(join(output, 'examples', example.file))), config);
}

let pageCount = 0;
let checkedLinks = 0;
const localTargets = new Set();
const checkLink = (href, source) => {
  if (!href || /^(mailto:|tel:|onexray:|data:|javascript:)/i.test(href)) return;
  const from = new URL(relative(output, source), 'https://onexray.com/');
  let target;
  try { target = new URL(href.replaceAll('&amp;', '&'), from); } catch { return; }
  if (target.origin !== 'https://onexray.com') return;
  const path = resolve(output, '.' + decodeURIComponent(target.pathname));
  assert.ok(path === output || path.startsWith(output + '/'), 'Outside output');
  const file = existsSync(path) && statSync(path).isDirectory() ? join(path, 'index.html') : path;
  if (localTargets.has(file)) return;
  assert.ok(existsSync(file), `Broken local link: ${href} from ${relative(output, source)}`);
  localTargets.add(file); checkedLinks++;
};

const sourceSets = ['en', 'zh', 'ru'].map(lang => walk(join(root, 'content.' + lang))
  .map(p => relative(join(root, 'content.' + lang), p)).sort());
assert.deepEqual(sourceSets[1], sourceSets[0], 'Chinese page paths differ');
assert.deepEqual(sourceSets[2], sourceSets[0], 'Russian page paths differ');

for (const lang of ['en', 'zh', 'ru']) {
  const prefix = lang === 'en' ? '' : lang + '/';
  const full = read(join(output, prefix, 'llms-full.txt'));
  const index = read(join(output, prefix, 'llms.txt'));
  const promptPage = read(join(output, prefix, 'docs/ai/index.html'));
  const publicGuide = `https://onexray.com/${prefix}llms-full.txt`;
  assert.ok(promptPage.includes(publicGuide), lang + ': prompt must use the public domain');
  assert.ok(!/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/[^\s<"']*llms/.test(promptPage), lang + ': local AI link leaked into HTML');
  assert.ok(full.length > 15000, lang + ': empty/incomplete full guide');
  assert.ok(!/\{\{[%<]|HAHAHUGOSHORTCODE|<div\b|<script\b/.test(full), lang + ': unresolved/HTML machine content');
  assert.match(full, /app-dns-direct/);
  assert.match(full, /IPIfNonMatch/);
  assert.match(full, /app-dns-fake/);
  assert.match(full, /localOS/);
  assert.ok(!/development-only|\.preview\.json/.test(full), lang + ': obsolete feature status');
  assert.match(full, /outbound-vless-tls\.json/);
  const titles = [...full.matchAll(/^Source: (.+)$/gm)].map(m => m[1]);
  assert.equal(titles.length, 17, 'Missing essential chapters in ' + lang);
  assert.equal(new Set(titles).size, titles.length);
  for (const example of manifest.examples) {
    assert.ok(full.includes(JSON.stringify(json(example.file), null, 2)), lang + ': missing full example ' + example.file);
  }
  for (const document of [full, index]) {
    assert.ok(document.includes(publicGuide), lang + ': missing public full-guide URL');
    assert.ok(!/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\//.test(document), lang + ': local URL leaked into machine-readable documentation');
    for (const match of document.matchAll(/\]\(([^\s)]+)\)/g)) checkLink(match[1], join(output, prefix, 'llms-full.txt'));
  }
  for (const file of walk(join(root, 'content.' + lang, 'docs'))) {
    const rel = relative(join(root, 'content.' + lang), file).replace(/_index\.md$/, 'index.md');
    const generated = join(output, prefix, rel);
    const markdown = read(generated);
    assert.ok(!/\{\{[%<]|HAHAHUGOSHORTCODE/.test(markdown), 'Unexpanded Markdown: ' + rel);
    assert.match(markdown, /^# /);
    assert.match(markdown, /Source: https:\/\/onexray\.com\//);
    assert.ok(!/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/(?:zh\/|ru\/)?(?:docs\/|llms)/.test(markdown), 'Local documentation URL: ' + rel);
    for (const match of markdown.matchAll(/\]\(([^\s)]+)\)/g)) checkLink(match[1], generated);
    for (const match of markdown.matchAll(/```json\s*\n([\s\S]*?)\n```/g)) JSON.parse(match[1]);
    pageCount++;
  }
}

for (const file of walk(output).filter(p => extname(p) === '.html')) {
  const html = read(file);
  for (const match of html.matchAll(/\b(?:href|src)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    checkLink(match[1] ?? match[2] ?? match[3], file);
  }
  if (file.includes('/docs/') && !file.endsWith('/404.html')) {
    assert.ok(/\btype=(?:"text\/markdown"|'text\/markdown'|text\/markdown(?=[\s>]))/.test(html), 'Missing Markdown alternative: ' + file);
    assert.ok(/\brel=(?:"describedby"|'describedby'|describedby(?=[\s>]))/.test(html), 'Missing AI index: ' + file);
  }
}
console.log(`PASS: ${manifest.examples.length} examples; ${pageCount} Markdown pages; 3 full guides; ${checkedLinks} local targets.`);
console.log('This check does not run App imports, libXray or a VPN. Use the separate integration check for those contracts.');

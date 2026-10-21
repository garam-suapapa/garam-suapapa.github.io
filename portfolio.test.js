const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const coverLetter = fs.readFileSync('cover_letter.md', 'utf8');
const caseFiles = ['legend', 'moonlight', 'madworld', 'warofcrown', 'slashheavens', 'guardians'];

test('submission HTML redirects to the public portfolio with a fallback link', () => {
  const redirectHtml = fs.readFileSync('HongGaram_Portfolio.html', 'utf8');
  assert.match(redirectHtml, /http-equiv="refresh"/i);
  assert.match(redirectHtml, /content="0;\s*url=https:\/\/garam-suapapa\.github\.io\/"/i);
  assert.match(redirectHtml, /<a href="https:\/\/garam-suapapa\.github\.io\/"/i);
});

test('career work is one continuous document before tools and contact', () => {
  const profileIndex = html.indexOf('id="profile"');
  const projectIndex = html.indexOf('id="projects"');
  const careerIndex = html.indexOf('id="career"');
  const skillsIndex = html.indexOf('id="skills"');
  assert.ok(profileIndex > -1 && careerIndex > profileIndex);
  assert.ok(projectIndex > careerIndex && skillsIndex > projectIndex);
  assert.doesNotMatch(html, /class="featured-grid"|class="project-list"/);
  assert.ok(html.indexOf('id="legend-memory"') < html.indexOf('id="legend-stamina"'));
  assert.ok(html.indexOf('id="moonlight-raid"') < html.indexOf('id="moonlight-event"'));
});

test('all six careers expose their full case content inline', () => {
  for (const name of caseFiles) {
    assert.ok(html.includes(`id="career-${name}"`));
    const source = fs.readFileSync(path.join('cases', `${name}.html`), 'utf8');
    for (const match of source.matchAll(/class="case-section" id="([^"]+)"/g)) {
      assert.ok(html.includes(`id="${name}-${match[1]}"`));
    }
    assert.ok(fs.existsSync(path.join('cases', `${name}.html`)));
  }
  assert.doesNotMatch(html, /id="projectModal"|aria-haspopup="dialog"/);
});

test('case studies contain readable static content and common navigation', () => {
  for (const name of caseFiles) {
    const content = fs.readFileSync(path.join('cases', `${name}.html`), 'utf8');
    assert.match(content, /id="content"/);
    assert.match(content, /class="case-section"/);
    assert.match(content, /\.\.\/index\.html#/);
    assert.match(content, /\.\.\/case-study\.css/);
    assert.match(content, /\.\.\/case-study\.js/);
  }
});

test('case studies do not copy fictional preview rules into career content', () => {
  const content = caseFiles.map((name) => fs.readFileSync(path.join('cases', `${name}.html`), 'utf8')).join('\n');
  assert.doesNotMatch(content, /입장 비용이 10|자동 6 \/ 추가 8|중복 요청/);
  assert.doesNotMatch(content, /참여율 향상|이탈 감소|결제 전환율 향상/);
});

test('skills retain the concise OA and AI labels', () => {
  assert.match(html, /<h3>OA<\/h3>/);
  assert.match(html, /<h3>AI<\/h3>/);
  assert.doesNotMatch(html, /Level\s*[1-5]|Claude &amp; Gemini/);
});

test('persistent contents link to unique existing targets including the appendix', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs must stay unique after merging case pages');
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), match[1]);
  assert.match(html, /id="portfolio-toc"/);
  assert.match(html, /id="reading-position"/);
  assert.match(html, /id="ai-heart"/);
  assert.match(script, /setAttribute\('aria-current', 'location'\)/);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const local = match[1].split('?')[0];
    if (!/^(https?:|mailto:|tel:)/.test(local)) assert.ok(fs.existsSync(local), local);
  }
});

test('theme selection is shared by main, case, and deliverable pages', () => {
  const caseScript = fs.readFileSync('case-study.js', 'utf8');
  assert.match(script, /portfolio-theme/);
  assert.match(caseScript, /portfolio-theme/);
  for (const page of ['legendofheroes.html', 'moonlight.html', 'warofcrown.html']) {
    const content = fs.readFileSync(page, 'utf8');
    assert.match(content, /case-study\.js/);
  }
});

test('experience is consistently described as ten years', () => {
  assert.doesNotMatch(html, /11년/);
  assert.doesNotMatch(coverLetter, /11년/);
  assert.match(html, /10년 차 시스템\/컨텐츠 기획자/);
});

test('content checks record facts that still need confirmation', () => {
  const checks = fs.readFileSync('PORTFOLIO_CONTENT_CHECKS.md', 'utf8');
  assert.match(checks, /구글 마켓 Top 5/);
  assert.match(checks, /충전 스태미너/);
  assert.match(checks, /달빛조각사와 다크게이머 중 어느 프로젝트/);
});

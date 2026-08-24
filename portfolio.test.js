const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const coverLetter = fs.readFileSync('cover_letter.md', 'utf8');

test('profile context appears before featured projects', () => {
  const profileIndex = html.indexOf('id="profile"');
  const projectIndex = html.indexOf('id="projects"');
  const skillsIndex = html.indexOf('id="skills"');

  assert.ok(profileIndex > -1);
  assert.ok(projectIndex > -1);
  assert.ok(profileIndex < projectIndex);
  assert.ok(projectIndex < skillsIndex);
});

test('project cards expose decision-making information', () => {
  assert.match(html, /class="project-role"/);
  assert.match(html, /class="project-period"/);
  assert.match(html, /class="project-highlight"/);
});

test('skills use evidence labels instead of arbitrary levels', () => {
  assert.doesNotMatch(html, /Level\s*[1-5]/);
  assert.match(html, /class="skill-evidence"/);
});

test('project filters only expose useful categories', () => {
  assert.doesNotMatch(html, /data-filter="etc"/);
  assert.doesNotMatch(html, />삼국지 &amp; 기타</);
  assert.match(html, /data-project="slashheavens"[^>]*data-category="rpg"/);
});

test('deliverable links use a concise consistent label', () => {
  assert.doesNotMatch(script, /작업 산출물 \(전체 원본 보기\)/);
  assert.doesNotMatch(script, /영웅전설 작업 산출물|달빛조각사 작업 산출물/);
  assert.match(script, /text: "📄 작업 산출물"/);
});

test('experience is consistently described as ten years', () => {
  assert.doesNotMatch(html, /11년/);
  assert.doesNotMatch(coverLetter, /11년/);
  assert.match(html, /10년 차 시스템\/컨텐츠 기획자/);
});

test('featured heading and AI skill stay concise', () => {
  assert.doesNotMatch(html, /최근 경력과 리딩 경험을 중심으로/);
  assert.doesNotMatch(html, /Claude &amp; Gemini \(AI\)|Claude & Gemini \(AI\)/);
  assert.doesNotMatch(html, /기획 초안·업무 보조/);
  assert.match(html, /<span class="skill-name">AI<\/span>/);
  assert.match(html, /<span class="skill-evidence">업무 보조<\/span>/);
});

test('project cards and modal have accessible semantics', () => {
  assert.match(html, /class="project-card[^\"]*"[^>]*tabindex="0"[^>]*role="button"/);
  assert.match(html, /id="projectModal"[^>]*role="dialog"[^>]*aria-modal="true"/);
  assert.match(html, /id="closeModal"[^>]*aria-label="프로젝트 상세 닫기"/);
  assert.match(script, /event\.key === 'Escape'/);
  assert.match(script, /previouslyFocusedElement\.focus\(\)/);
});

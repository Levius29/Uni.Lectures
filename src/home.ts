import './styles/theme.css';
import './styles/home.css';
import { course, lessons } from './lessons';

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const main = document.querySelector<HTMLElement>('#corso')!;
const pending = course.totalLessons - lessons.length;

main.innerHTML = `
<header class="home-head">
  <h1>${esc(course.title)}</h1>
  <p class="home-sub">${esc(course.subtitle)}</p>
</header>
<ol class="lesson-list">
${lessons.map(l => {
  const ready = l.status !== 'in preparazione';
  const inner = `<span class="l-num">${Number(l.id)}</span><span class="l-title">${esc(l.title)}</span><span class="l-meta">${l.minutes} min, ${esc(l.status)}</span>`;
  return `<li class="${ready ? 'ready' : 'pending'}">${ready ? `<a href="./lezioni/${l.id}/">${inner}</a>` : `<div>${inner}</div>`}</li>`;
}).join('\n')}
</ol>
<footer class="home-foot">
  <p>${pending > 0 ? `Altre ${pending} lezioni in preparazione.` : ''}</p>
  <p>In aula: frecce per avanzare, <kbd>S</kbd> note del relatore, <kbd>F</kbd> schermo intero, <kbd>Esc</kbd> panoramica.</p>
</footer>`;

const FILMS = [
  { id: 'home-alone', title: 'Home Alone', year: 1990, image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Home_Alone_1990_film_poster.jpg' },
  { id: 'home-alone-2', title: 'Home Alone 2', year: 1992, image: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Home_Alone_2_1992_film_poster.jpg' },
  { id: 'elf', title: 'Elf', year: 2003, image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Elf_2003_film_poster.jpg' },
  { id: 'grinch', title: 'How the Grinch Stole Christmas', year: 2000, image: 'https://upload.wikimedia.org/wikipedia/en/1/19/How_the_Grinch_Stole_Christmas_film_poster.jpg' },
  { id: 'polar-express', title: 'The Polar Express', year: 2004, image: 'https://upload.wikimedia.org/wikipedia/en/2/28/The_Polar_Express_%28film%29_poster.jpg' },
  { id: 'love-actually', title: 'Love Actually', year: 2003, image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Love_Actually_movie.jpg' },
  { id: 'klaus', title: 'Klaus', year: 2019, image: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Klaus_%282019_film%29.png' },
  { id: 'the-holiday', title: 'The Holiday', year: 2006, image: 'https://upload.wikimedia.org/wikipedia/en/9/9c/The_Holiday_%282006_film%29.jpg' },
  { id: 'christmas-carol', title: 'A Christmas Carol', year: 2009, image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Christmas_Carol_2009_poster.jpg' },
  { id: 'muppet-carol', title: 'The Muppet Christmas Carol', year: 1992, image: 'https://upload.wikimedia.org/wikipedia/en/8/8f/The_Muppet_Christmas_Carol_poster.jpg' },
  { id: 'christmas-vacation', title: "Christmas Vacation", year: 1989, image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/National_Lampoon%27s_Christmas_Vacation_poster.jpg' },
  { id: 'die-hard', title: 'Die Hard', year: 1988, image: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg' },
];

const TIERS = ['S', 'A', 'B', 'C', 'D'];
const WEIGHTS = { S: 5, A: 4, B: 3, C: 2, D: 1 };
const SAMPLE_RESULTS = {
  'home-alone': { S: 18, A: 6, B: 2, C: 1, D: 0 },
  'elf': { S: 10, A: 13, B: 3, C: 1, D: 0 },
  'love-actually': { S: 6, A: 11, B: 8, C: 2, D: 0 },
  'grinch': { S: 5, A: 10, B: 8, C: 3, D: 1 },
  'home-alone-2': { S: 5, A: 9, B: 9, C: 3, D: 1 },
  'polar-express': { S: 4, A: 7, B: 8, C: 6, D: 2 },
  'klaus': { S: 6, A: 5, B: 7, C: 4, D: 1 },
  'the-holiday': { S: 3, A: 7, B: 8, C: 4, D: 1 },
  'christmas-vacation': { S: 4, A: 4, B: 7, C: 7, D: 2 },
  'muppet-carol': { S: 3, A: 5, B: 6, C: 4, D: 2 },
  'christmas-carol': { S: 2, A: 5, B: 8, C: 6, D: 3 },
  'die-hard': { S: 4, A: 5, B: 6, C: 7, D: 3 },
};

const filmById = Object.fromEntries(FILMS.map((film) => [film.id, film]));
const rankings = Object.fromEntries(FILMS.map((film) => [film.id, null]));
let selectedFilmId = null;
let results = structuredClone(SAMPLE_RESULTS);

const els = {
  library: document.querySelector('#filmLibrary'),
  emptyLibrary: document.querySelector('#emptyLibrary'),
  search: document.querySelector('#searchInput'),
  hint: document.querySelector('#selectionHint'),
  board: document.querySelector('#board'),
  dialog: document.querySelector('#nameDialog'),
  form: document.querySelector('#nameForm'),
  name: document.querySelector('#nameInput'),
  dialogStatus: document.querySelector('#dialogStatus'),
  toast: document.querySelector('#toast'),
  community: document.querySelector('#communityGrid'),
  voteCount: document.querySelector('#voteCount'),
};

function createFilmCard(film) {
  const card = document.createElement('button');
  card.className = 'film-card';
  card.type = 'button';
  card.draggable = true;
  card.dataset.filmId = film.id;
  card.setAttribute('aria-label', `${film.title}, ${film.year}`);
  card.innerHTML = `<img loading="lazy" src="${film.image}" alt="${film.title} — filmový plagát" /><span class="card-meta"><strong>${film.title}</strong><small>${film.year}</small></span>`;
  card.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', film.id);
    card.classList.add('is-selected');
  });
  card.addEventListener('dragend', () => card.classList.remove('is-selected'));
  card.addEventListener('click', () => {
    if (rankings[film.id]) {
      moveFilm(film.id, null);
    } else if (selectedFilmId === film.id) {
      selectedFilmId = null;
    } else {
      selectedFilmId = film.id;
    }
    render();
  });
  return card;
}

function moveFilm(filmId, tier) {
  rankings[filmId] = tier;
  selectedFilmId = null;
  render();
}

function render() {
  const query = els.search.value.trim().toLowerCase();
  els.library.innerHTML = '';
  const unranked = FILMS.filter((film) => !rankings[film.id] && film.title.toLowerCase().includes(query));
  els.emptyLibrary.hidden = unranked.length > 0;
  unranked.forEach((film) => els.library.appendChild(createFilmCard(film)));

  document.querySelectorAll('.tier-dropzone').forEach((zone) => {
    zone.innerHTML = '';
    const tier = zone.dataset.tier;
    FILMS.filter((film) => rankings[film.id] === tier).forEach((film) => zone.appendChild(createFilmCard(film)));
  });

  document.querySelectorAll('.film-card').forEach((card) => {
    if (card.dataset.filmId === selectedFilmId) card.classList.add('is-selected');
  });
  const remaining = FILMS.filter((film) => !rankings[film.id]).length;
  els.hint.textContent = selectedFilmId ? 'Teraz ťukni na S, A, B, C alebo D' : remaining ? `${remaining} filmov čaká na zaradenie` : 'Všetky filmy sú zoradené';
  els.hint.classList.toggle('is-active', Boolean(selectedFilmId));
  renderCommunity();
}

function renderCommunity() {
  const ranked = FILMS.map((film) => {
    const votes = results[film.id] || { S: 0, A: 0, B: 0, C: 0, D: 0 };
    const total = Object.values(votes).reduce((sum, value) => sum + value, 0);
    const points = Object.entries(votes).reduce((sum, [tier, count]) => sum + WEIGHTS[tier] * count, 0);
    return { film, votes, total, score: total ? points / total : 0 };
  }).sort((a, b) => b.score - a.score || b.total - a.total);

  const totalVotes = ranked.reduce((sum, item) => sum + item.total, 0);
  els.voteCount.textContent = totalVotes ? totalVotes.toLocaleString('sk-SK') : '—';
  const max = Math.max(...ranked.map((item) => item.score), 1);
  els.community.innerHTML = ranked.slice(0, 6).map((item, index) => {
    const topTier = Object.entries(item.votes).sort((a, b) => b[1] - a[1])[0][0];
    return `<article class="community-card ${index === 0 ? 'is-top' : ''}">
      <div class="community-card-top"><span class="rank-number">0${index + 1}</span><div><h4>${item.film.title}</h4><span class="film-year">${item.film.year} · najčastejšie ${topTier}</span></div></div>
      <div class="score"><strong>${item.score.toFixed(1)}</strong><span>/ 5,0 priemer</span></div>
      <div class="score-bar"><i style="width:${Math.round((item.score / max) * 100)}%"></i></div>
      <div class="vote-breakdown"><span><b>${item.total}</b> hlasov</span><span>S ${item.votes.S || 0} · A ${item.votes.A || 0}</span></div>
    </article>`;
  }).join('');
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove('is-visible'), 3200);
}

async function loadResults() {
  try {
    const response = await fetch('/api/votes', { headers: { accept: 'application/json' } });
    if (!response.ok) return;
    const payload = await response.json();
    if (payload.results && Object.keys(payload.results).length) results = payload.results;
    renderCommunity();
  } catch { /* Local preview uses the seeded fallback data. */ }
}

els.search.addEventListener('input', render);
document.querySelectorAll('.tier-dropzone').forEach((zone) => {
  zone.addEventListener('dragover', (event) => { event.preventDefault(); zone.classList.add('is-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
  zone.addEventListener('drop', (event) => {
    event.preventDefault();
    zone.classList.remove('is-over');
    const filmId = event.dataTransfer.getData('text/plain');
    if (filmById[filmId]) moveFilm(filmId, zone.dataset.tier);
  });
  zone.addEventListener('click', () => {
    if (selectedFilmId) moveFilm(selectedFilmId, zone.dataset.tier);
  });
});

function resetBoard() {
  FILMS.forEach((film) => { rankings[film.id] = null; });
  selectedFilmId = null;
  render();
}

document.querySelector('#resetBoard').addEventListener('click', resetBoard);
document.querySelector('#resetTop').addEventListener('click', resetBoard);
document.querySelector('#submitButton').addEventListener('click', () => {
  if (FILMS.some((film) => !rankings[film.id])) {
    showToast('Najprv zaraď všetkých 12 filmov do tierov.');
    return;
  }
  els.dialogStatus.textContent = '';
  els.name.value = '';
  els.dialog.showModal();
  window.setTimeout(() => els.name.focus(), 50);
});

els.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = els.name.value.trim();
  if (!name) return;
  const submit = els.form.querySelector('.dialog-submit');
  submit.disabled = true;
  submit.textContent = 'Odosielam…';
  const payload = { name, rankings: { ...rankings } };
  try {
    const response = await fetch('/api/votes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error('offline');
    const data = await response.json();
    if (data.results) results = data.results;
    els.dialog.close();
    renderCommunity();
    showToast(`Ďakujeme, ${name}! Tvoj rebríček je v komunite.`);
    document.querySelector('#komunita').scrollIntoView({ behavior: 'smooth' });
  } catch {
    els.dialogStatus.textContent = 'Hlas sa nepodarilo odoslať. Skús to ešte raz.';
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Odoslať hodnotenie <span>↗</span>';
  }
});

document.querySelector('.dialog-close').addEventListener('click', () => els.dialog.close());
document.querySelector('#filmCount').textContent = FILMS.length;
render();
loadResults();

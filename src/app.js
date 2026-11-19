const CATEGORIES = [
  { id: 'animaky', label: 'Animáky', note: 'Rozprávky' },
  { id: 'americke', label: 'Americké', note: 'Hrané filmy' },
  { id: 'ceskoslovenske', label: 'Československé', note: 'Klasiky' },
  { id: 'ostatne', label: 'Ostatné', note: 'Vianočný mix' },
];

const FILMS = [
  { id: 'klaus', category: 'animaky', title: 'Klaus', year: 2019, image: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Klaus_%282019_film%29.png' },
  { id: 'grinch', category: 'animaky', title: 'Ako Grinch ukradol Vianoce', year: 2000, image: 'https://upload.wikimedia.org/wikipedia/en/1/19/How_the_Grinch_Stole_Christmas_film_poster.jpg' },
  { id: 'grinch-animated', category: 'animaky', title: 'Grinch', year: 2018, image: 'https://upload.wikimedia.org/wikipedia/en/5/5b/The_Grinch_poster.jpg' },
  { id: 'polar-express', category: 'animaky', title: 'Polárny expres', year: 2004, image: 'https://upload.wikimedia.org/wikipedia/en/2/28/The_Polar_Express_%28film%29_poster.jpg' },
  { id: 'christmas-carol', category: 'animaky', title: 'Vianočná koleda', year: 2009, image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Christmas_Carol_2009_poster.jpg' },
  { id: 'nightmare-before-christmas', category: 'animaky', title: 'Predvianočná nočná mora', year: 1993, image: 'https://upload.wikimedia.org/wikipedia/en/9/96/The_nightmare_before_christmas_poster.jpg' },
  { id: 'arthur-christmas', category: 'animaky', title: 'Arthur zachraňuje Vianoce', year: 2011, image: 'https://www.thecinemacollection.com/cdn/shop/products/arthurchristmasEM_1024x1024.jpg?v=1631207533' },
  { id: 'mickey-christmas-carol', category: 'animaky', title: 'Mickeyho vianočná koleda', year: 1983, image: 'https://cdn.yori.to/titles/tt0085936/poster.jpg' },
  { id: 'snowman', category: 'animaky', title: 'Snehuliak', year: 1982, image: 'https://www.cineadaffiches.com/cdn/shop/products/57_aaabd3dc-45b2-4ff2-b866-d5354bb82f4f_1200x1200.jpg?v=1604516403' },
  { id: 'home-alone', category: 'americke', title: 'Sám doma', year: 1990, image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Home_Alone_1990_film_poster.jpg' },
  { id: 'home-alone-2', category: 'americke', title: 'Sám doma 2: Stratený v New Yorku', year: 1992, image: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Home_Alone_2_1992_film_poster.jpg' },
  { id: 'elf', category: 'americke', title: 'Elf', year: 2003, image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Elf_2003_film_poster.jpg' },
  { id: 'christmas-vacation', category: 'americke', title: 'Bláznivé Vianoce', year: 1989, image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/National_Lampoon%27s_Christmas_Vacation_poster.jpg' },
  { id: 'die-hard', category: 'americke', title: 'Smrtonosná pasca', year: 1988, image: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg' },
  { id: 'santa-clause', category: 'americke', title: 'Santa Claus', year: 1994, image: 'https://www.impawards.com/1994/posters/santa_clause_ver4_xxlg.jpg' },
  { id: 'miracle-34th-street', category: 'americke', title: 'Zázrak na 34. ulici', year: 1994, image: 'https://static.cinemagia.ro/img/resize/db/movie/00/20/36/miracle-on-34th-street-525068l-600x0-w-0f736cfe.jpg' },
  { id: 'four-christmases', category: 'americke', title: 'Štyri Vianoce', year: 2008, image: 'https://pics.filmaffinity.com/four_christmases-133264031-large.jpg' },
  { id: 'christmas-chronicles', category: 'americke', title: 'Vianočné kroniky', year: 2018, image: 'https://baronessbooktrove.com/wp-content/uploads/2018/10/The-Christmas-Chronicles-Netflix-2018.jpg' },
  { id: 'three-wishes', category: 'ceskoslovenske', title: 'Tri oriešky pre Popolušku', year: 1973, image: 'https://www.rarefilmsandmore.com/Media/Thumbs/0016/0016569-three-wishes-for-cinderella-drei-haselnusse-fur-aschenbrodel-1973-with-switchable-english-subtitles-.jpg' },
  { id: 'with-you-world-fun', category: 'ceskoslovenske', title: 'S tebou ma baví svet', year: 1982, image: 'https://cdn.alza.cz/Foto/imggalery/Image/Article/stmbs%20text.jpg' },
  { id: 'cosy-dens', category: 'ceskoslovenske', title: 'Pelíšky', year: 1999, image: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/165/049/165049346_5a5d1f.jpg' },
  { id: 'perinbaba', category: 'ceskoslovenske', title: 'Perinbaba', year: 1985, image: 'https://www.moviemeter.nl/images/cover/34000/34438.jpg' },
  { id: 'salt-gold', category: 'ceskoslovenske', title: 'Soľ nad zlato', year: 1982, image: 'https://kidstownm.citylife.sk/sites/default/files/akcia/plagat/KIDSTOWN/201711/48eaca54f2e586eebae34c3f20d43078.jpg' },
  { id: 'golden-star', category: 'ceskoslovenske', title: 'Princezná so zlatou hviezdou', year: 1959, image: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/584/158584190_e58f90.jpg' },
  { id: 'proud-princess', category: 'ceskoslovenske', title: 'Pyšná princezná', year: 1952, image: 'https://i0.wp.com/easterneuropeanmovies.com/wp-content/uploads/327.jpg?fit=560%2C786&ssl=1' },
  { id: 'angel-lord', category: 'ceskoslovenske', title: 'Anjel Pána', year: 2005, image: 'https://img.ceskatelevize.cz/program/porady/1099641378/foto09/plakat.jpg' },
  { id: 'angel-lord-2', category: 'ceskoslovenske', title: 'Anjel Pána 2', year: 2016, image: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/161/138/161138522_74daba.jpg' },
  { id: 'love-actually', category: 'ostatne', title: 'Láska nebeská', year: 2003, image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Love_Actually_movie.jpg' },
  { id: 'the-holiday', category: 'ostatne', title: 'Prázdniny', year: 2006, image: 'https://upload.wikimedia.org/wikipedia/en/9/9c/The_Holiday_%282006_film%29.jpg' },
  { id: 'muppet-carol', category: 'ostatne', title: 'Vianočná koleda Muppetov', year: 1992, image: 'https://upload.wikimedia.org/wikipedia/en/8/8f/The_Muppet_Christmas_Carol_poster.jpg' },
  { id: 'family-stone', category: 'ostatne', title: 'The Family Stone', year: 2005, image: 'https://upload.wikimedia.org/wikipedia/en/7/7e/The_Family_Stone.jpg' },
  { id: 'gremlins', category: 'ostatne', title: 'Gremlins', year: 1984, image: 'https://www.mauvais-genres.com/32021-thickbox_default/gremlins-original-movie-poster-adv-27x41-in-1984-joe-dante-zach-galligan.jpg' },
  { id: 'last-christmas', category: 'ostatne', title: 'Posledné Vianoce', year: 2019, image: 'https://br.web.img2.acsta.net/pictures/19/09/11/15/31/3986826.jpg' },
  { id: 'holdovers', category: 'ostatne', title: 'Zimné prázdniny', year: 2023, image: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU%40._V1_FMjpg_UX1000_.jpg' },
  { id: 'boy-called-christmas', category: 'ostatne', title: 'Chlapec menom Vianoce', year: 2021, image: 'https://cdn1.naekranie.pl/media/cache/amp/2021/11/Ch%C5%82opiec%20zwany%20Gwiazdk%C4%85_619e31dbd3faa.jpeg' },
  { id: 'man-who-invented-christmas', category: 'ostatne', title: 'Muž, ktorý vynašiel Vianoce', year: 2017, image: 'https://m.media-amazon.com/images/M/MV5BMTYwMjk1MTUzM15BMl5BanBnXkFtZTgwNDM2ODgwNDI%40._V1_.jpg' },
];

const WEIGHTS = { S: 5, A: 4, B: 3, C: 2, D: 1 };
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=500&q=80';
const filmById = Object.fromEntries(FILMS.map((film) => [film.id, film]));
const rankingsByCategory = Object.fromEntries(CATEGORIES.map((category) => [category.id, {}]));

let activeCategoryId = CATEGORIES[0].id;
let selectedFilmId = null;
let results = {};

const els = {
  tabs: document.querySelector('#categoryTabs'),
  preview: document.querySelector('#previewGrid'),
  library: document.querySelector('#filmLibrary'),
  emptyLibrary: document.querySelector('#emptyLibrary'),
  search: document.querySelector('#searchInput'),
  hint: document.querySelector('#selectionHint'),
  title: document.querySelector('#activeCategoryTitle'),
  dialog: document.querySelector('#nameDialog'),
  form: document.querySelector('#nameForm'),
  name: document.querySelector('#nameInput'),
  dialogStatus: document.querySelector('#dialogStatus'),
  toast: document.querySelector('#toast'),
  voteTotal: document.querySelector('#voteTotal'),
};

function filmsInCategory(categoryId) { return FILMS.filter((film) => film.category === categoryId); }
function rankings() { return rankingsByCategory[activeCategoryId]; }
function categoryLabel(categoryId) { return CATEGORIES.find((category) => category.id === categoryId)?.label || categoryId; }

function renderTabs() {
  els.tabs.innerHTML = CATEGORIES.map((category) => `<button class="category-tab ${category.id === activeCategoryId ? 'is-active' : ''}" type="button" data-category="${category.id}"><strong>${category.label}</strong><small>${category.note}</small></button>`).join('');
  els.tabs.querySelectorAll('.category-tab').forEach((tab) => tab.addEventListener('click', () => switchCategory(tab.dataset.category)));
}

function createFilmCard(film) {
  const card = document.createElement('button');
  card.className = 'film-card';
  card.type = 'button';
  card.draggable = true;
  card.dataset.filmId = film.id;
  card.setAttribute('aria-label', `${film.title}, ${film.year}`);
  card.innerHTML = `<img loading="lazy" src="${film.image}" alt="${film.title} — náhľad" /><span class="card-meta"><strong>${film.title}</strong><small>${film.year}</small></span>`;
  card.querySelector('img').addEventListener('error', (event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGE; });
  card.addEventListener('dragstart', (event) => { event.dataTransfer.setData('text/plain', film.id); card.classList.add('is-selected'); });
  card.addEventListener('dragend', () => card.classList.remove('is-selected'));
  card.addEventListener('click', () => {
    if (rankings()[film.id]) rankings()[film.id] = null;
    else selectedFilmId = selectedFilmId === film.id ? null : film.id;
    renderBoard();
  });
  return card;
}

function moveFilm(filmId, tier) {
  if (!filmById[filmId] || filmById[filmId].category !== activeCategoryId) return;
  rankings()[filmId] = tier;
  selectedFilmId = null;
  renderBoard();
}

function renderBoard() {
  const categoryFilms = filmsInCategory(activeCategoryId);
  const query = els.search.value.trim().toLowerCase();
  els.title.textContent = categoryLabel(activeCategoryId);
  els.library.innerHTML = '';
  const unranked = categoryFilms.filter((film) => !rankings()[film.id] && film.title.toLowerCase().includes(query));
  els.emptyLibrary.hidden = unranked.length > 0;
  unranked.forEach((film) => els.library.appendChild(createFilmCard(film)));

  document.querySelectorAll('.tier-dropzone').forEach((zone) => {
    zone.innerHTML = '';
    categoryFilms.filter((film) => rankings()[film.id] === zone.dataset.tier).forEach((film) => zone.appendChild(createFilmCard(film)));
  });

  document.querySelectorAll('.film-card').forEach((card) => card.classList.toggle('is-selected', card.dataset.filmId === selectedFilmId));
  const remaining = categoryFilms.filter((film) => !rankings()[film.id]).length;
  els.hint.textContent = selectedFilmId ? 'Vyber S, A, B, C alebo D' : remaining ? `${remaining} filmov čaká` : 'Všetko zoradené';
  els.hint.classList.toggle('is-active', Boolean(selectedFilmId));
}

function aggregateForFilm(filmId) {
  const votes = results[filmId] || {};
  const total = Object.values(votes).reduce((sum, value) => sum + Number(value || 0), 0);
  const points = Object.entries(votes).reduce((sum, [tier, count]) => sum + (WEIGHTS[tier] || 0) * Number(count || 0), 0);
  return { votes, total, score: total ? points / total : null };
}

function previewFilms(categoryId) {
  return filmsInCategory(categoryId).map((film, index) => ({ film, ...aggregateForFilm(film.id), index })).sort((a, b) => {
    if (a.score === null && b.score === null) return a.index - b.index;
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score || b.total - a.total || a.index - b.index;
  }).slice(0, 3);
}

function renderPreview() {
  const allVotes = Object.values(results).reduce((sum, votes) => sum + Object.values(votes).reduce((inner, value) => inner + Number(value || 0), 0), 0);
  els.voteTotal.textContent = `${allVotes} hlasov`;
  els.preview.innerHTML = CATEGORIES.map((category) => `<article class="preview-card">
    <div class="preview-card-head"><div><span class="section-label">${category.note}</span><h3>${category.label}</h3></div><button class="jump-button" type="button" data-jump="${category.id}">Zoraď</button></div>
    <div class="top-three">${previewFilms(category.id).map((item, index) => `<button class="top-three-row" type="button" data-jump="${category.id}"><span class="place">${index + 1}</span><img src="${item.film.image}" alt="${item.film.title} — náhľad" /><span class="top-three-title"><strong>${item.film.title}</strong><small>${item.film.year}</small></span><span class="top-three-score">${item.score === null ? '—' : item.score.toFixed(1)}</span></button>`).join('')}</div>
  </article>`).join('');
  els.preview.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => { switchCategory(button.dataset.jump); document.querySelector('#zoraď').scrollIntoView({ behavior: 'smooth' }); }));
  els.preview.querySelectorAll('img').forEach((image) => image.addEventListener('error', (event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGE; }));
}

function switchCategory(categoryId) {
  if (!rankingsByCategory[categoryId]) return;
  activeCategoryId = categoryId;
  selectedFilmId = null;
  els.search.value = '';
  renderTabs();
  renderBoard();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove('is-visible'), 3000);
}

async function loadResults() {
  try {
    const response = await fetch('/api/votes', { headers: { accept: 'application/json' } });
    if (!response.ok) return;
    const payload = await response.json();
    results = payload.results || {};
    renderPreview();
  } catch { /* Preview can still be used without the API. */ }
}

els.search.addEventListener('input', renderBoard);
document.querySelectorAll('.tier-dropzone').forEach((zone) => {
  zone.addEventListener('dragover', (event) => { event.preventDefault(); zone.classList.add('is-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
  zone.addEventListener('drop', (event) => { event.preventDefault(); zone.classList.remove('is-over'); moveFilm(event.dataTransfer.getData('text/plain'), zone.dataset.tier); });
  zone.addEventListener('click', () => { if (selectedFilmId) moveFilm(selectedFilmId, zone.dataset.tier); });
});

document.querySelector('#resetBoard').addEventListener('click', () => { rankingsByCategory[activeCategoryId] = {}; selectedFilmId = null; renderBoard(); });
document.querySelector('#submitButton').addEventListener('click', () => {
  if (filmsInCategory(activeCategoryId).some((film) => !rankings()[film.id])) { showToast('Najprv zaraď všetky filmy v kategórii.'); return; }
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
  try {
    const response = await fetch('/api/votes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, categoryId: activeCategoryId, rankings: rankings() }) });
    if (!response.ok) throw new Error('offline');
    const data = await response.json();
    results = data.results || results;
    els.dialog.close();
    renderPreview();
    showToast(`Hlas uložený: ${categoryLabel(activeCategoryId)}`);
  } catch {
    els.dialogStatus.textContent = 'Nepodarilo sa uložiť. Skús znova.';
  } finally {
    submit.disabled = false;
    submit.textContent = 'Odoslať';
  }
});

document.querySelector('.dialog-close').addEventListener('click', () => els.dialog.close());
renderTabs();
renderBoard();
renderPreview();
loadResults();

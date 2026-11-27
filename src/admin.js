const labels = {
  animaky: 'Animáky', ceskoslovenske: 'Československé', americke: 'Americké',
  europske: 'Britské & európske', kultove: 'Kultové & netradičné', nova: 'Nová kategória',
};
const ids = ['animaky', 'ceskoslovenske', 'americke', 'europske', 'kultove'];
const loginView = document.querySelector('#loginView');
const dashboardView = document.querySelector('#dashboardView');
const loginForm = document.querySelector('#loginForm');
const loginStatus = document.querySelector('#loginStatus');
const pageStatus = document.querySelector('#pageStatus');
const logoutButton = document.querySelector('#logoutButton');

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function showLogin(message = '') {
  loginView.hidden = false;
  dashboardView.hidden = true;
  logoutButton.hidden = true;
  loginStatus.textContent = message;
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  logoutButton.hidden = false;
  loginStatus.textContent = '';
}

function dateLabel(value) {
  if (!value) return '';
  const date = new Date(value.replace(' ', 'T') + 'Z');
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('sk-SK', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

async function requestJson(path, options = {}) {
  const response = await fetch(path, { credentials: 'same-origin', cache: 'no-store', ...options });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'Údaje sa nepodarilo načítať.');
    error.status = response.status;
    throw error;
  }
  return data;
}

function renderStats(data) {
  const cards = [
    ['Uložené tierlisty', data.submissions, 'Spolu vo všetkých kategóriách'],
    ['Hodnotené tituly', `${data.rankedFilms}/${data.totalFilms}`, 'Aspoň jeden hlas'],
    ['Nové návrhy', data.newSuggestions, `${data.suggestionCount} návrhov celkom`],
    ['Kategórie', ids.filter((id) => data.categoryCounts[id] > 0).length + '/5', 'S aspoň jedným tierlistom'],
  ];
  const container = document.querySelector('#statCards');
  container.replaceChildren(...cards.map(([label, value, note]) => {
    const card = element('article', 'stat-card');
    card.append(element('span', '', label), element('strong', '', String(value)), element('small', '', note));
    return card;
  }));
}

function renderCategories(data) {
  const max = Math.max(1, ...ids.map((id) => Number(data.categoryCounts[id] || 0)));
  const container = document.querySelector('#categoryStats');
  container.replaceChildren(...ids.map((id) => {
    const count = Number(data.categoryCounts[id] || 0);
    const row = element('div', 'category-row');
    const main = element('div', 'category-row-main');
    main.append(element('span', '', labels[id]), element('strong', '', String(count)));
    const bar = element('div', 'category-bar');
    const fill = element('span');
    fill.style.width = `${count / max * 100}%`;
    bar.append(fill);
    row.append(main, bar);
    return row;
  }));
}

function renderRecent(data) {
  const container = document.querySelector('#recentVotes');
  if (!data.recent.length) {
    container.replaceChildren(element('p', 'empty-state', 'Zatiaľ tu nie sú žiadne hlasy.'));
    return;
  }
  container.replaceChildren(...data.recent.map((vote) => {
    const row = element('div', 'recent-row');
    const detail = element('div');
    detail.append(element('strong', '', vote.displayName), element('small', '', `${labels[vote.categoryId] || vote.categoryId} · ${vote.titles} titulov`));
    row.append(detail, element('time', '', dateLabel(vote.createdAt)));
    return row;
  }));
}

function renderSuggestions(data) {
  document.querySelector('#suggestionHeading').textContent = `${data.newSuggestions} nových`;
  const container = document.querySelector('#suggestionList');
  if (!data.suggestions.length) {
    container.replaceChildren(element('p', 'empty-state', 'Zatiaľ nikto nič nenavrhol.'));
    return;
  }
  container.replaceChildren(...data.suggestions.map((suggestion) => {
    const reviewed = suggestion.status === 'reviewed';
    const row = element('div', `suggestion-row${reviewed ? ' is-reviewed' : ''}`);
    const detail = element('div');
    detail.append(element('strong', '', suggestion.title || `Nová kategória: ${suggestion.new_category}`));
    const category = suggestion.category_id === 'nova' ? `Nová kategória: ${suggestion.new_category}` : labels[suggestion.category_id] || suggestion.category_id;
    detail.append(element('small', '', `${category} · ${dateLabel(suggestion.created_at)}`));
    const button = element('button', 'suggestion-action', reviewed ? 'Vrátiť' : 'Vybavené');
    button.type = 'button';
    button.addEventListener('click', async () => {
      button.disabled = true;
      try {
        await requestJson('/api/admin/suggestions', {
          method: 'PATCH', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ id: suggestion.id, status: reviewed ? 'new' : 'reviewed' }),
        });
        await loadOverview();
      } catch (error) {
        pageStatus.textContent = error.message;
        button.disabled = false;
      }
    });
    row.append(detail, button);
    return row;
  }));
}

async function loadOverview() {
  pageStatus.textContent = '';
  try {
    const data = await requestJson('/api/admin/overview');
    renderStats(data);
    renderCategories(data);
    renderRecent(data);
    renderSuggestions(data);
    showDashboard();
  } catch (error) {
    if (error.status === 401 || error.status === 503) showLogin(error.message);
    else pageStatus.textContent = error.message;
  }
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = loginForm.querySelector('button');
  button.disabled = true;
  loginStatus.textContent = '';
  try {
    await requestJson('/api/admin/session', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: document.querySelector('#passwordInput').value }),
    });
    loginForm.reset();
    await loadOverview();
  } catch (error) {
    loginStatus.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

logoutButton.addEventListener('click', async () => {
  try { await requestJson('/api/admin/session', { method: 'DELETE' }); }
  catch (error) { pageStatus.textContent = error.message; return; }
  showLogin();
});

document.querySelector('#refreshButton').addEventListener('click', loadOverview);

requestJson('/api/admin/session').then((session) => {
  if (session.authenticated) loadOverview();
  else showLogin();
}).catch((error) => showLogin(error.message));


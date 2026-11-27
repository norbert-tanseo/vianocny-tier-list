const form = document.querySelector('#suggestionForm');
const category = document.querySelector('#suggestionCategory');
const newCategoryField = document.querySelector('#suggestionNewCategoryField');
const newCategory = document.querySelector('#suggestionNewCategory');
const title = document.querySelector('#suggestionTitle');
const titleLabel = document.querySelector('#suggestionTitleLabel');
const status = document.querySelector('#suggestionStatus');

category.addEventListener('change', () => {
  const isNew = category.value === 'nova';
  newCategoryField.hidden = !isNew;
  newCategory.required = isNew;
  title.required = !isNew;
  titleLabel.textContent = isNew ? 'Názov filmu alebo rozprávky (nepovinné)' : 'Názov filmu alebo rozprávky';
  if (!isNew) newCategory.value = '';
  status.textContent = '';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = 'Odosielam…';
  try {
    const response = await fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        categoryId: category.value,
        newCategory: newCategory.value.trim(),
        title: title.value.trim(),
        website: form.elements.website.value,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Návrh sa nepodarilo odoslať.');
    form.reset();
    newCategoryField.hidden = true;
    newCategory.required = false;
    title.required = true;
    titleLabel.textContent = 'Názov filmu alebo rozprávky';
    status.textContent = 'Ďakujeme! Návrh máme uložený.';
  } catch (error) {
    status.textContent = error.message || 'Návrh sa nepodarilo odoslať. Skús to znova.';
  } finally {
    button.disabled = false;
  }
});


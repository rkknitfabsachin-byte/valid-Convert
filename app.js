/* ========== CONFIG ========== */
const API_URL = 'https://script.google.com/macros/s/AKfycbwijIoixvyjj6GxZcq91ZlidiXzHa7dmhoU1kgB86L2zdibhvF9WSmzVAD6r34qU0Ej/exec';

let currentTab = 'Visitor';
let data = [];

/* ========== THEME TOGGLE ========== */
const toggle = document.getElementById('themeToggle');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

/* ========== TAB SWITCH ========== */
document.querySelectorAll('.nav-item').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    render();
  };
});

/* ========== SEARCH ========== */
document.getElementById('search').oninput = render;

/* ========== REFRESH BUTTON ========== */
document.getElementById('refreshBtn').onclick = fetchData;

/* ========== FETCH DATA ========== */
function fetchData() {
  const btn = document.getElementById('refreshBtn');
  btn.textContent = '…';

  fetch(`${API_URL}?action=getData`)
    .then(res => res.json())
    .then(json => {
      data = json;
      render();
      btn.textContent = '⟳ Refresh';
    })
    .catch(err => {
      console.error(err);
      alert('Failed to load data');
      btn.textContent = '⟳ Refresh';
    });
}

/* ========== RENDER ========== */
function render() {
  const q = document.getElementById('search').value.toLowerCase();
  const container = document.getElementById('cards');
  container.innerHTML = '';

  data
    .filter(d => d.source === currentTab)
    .filter(d => !d.CONVERT)
    .filter(d =>
      (d.name + d.phone + d.company).toLowerCase().includes(q)
    )
    .forEach(d => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>${d.name || ''}</h3>
        <p>📞 ${d.phone || ''}</p>
        <p>🏢 ${d.company || ''}</p>
        <p>🎯 ${d.purpose || ''}</p>
        <p>📍 ${d.location || ''}</p>

        <div class="actions">
          <button class="valid-btn">✓ VALID</button>
          <button class="convert-btn">★ CONVERT</button>
        </div>
      `;

      /* VALID */
      card.querySelector('.valid-btn').onclick = () => {
        updateStatus(d.id, { VALID: 'Valid' });
      };

      /* CONVERT */
      card.querySelector('.convert-btn').onclick = () => {
        card.classList.add('fade-out');
        updateStatus(d.id, { CONVERT: 'Convert' });
        setTimeout(() => card.remove(), 250);
      };

      container.appendChild(card);
    });
}

/* ========== UPDATE STATUS ========== */
function updateStatus(id, payload) {
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ id, ...payload })
  }).catch(err => {
    console.error(err);
    alert('Update failed');
  });
}

/* ========== INITIAL LOAD ========== */
fetchData();

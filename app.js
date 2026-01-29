let currentTab = 'Visitor';
let data = [];

/* --------- THEME TOGGLE --------- */
const toggle = document.getElementById('themeToggle');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

/* --------- TAB SWITCH --------- */
document.querySelectorAll('.nav-item').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    render();
  };
});

/* --------- SEARCH --------- */
document.getElementById('search').oninput = render;

/* --------- RENDER --------- */
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

      card.querySelector('.convert-btn').onclick = () => {
        card.classList.add('fade-out');
        setTimeout(() => card.remove(), 300);
        // later → API call
      };

      container.appendChild(card);
    });
}

/* --------- TEMP DEMO DATA --------- */
data = [
  { source:'Visitor', name:'Amit', phone:'99999', company:'RK Knit Fab', purpose:'Meeting', location:'Surat', VALID:'', CONVERT:'' },
  { source:'Enquiry', name:'Rahul', phone:'88888', company:'XYZ', purpose:'Order', location:'Mumbai', VALID:'', CONVERT:'' }
];

render();

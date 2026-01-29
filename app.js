const API = 'https://script.google.com/macros/s/AKfycbwijIoixvyjj6GxZcq91ZlidiXzHa7dmhoU1kgB86L2zdibhvF9WSmzVAD6r34qU0Ej/exec';

fetch(`${API}?action=getData`)
  .then(r => r.json())
  .then(render);

function render(rows) {
  const body = document.querySelector('#data tbody');
  body.innerHTML = '';

  rows.forEach(r => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${r.name || ''}</td>
      <td>${r.phone || ''}</td>
      <td>${r.source}</td>
      <td>${r.purpose || ''}</td>
      <td><button class="valid" onclick="update('${r.id}','Valid','')">Valid</button></td>
      <td><button class="convert" onclick="update('${r.id}','','Convert')">Convert</button></td>
    `;

    body.appendChild(tr);
  });
}

function update(id, VALID, CONVERT) {
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({ id, VALID, CONVERT })
  }).then(() => location.reload());
}

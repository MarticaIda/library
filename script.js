const myLibrary = [];

const body = document.querySelector('body');
const form = document.querySelector('form');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const openBtn = document.querySelector('.openBtn');
const closeForm = document.querySelector('.close');
const modal = document.querySelector('.modal');
const deleteBtn = document.createElement('button');

deleteBtn.setAttribute('class', 'btn');
deleteBtn.textContent = 'Delete';

openBtn.addEventListener('click', function () {
  modal.style.display = 'block';
});

window.addEventListener('click', function (event) {
  if (event.target === body) {
    modal.style.display = 'none';
  }
});

function Book (author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = new Book(
    document.getElementById('author').value,
    document.getElementById('title').value,
    document.getElementById('pages').value,
    document.querySelector('input[name="read"]:checked').value
  );
  myLibrary.push(book);
  generateTable();
});

const generateTable = function () {
  let temp;
  table.style.display = 'block';
  const rowCount = table.rows.length;
  for (let x = rowCount - 1; x > 0; x--) {
    table.deleteRow(x);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const row = tbody.insertRow(-1);
    const data = Object.values(myLibrary[i]);
    data.forEach((value) => (row.insertCell().textContent = value));
    const dCell = row.insertCell(-1);
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox'); // create checkbox to delete a book
    dCell.appendChild(input);
    temp = myLibrary[i].read;

    const rCell = document.querySelectorAll('tr td:nth-child(4)');
    const select = document.createElement('select');
    select.id = 'select';
    const options = ['yes', 'no'];
    for (let z = 0; z < options.length; z++) {
      const option = document.createElement('option');
      option.value = options[z];
      option.text = options[z];
      select.appendChild(option);
      if (option.value === temp) {
        option.selected = true;
        for (let y = 0; y < rCell.length; y++) {
          rCell[y].appendChild(select);
        }
      }
    }
  }
  form.reset();
  modal.style.display = 'none';
  body.appendChild(deleteBtn);
};

closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});

deleteBtn.addEventListener('click', function () {});

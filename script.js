const myLibrary = [];

const form = document.querySelector('form');
const table = document.querySelector('table');
const body = document.querySelector('body');
let readValue;
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

function Book (author, title, pages, readValue) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = readValue;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  readValue = document.querySelector('input[name="read"]:checked').value;

  const book = new Book(
    document.getElementById('author').value,
    document.getElementById('title').value,
    document.getElementById('pages').value,
    readValue
  );
  myLibrary.push(book);
  displayMyLibrary();
});

function displayMyLibrary () {
  table.style.display = 'block';
  const rowCount = table.rows.length;
  for (let x = rowCount - 1; x > 0; x--) {
    table.deleteRow(x);
  }
  function generateTable () {
    myLibrary.forEach((book) => {
      const row = table.insertRow(-1);
      const data = Object.values(book);
      data.forEach((value) => (row.insertCell().textContent = value));
      const deleteBook = row.insertCell(4);
      deleteBook.innerHTML = 'Delete';
    });
  }

  generateTable(table, myLibrary);

  form.reset();

  modal.style.display = 'none';

  body.appendChild(deleteBtn);
}

closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});

deleteBtn.addEventListener('click', function () {});

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
  table.style.display = 'block';
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const row = tbody.insertRow(-1);
    const data = Object.values(myLibrary[i]).slice(0, 3);
    data.forEach((value) => (row.insertCell().textContent = value));
    const rValue = myLibrary[i].read;
    const rCell = row.insertCell(-1);
    const select = document.createElement('select');
    select.id = 'select';
    const options = ['yes', 'no'];
    for (let i = 0; i < options.length; i++) {
      const option = document.createElement('option');
      option.value = options[i];
      option.text = options[i];
      select.appendChild(option);
      if (option.value === rValue) {
        option.selected = true;
      }
    }
    rCell.appendChild(select);
    select.addEventListener('change', () => {
      myLibrary[i].read = select.value;
    });
    const dCell = row.insertCell(-1);
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    dCell.appendChild(input);
    input.addEventListener('click', () => {
      myLibrary[i].delete = true;
    }); // pass delete value to book object
  }
  form.reset();
  modal.style.display = 'none';
  body.appendChild(deleteBtn);
};
closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});

deleteBtn.addEventListener('click', function () {
  for (let i = myLibrary.length - 1; i >= 0; --i) {
    if (myLibrary[i].delete === true) {
      myLibrary.splice(i, 1);
    }
  }
  console.log(myLibrary);
});

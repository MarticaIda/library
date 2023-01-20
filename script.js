const myLibrary = [
  // {'Author', 'Title', 'Pages', 'Read', 'Delete?'}
];

const readFormInput = document.querySelectorAll('#read');
const form = document.querySelector('form');
const table = document.querySelector('table');
const body = document.querySelector('body');
let data;
let readBook;
let removeBook;
const openBtn = document.querySelector('.openBtn');
const closeForm = document.querySelector('.close');
const modal = document.querySelector('.modal');
const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('class', 'btn');
deleteBtn.textContent = 'Delete';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form); // collect user input into object
  const book = Object.fromEntries(formData); // create new object for every user input
  myLibrary.push(book); // add new book to the library array
  data = Object.keys(myLibrary[0]);
  table.textContent = ''; // clear the table
  addToMyLibrary();
}); // retrive user input from the form

const addToMyLibrary = () => {
  let read; // initiate read status
  for (const status of readFormInput) {
    if (status.checked) {
      read = status.value;
      break;
    }
  }

  function generateTableHead (table, data) {
    const thead = table.createTHead();
    table.border = '1';
    const row = thead.insertRow();
    for (const key of data) {
      const th = document.createElement('th'); // make header cells
      const text = document.createTextNode(key); // populate cells with object keys as headers
      th.appendChild(text);
      row.appendChild(th);
    }
    const deleteHdCell = document.createElement('th'); // create a header cell for Delete column
    row.appendChild(deleteHdCell);
    deleteHdCell.textContent = 'Delete?';
  } // make DOM table headers

  function generateTable (table, data) {
    for (const element of data) {
      const row = table.insertRow();
      for (const key in element) {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } // create and populate user input cells
      const deletedCell = row.insertCell(-1);
      const deleteBook = document.createElement('input');
      deleteBook.setAttribute('type', 'checkbox'); // create checkbox to delete a book
      deletedCell.appendChild(deleteBook);
    }
  } // make DOM table

  generateTable(table, myLibrary);
  generateTableHead(table, data);

  readBook = document.querySelectorAll('tr td:nth-child(4)'); // select all cells with read status
  removeBook = document.querySelectorAll('tr td:nth-child(5)'); // select all cells with delete checkbox

  document.querySelector('form').reset(); // wipe out the form

  modal.style.display = 'none'; // close the form

  body.appendChild(deleteBtn);
}; // receive input and add the new book entry to the library

openBtn.addEventListener('click', function () {
  modal.style.display = 'block';
}); // bring up the form for the new book
closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}); // close the form by clicking anywhere on the modal

deleteBtn.addEventListener('click', function () {
  // select all elements with checked status in delete cell
  // remove them from array myLibrary
});

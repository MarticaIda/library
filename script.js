const myLibrary = [
  {
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
    pages: 234,
    userRead: 'read'
  },
  {
    author: 'Jane Austen',
    title: 'Sense and Sensibility',
    pages: 254,
    userRead: 'read'
  },
  {
    author: 'Jane Austen',
    title: 'Mansfield Park',
    pages: 300,
    userRead: 'read'
  }
];

const readStatus = document.querySelectorAll('#read');
const form = document.querySelector('form');
const table = document.querySelector('table');
const data = Object.keys(myLibrary[0]);

// retrive user input from the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // collect user input into object
  const formData = new FormData(form);
  console.log(formData);
  // create new object for every user input
  const book = Object.fromEntries(formData);
  // add new book to the library array
  myLibrary.push(book);
  // clear the table
  table.textContent = '';
  addToMyLibrary();
});

// receive input and add the new book entry to the library
const addToMyLibrary = () => {
  // initiate read status
  let userRead;
  for (const status of readStatus) {
    if (status.checked) {
      userRead = status.value;
      break;
    }
  }

  // make DOM table headers
  function generateTableHead (table, data) {
    const thead = table.createTHead();
    const row = thead.insertRow();
    for (const key of data) {
      // make cells
      const th = document.createElement('th');
      // populate cells with object keys as headers
      const text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  generateTableHead(table, data);

  // make DOM table
  function generateTable (table, data) {
    for (const element of data) {
      const row = table.insertRow();
      // create and populate user input cells
      for (const key in element) {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  generateTable(table, myLibrary);

  // wipe out the form
  document.querySelector('form').reset();
  // close the form
  modal.style.display = 'none';
};

// bring up the form for the new book
const openBtn = document.querySelector('.openBtn');
const closeForm = document.querySelector('.close');
const modal = document.querySelector('.modal');
openBtn.addEventListener('click', function () {
  modal.style.display = 'block';
});
closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});
// close the form by clicking anywhere on the modal
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

const myLibrary = [];
const body = document.querySelector('body');
const form = document.querySelector('form');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const openBtn = document.getElementById('btnOpen');
const closeForm = document.getElementById('close');
const modal = document.querySelector('.modal');
const btnContainer = document.getElementById('btnContainer');
const sorterTitle = document.getElementById('hTitle');
const sorterAuthor = document.getElementById('hAuthor');
const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('id', 'btnDelete');
deleteBtn.textContent = 'Delete books';

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
    document.getElementById('author').value.toLowerCase().replace(/(^.|\s+.)/g, m => m.toUpperCase()),
    document.getElementById('title').value.toLowerCase().replace(/(^.|\s+.)/g, m => m.toUpperCase()),
    document.getElementById('pages').value,
    document.querySelector('input[name="read"]:checked').value
  );
  myLibrary.push(book);
  generateTable();
});

const generateTable = function () {
  let n = 0;
  table.style.display = 'block';
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  let cCell;
  for (let i = 0; i < myLibrary.length; i++) {
    const row = tbody.insertRow(-1);
    const data = Object.values(myLibrary[i]).slice(0, 3);
    data.forEach((value) => (row.insertCell().textContent = value));
    cCell = row.insertCell(0);
    cCell.textContent = n += 1;
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
  btnContainer.appendChild(deleteBtn);
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
  generateTable();
});

let orderA = true;
let orderT = true;

sorterTitle.addEventListener('click', () => {
  if (orderT) sortByTitleAcc();
  else sortByTitleDec();
});
sorterAuthor.addEventListener('click', () => {
  if (orderA) sortByAuthorAcc();
  else sortByAuthorDec();
});

function sortByAuthorAcc () {
  myLibrary.sort(function (book1, book2) {
    const a = book1.author.toUpperCase();
    const b = book2.author.toUpperCase();
    if (a < b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  });
  orderA = false;
  generateTable();
}
function sortByAuthorDec () {
  myLibrary.sort(function (book1, book2) {
    const a = book1.author.toUpperCase();
    const b = book2.author.toUpperCase();
    if (a > b) {
      return -1;
    }
    if (b < a) {
      return 1;
    }
    return 0;
  });
  orderA = true;
  generateTable();
}

function sortByTitleAcc () {
  myLibrary.sort(function (book1, book2) {
    const a = book1.title.toUpperCase();
    const b = book2.title.toUpperCase();
    if (a < b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  });
  orderT = false;
  generateTable();
}

function sortByTitleDec () {
  myLibrary.sort(function (book1, book2) {
    const a = book1.title.toUpperCase();
    const b = book2.title.toUpperCase();
    if (a > b) {
      return -1;
    }
    if (b < a) {
      return 1;
    }
    return 0;
  });
  orderT = true;
  generateTable();
}

// to do:
// force author and title to first upper case
// Fun side projects: 2) add Date added property and 3) make sortable by Date added

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
const sorterDate = document.getElementById('hDate');
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

function Book (author, title, pages, read, date) {
  const dateAdded = new Date();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.date = (function () {
    const currentDate =
      dateAdded.getFullYear() +
      '-' +
      (dateAdded.getMonth() + 1) +
      '-' +
      dateAdded.getDate();
    const currentTime =
      dateAdded.getHours() +
      ':' +
      dateAdded.getMinutes() +
      ':' +
      dateAdded.getSeconds();
    date = currentDate + ' ' + currentTime;
    return date;
  })();
  // Object.defineProperty(this, 'date', {
  //   get function () {
  //     return date;
  //   }
  // });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = new Book(
    document
      .getElementById('author')
      .value.toLowerCase()
      .replace(/(^.|\s+.)/g, (m) => m.toUpperCase()),
    document
      .getElementById('title')
      .value.toLowerCase()
      .replace(/(^.|\s+.)/g, (m) => m.toUpperCase()),
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
  for (let i = 0; i < myLibrary.length; i++) {
    const row = tbody.insertRow(-1);
    const data = Object.values(myLibrary[i]).slice(0, 3);
    data.forEach((value) => (row.insertCell().textContent = value));
    // makes counter
    const cCell = row.insertCell(0);
    cCell.textContent = n += 1;
    // passes and changes read value
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
    // add dateAdded cell
    const dateCell = row.insertCell(-1);
    dateCell.textContent = myLibrary[i].date;
    // selects entries to delete
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
sorterDate.addEventListener('click', sortByDate);

function sortByAuthorAcc () {
  myLibrary.sort(function (book1, book2) {
    const a = book1.author;
    const b = book2.author;
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
    const a = book1.author;
    const b = book2.author;
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
    const a = book1.title;
    const b = book2.title;
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
    const a = book1.title;
    const b = book2.title;
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

function sortByDate () {
  myLibrary.sort(function (book1, book2) {
    const a = Date.parse(book1.date);
    const b = Date.parse(book2.date);
    return a - b;
  });
  generateTable();
}

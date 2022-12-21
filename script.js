const myLibrary = [];

// user input variable
const userAuthor = document.querySelector('#author');
const userTitle = document.querySelector('#title');
const userPages = document.querySelector('#pages');
const userRead = document.querySelector('#read');

// form fields
const author = document.querySelector('.author');
const title = document.querySelector('.title');
const pages = document.querySelector('.pages');
const read = document.querySelector('.read');

// create a new row in the grid
const grid = document.querySelector('.list');
function addGridRow () {
  const gridRow = document.createElement('li');
  grid.appendChild(gridRow);
  gridRow.setAttribute('class', 'grid');
}

// book object
class Book {
  constructor (author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = 'not yet';
  }
}

// bringing up the form for the new book
const openForm = document.querySelector('.open-form');
const closeForm = document.querySelector('.close');
const modal = document.querySelector('.modal');

openForm.addEventListener('click', function () {
  modal.style.display = 'block';
});

closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// submitting input and creating the new book object
const submit = document.querySelector('.submit');

// user input new book object
const addToMyLibrary = () => {
  const book = {
    author: userAuthor.value,
    title: userTitle.value,
    pages: userPages.value,
    read: userRead.value
  };
  myLibrary.push(book);
  console.log(myLibrary);
  addGridRow();
  function display () {
    author.textContent = book.author;
    title.textContent = book.title;
    pages.textContent = book.pages;
    read.textContent = book.read;
  }
  display();
};

submit.addEventListener('click', addToMyLibrary);

// adding user input book object to myLibrary

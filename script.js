const myLibrary = [];
// user input variables
const userAuthor = document.querySelector('#author');
const userTitle = document.querySelector('#title');
const userPages = document.querySelector('#pages');
const readStatus = document.querySelectorAll('#read');
// button submitting input and creating the new book object
const submit = document.querySelector('.submit');
// capture grid
const grid = document.querySelector('.list');
// create prototype Book object
function Book (author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}
// add the new book entry to the library
const addToMyLibrary = () => {
  let userRead;
  for (const status of readStatus) {
    if (status.checked) {
      userRead = status.value;
      break;
    }
  }
  // let book = new Book(author.value, title.value, pages.value, read.value);
  const book = new Book(
    userAuthor.value,
    userTitle.value,
    userPages.value,
    userRead
  );
  // add new book to the library array
  myLibrary.push(book);
  // display new book in the grid
  // for (let i = 0; i < myLibrary.length; i++) {

  //  Not using myLibrary array at this time

  // create new row in the library
  const gridRow = document.createElement('li');
  gridRow.setAttribute('class', 'grid');
  const infoAuthor = document.createElement('div');
  infoAuthor.setAttribute('class', 'author');
  infoAuthor.textContent = book.author;
  const infoTitle = document.createElement('div');
  infoTitle.setAttribute('class', 'title');
  infoTitle.textContent = book.title;
  const infoPages = document.createElement('div');
  infoPages.setAttribute('class', 'pages');
  infoPages.textContent = book.pages;
  const infoRead = document.createElement('div');
  infoRead.setAttribute('class', 'read');
  infoRead.textContent = book.read;
  gridRow.appendChild(infoAuthor);
  gridRow.appendChild(infoTitle);
  gridRow.appendChild(infoPages);
  gridRow.appendChild(infoRead);
  grid.appendChild(gridRow);
  // }
  // wipe out the form
  document.querySelector('form').reset();
  // close the form
  modal.style.display = 'none';
};
// capture submit button click
submit.addEventListener('click', addToMyLibrary);
// bring up the form for the new book
const openForm = document.querySelector('.open-form');
const closeForm = document.querySelector('.close');
const modal = document.querySelector('.modal');
openForm.addEventListener('click', function () {
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

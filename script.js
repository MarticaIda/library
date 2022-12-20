// const myLibrary = []

// function Book (author, title) {
//   this.author = author
//   this.title = title
//   this.pages = pages
//   this.read = 'not yet'
// }

// const book = new Book('userAuthor', 'userTitle', 'userPages', 'userRead')

// function AddBookToLibrary () {
//   myLibrary.push(book)
// }

// pop-up New Book form

// .add-book
const openForm = document.querySelector('.open-form')
const closeForm = document.querySelector('.close')
const modal = document.querySelector('.modal')

openForm.addEventListener('click', function () {
  modal.style.display = 'block'
})

closeForm.addEventListener('click', function () {
  modal.style.display = 'none'
})

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
})

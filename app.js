const form = document.getElementById('bookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const pagesInput = document.getElementById('pagesInput');
const haveYouRead = document.getElementById('haveYouRead');
const bookModal = document.getElementById('addBookModal');
const bookContainer = document.getElementById('bookContainer');
const addBookButton = document.getElementById('addBook');
let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = Date.now();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const book = new Book(titleInput.value, authorInput.value, pagesInput.value, haveYouRead.checked);
  myLibrary.push(book);
  console.log(myLibrary);
}

function deleteCard(id) {
  myLibrary = myLibrary.filter(book => book.id !== id);
  console.log(myLibrary);
}

function switchIsRead(id) {
  console.log('Marking as complete', id);
  const bookRef = myLibrary.find((book) => book.id === id);
  console.log(bookRef);
  bookRef.isRead = !bookRef.isRead;
  console.log(bookRef);
}

bookContainer.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  const readButton = document.getElementById(`read-${id}`);
  console.log(id);

  if (e.target.matches('.btn-danger')) {
      deleteCard(parseInt(id));
      const card = document.getElementById(`${id}`);
      card.parentNode.removeChild(card);
  }
  
  if(e.target.matches('.btn-warning')) {
    switchIsRead(parseInt(id));
    readButton.classList.remove('btn-warning');
    readButton.classList.add('btn-success');
    readButton.textContent = 'Read';
  } else if (e.target.matches('.btn-success')) {
    switchIsRead(parseInt(id));
    readButton.classList.remove('btn-success');
    readButton.classList.add('btn-warning');
    readButton.textContent = 'Not Read';
  }
})

addBookButton.addEventListener('click', () => {
  $('#addBookModal').modal('show');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  $('#addBookModal').modal('hide');
    const html = myLibrary.map(
      (book) => `
        <div id=${book.id} class="card" style="width: 20rem; text-align: center;">
          <div class="card-body" style="display: flex; flex-direction: column;">
            <p class="card-text">Title: "${book.title}"</p>
            <p class="card-text">Author: ${book.author}</p>
            <p class="card-text">Pages: ${book.pages}</p>
            <button id="read-${book.id}" style="margin-bottom: 10px;" type="button" value=${book.id} class="${book.isRead ? 'btn btn-success' : 'btn btn-warning'}">${book.isRead ? 'Read' : 'Not Read'}</button>
            <button type="button" class="btn btn-danger" value=${book.id}>Remove</button>
          </div>
        </div>
      `
    ).join('');
    bookContainer.innerHTML = html
});
//manage the modal
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button');
const overlay = document.querySelector('#overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click',() => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
});

closeModalButtons.forEach(button => {
    button.addEventListener('click',() => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
});

const openModal = (modal) => {
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
} 

const closeModal = (modal) => {
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
} 

//add a book


let addBook = document.querySelector('#addBook');
let myLibrary = [];


function Book(author, title, pages, read) {
    return {author, title, pages, read};
}

function addBooktoLibrary(book) {
    myLibrary.push(book);

}
function displayBooks() {
    let container = document.querySelector('.card-container');
    for (let i = container.childElementCount; i < myLibrary.length; i++) {
        
        
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = 1;

        let title = document.createElement('h3');
        title.textContent = myLibrary[i].title;
        let author = document.createElement('p');
        author.textContent = myLibrary[i].author;
        let pages = document.createElement('p');
        pages.textContent = myLibrary[i].pages;

        
        let read = document.createElement('p');
        console.log(myLibrary[i].read);
        if(myLibrary[i].read == true) {
            pages.textContent = 'Read';
            card.style.backgroundColor = '#ace1af';
        } else {
            pages.textContent = 'Not-Read';
            card.style.backgroundColor = '#e9967a';
        }

        let buttonDiv = document.createElement('div');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        buttonDiv.appendChild(deleteButton);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(buttonDiv);

        container.appendChild(card);

        deleteButton.addEventListener('click', () => {
            myLibrary.splice(card.dataset.index, 1);
            container.removeChild(card);
            let children = Array.from(container.childNodes);
            //updateing dataset.index property of carddiv to be equal to array index
            //so deleting cards can be handled propery
            for (let i = 0; i< children.length; i++) {
                children[i].dataset.index = i;
            }
        })
    }
}

addBook.addEventListener('click', () => {
    let author = document.querySelector('#author').value;
    let title = document.querySelector('#title').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    addBooktoLibrary(Book(author, title, pages, read));
    displayBooks();
})

displayBooks();







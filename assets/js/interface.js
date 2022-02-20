const articles = document.querySelectorAll('article');
const addBook = document.querySelector('.add-book');
const pageDetail = document.querySelector('.book-detail');
const homeTable = document.querySelector('.home table');
const btnUpdate = document.querySelector('.update-book');
const pageFormBook = document.querySelector('.form-book');
const titleForm = document.querySelector('.form-book .icon-book p');
const navbar = document.querySelector('nav ul');
const readingResult = document.querySelector('.reading-result');
const completeResult = document.querySelector('.complete-result');
const exploreResult = document.querySelector('.explore-result');

navbar.addEventListener('click', attr => {
    const childNode = attr.target.parentElement;
    const anchor = attr.target;

    if( childNode.nodeName == 'A' || anchor.nodeName == 'A') {
        const navElement = document.querySelectorAll('nav ul li a');
        navElement.forEach(element => {
            element.classList.remove('active');
        });
        childNode.classList.add('active');
        anchor.classList.add('active');

        const showTarget = document.querySelector('a.active').dataset.target;
        routePage(showTarget)
    }
});

addBook.addEventListener('click', () => {
    routePage();
    pageFormBook.classList.add('show');
    titleForm.innerText = 'Add New Book';
    openFormData((new Date()).getTime());
});

homeTable.addEventListener('click', element => {
    if(element.target.nodeName == 'A'){
        showDetailTarget(element);
    }
});

btnUpdate.addEventListener('click', () => {
    routePage();
    pageFormBook.classList.add('show');
    titleForm.innerText = 'Update Book';
    openFormData(btnUpdate.dataset.id);
})

readingResult.addEventListener('click', element => {
    showDetailTarget(element);
})

completeResult.addEventListener('click', element => {
    showDetailTarget(element);
})

exploreResult.addEventListener('click', element => {
    showDetailTarget(element);
})




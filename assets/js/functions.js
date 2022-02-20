const keyStorage = 'bookshelf';
let dataStorage = getStorage(keyStorage);
let dataStorageReading = getDataStatus(dataStorage, false);
let dataStorageComplete = getDataStatus(dataStorage, true);
const buttonMark = document.querySelector('.book-detail_info button');
const buttonUpdate = document.querySelector('a.update-book');
const buttonDelete = document.querySelector('a.delete-book');

function showDetailTarget(element){
    let elementTarget = element.target;

    if(element.target.parentElement.nodeName == 'A'){
        elementTarget = element.target.parentElement;
    }
    
    routePage();
    pageDetail.classList.add('show');
    getDetailBook(elementTarget.dataset.id);
}

function routePage(params = ''){
    articles.forEach(article => {
        article.classList.remove('show');
        if(article.classList.contains(params)){
            article.classList.add('show');
        }
    })
}

function getStorage(keyStorage){
    if(typeof (Storage) !== 'undefined'){
        if(localStorage.getItem(keyStorage) == null){
            return [];
        }

        const getData = localStorage.getItem(keyStorage);
        const result = JSON.parse(getData);

        return result; 
    } else {
        swal('Error', 'Your Browser is not Supported', 'error');
        return ;
    }
}

function getDataStatus(data, categori){
    let result = data.filter( item => item.isComplete == categori);
    return result;
}

function getDetailBook(filter){
    const resultDetail = dataStorage.filter( data => data.id == filter);
    const titleBook = document.querySelector('.book-detail .icon-book p');
    const bookDetailInfo = document.querySelector('.book-detail_info table');
    
    const status = (resultDetail[0].isComplete) ? 'Complete' : 'Is Reading';

    titleBook.innerHTML = resultDetail[0].title;

    bookDetailInfo.innerHTML = `
        <tr>
            <td>ID Book</td>
            <td>: <span>${resultDetail[0].id}</span></td>
        </tr>
        <tr>
            <td>Title</td>
            <td>: <span>${resultDetail[0].title}</span></td>
        </tr>
        <tr>
            <td>Author</td>
            <td>: <span>${resultDetail[0].author}</span></td>
        </tr>
        <tr>
            <td>Year</td>
            <td>: <span>${resultDetail[0].year}</span></td>
        </tr>
        <tr>
            <td>Status</td>
            <td>: <span>${status}</span></td>
        </tr>
    `;

    if(resultDetail[0].isComplete) {
        buttonMark.innerHTML = `
            <i class="fa-solid fa-arrows-rotate"></i>  Read Again
        `;
    } else {
        buttonMark.innerHTML = `
        <i class="fa-solid fa-check"></i>  Mark Complete
        `;
    }

    buttonMark.dataset.id = resultDetail[0].id;
    buttonUpdate.dataset.id = resultDetail[0].id;
    buttonDelete.dataset.id = resultDetail[0].id;
}

function getDataSearch(section, data){
    section.innerHTML = '';
    const nullData = section.parentElement.querySelector('.null-data');

    if(data.length == 0){
        nullData.innerHTML = `
            <img src="assets/img/nothing.svg">
            <p>Nothing Book Collection</p>
        `;
    } else {
        nullData.innerHTML = '';
    }

    data.forEach(item => {
        let status = (item.isComplete) ? 'Complete' : 'Is Reading';

        section.innerHTML += `
            <a href="#" class="card" data-id="${item.id}">
                <h3>${item.title}</h3>
                <p>Status : ${status}</p>
            </a>
        `;
    })
    const totalResult = section.parentElement.querySelector('.result span');

    totalResult.textContent = section.querySelectorAll('a').length;
}

// For Search book
function searchBook(element, action, data){
    element.addEventListener(action, () => {
        const queryInput = element.value.toLowerCase();
        const dataResult = data.filter(data => data.title.toLowerCase().includes(queryInput));
        const section = element.parentElement.parentElement.querySelector('section');
        
        getDataSearch(section, dataResult);
    });
}

function openFormData(bookId){
    const idBook = document.querySelector('#id');
    const title = document.querySelector('#title');
    const author = document.querySelector('#auth');
    const year = document.querySelector('#year');
    const isComplete = document.querySelector('#status');

    idBook.value = bookId;
    title.value = '';
    author.value = '';
    year.value = '';
    isComplete.value = false;

    dataStorage.forEach((data) => {
        if(parseInt(data.id) == parseInt(bookId)){
            idBook.value = bookId;
            title.value = data.title;
            author.value = data.author;
            year.value = data.year;
            isComplete.value = data.isComplete;
        }
    });
}

function updateStorage(data){
    const saveData = JSON.stringify(data);
    localStorage.setItem(keyStorage, saveData);
    
    location.reload();
}

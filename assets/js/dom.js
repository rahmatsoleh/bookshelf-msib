const viewResultCollection = document.querySelector('.hero-master p:nth-child(2)');
const viewResultDetailRead = document.querySelector('.detail-read > p');
const viewResultDetailComplete = document.querySelector('.detail-complete > p');
const dataHomeTable = homeTable.querySelector('tbody');
const nullDataHome = document.querySelector('.home .null-data');
const inputSearchExplore = document.querySelector('.explore input');
const buttonSearchExplore = document.querySelector('.explore button');
const inputSearchReading = document.querySelector('.reading input');
const buttonSearchReading = document.querySelector('.reading button');
const inputSearchComplete = document.querySelector('.complete input');
const buttonSearchComplete = document.querySelector('.complete button');
const clearForm = pageFormBook.querySelector('#reset');
const submitFormBook = pageFormBook.querySelector('#submit');

viewResultCollection.innerText = dataStorage.length;
viewResultDetailComplete.innerText = dataStorageComplete.length;
viewResultDetailRead.innerText = dataStorageReading.length;

dataHomeTable.innerHTML = '';
if(dataStorage.length == 0){
    nullDataHome.innerHTML = `
        <img src="assets/img/nothing.svg">
        <p>Nothing Book Collection</p>
    `;
} else {
    nullDataHome.innerHTML = '';
}

dataStorage.forEach((item, index) => {
    let tr = document.createElement('TR');
    let numbers = index += 1;
    let status = (item.isComplete) ? 'Complete' : 'Is Reading';
    
    tr.innerHTML = `
        <td>${numbers}</td>
        <td class="title">${item.title}</td>
        <td class="author">${item.author}</td>
        <td class="year">${item.year}</td>
        <td class="status">${status}</td>
        <td class="action">
            <a href="#" data-id="${item.id}"><i class="fa-solid fa-eye"></i> view</a>
        </td>
    `;

    dataHomeTable.appendChild(tr);
});

buttonSearchExplore.onclick = function(){
    getDataSearch(exploreResult, dataStorage);
}

buttonSearchReading.onclick = function(){
    getDataSearch(readingResult, dataStorageReading);
}

buttonSearchComplete.onclick = function(){
    getDataSearch(completeResult, dataStorageComplete);
}

submitFormBook.addEventListener('click', function(){
    event.preventDefault();
    const id = pageFormBook.querySelector('#id').value;
    const title = pageFormBook.querySelector('#title').value;
    const author = pageFormBook.querySelector('#auth').value;
    const year = parseInt(pageFormBook.querySelector('#year').value);
    const isComplete = (pageFormBook.querySelector('#status').value == 'true') ? true : false;
    
    if( title == '' || author == ''){
        swal('Upps', 'Please fill in the data completely');
    } else {
        swal({
            title: "Are you sure?",
            text: "The data will be stored according to what you entered",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willSave) => {
            if (willSave) {
                const dataForm = { id, title, author, year, isComplete}
                let indexData = dataStorage.length;
        
                dataStorage.forEach((item, index) => {
                    if(dataForm.id == item.id){
                        indexData = index;
                    }
                } );
        
                dataStorage.splice(indexData, 1, dataForm);
                swal("Success", "Data saved successfully", "success").then(() => {
                    updateStorage(dataStorage);
                });
                
            }
          });
        
    }
});

clearForm.addEventListener('click', function(){
    event.preventDefault();
    const id = pageFormBook.querySelector('#id').value;
    openFormData(id);
})

buttonDelete.addEventListener('click', function(){
    swal({
        title: "Are you sure?",
        text: "This data will be deleted in storage",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            const id = buttonDelete.dataset.id;
            dataStorage.forEach((data, index) => {
                if(data.id == id){
                    dataStorage.splice(index, 1);
                }
            })
          swal("Success", "Data deleted successfully", 'success').then(() => {
            updateStorage(dataStorage);
          });
          
        }
      });
    
})

buttonMark.addEventListener('click', function(){
    swal({
        title: "Are you sure?",
        text: "This book will be moved to another shelf",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willMove) => {
        if (willMove) {
            const id = this.dataset.id;
            dataStorage.forEach((data) => {
                if(data.id == id){
                    const changeStatus = (data.isComplete) ? false : true;
                    data.isComplete = changeStatus;
                }
            })
            swal('Success', 'The book move successfully', 'success').then(() => {
                updateStorage(dataStorage);
            })
        }
      });
    
})

getDataSearch(exploreResult, dataStorage);
getDataSearch(readingResult, dataStorageReading);
getDataSearch(completeResult, dataStorageComplete);
searchBook(inputSearchExplore,'keyup', dataStorage);
searchBook(inputSearchReading,'keyup', dataStorageReading);
searchBook(inputSearchComplete,'keyup', dataStorageComplete);
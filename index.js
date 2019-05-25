
const variables = (function(){
    const domStrings = {
        title:document.querySelector('.title'),
        author:document.querySelector('.author'),
        isbn:document.querySelector('.isbn'),
        btn:document.querySelector('.btn'),
        table:document.querySelector('.t-body')
    };
    return {
        domStrings:domStrings
      }
})();
console.log (variables.domStrings.title,variables.domStrings.author,variables.domStrings.isbn,variables.domStrings.table);


class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
     about(){
         console.log(`this book name is ${this.title} ,Its Written by ${this.author} and its Isbn Number is ${this.isbn}`);
    }
};


function init(){
    variables.domStrings.title.value = '';
    variables.domStrings.author.value = '';
    variables.domStrings.isbn.value = '';
    
}

//to insert book in table
function addBook(){
    //create new instant of book
    let instant = new Book(variables.domStrings.title.value,variables.domStrings.author.value,variables.domStrings.isbn.value);
    console.log(instant);
//create table row
if(instant.title !='' && instant.author !='' && instant.isbn !='' && !isNaN(instant.isbn)){
    let tablerow = '';
    tablerow += `
    <tr class='text-muted'><th>${instant.title}</th><th>${instant.author}</th><th>${instant.isbn}<a href='#'><i class='fas fa-times ml-4 float-right'></i></a></th></tr>`;
//insert tablerow inside table body
    variables.domStrings.table.insertAdjacentHTML('afterbegin',tablerow);

    //store in local Storage
    saveInLocalStorage(instant);
}
else{
    alert('Please Enter Valid Entry');
}
    //call init function
    init();
};
//localStorage.clear();

//to remove a row from table
function removeTablerow(e){
    //using event delegation
    if(e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('t-body')){
        e.target.parentNode.parentNode.parentNode.remove();
        //to permanently remove from localStorage
        removeFromLocalStorage(e.target.parentNode.parentNode.parentNode);
    }
}

function saveInLocalStorage(book){
    let books;
    if(localStorage.getItem("books") === null){
        books = [];
    }
    else{
        books = JSON.parse(localStorage.getItem("books"));
    }
    books.push(book);

    localStorage.setItem("books",JSON.stringify(books));
}

function retrieveFromLocalStorage(book){
    let books;
     if(localStorage.getItem("books") === null){
         books = [];
     }
     else{
         books = JSON.parse(localStorage.getItem("books"));
     }
     //loops through books array
     books.forEach(function(book){
        let tablerow = '';
        tablerow += `
        <tr class='text-muted'><th>${book.title}</th><th>${book.author}</th><th>${book.isbn}<a href='#'><i class='fas fa-times ml-4'></i></a></th></tr>`;
    //insert tablerow inside table body
        variables.domStrings.table.insertAdjacentHTML('afterbegin',tablerow);
     });
}

function removeFromLocalStorage(book){
    console.log(1,book);
    let books;
     if(localStorage.getItem("books") === null){
         books = [];
     }
     else{
         books = JSON.parse(localStorage.getItem("books"));
     }
     console.log(books,book.firstChild.textContent);
     books.forEach(function(value,index){
         if(book.firstChild.textContent === value.title){
              console.log(book.firstChild.textContent,value.title);
             books.splice(index,1);
             console.log('Item-Deleted');
         }
     });
     //set to local Storage
     localStorage.setItem("books",JSON.stringify(books));
}


//Event Listener
const EventListener = (function(){
    variables.domStrings.btn.addEventListener('click',addBook);
    document.body.addEventListener('click',removeTablerow);
    document.addEventListener('DOMContentLoaded',retrieveFromLocalStorage);
})();

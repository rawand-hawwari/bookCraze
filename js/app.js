// ---------------------------------classes
// books class
class Book{
    constructor(id, image, title, author, category, release_date, rating, description){
        this.id = id;
        this.image = image;
        this.title = title;
        this.author = author;
        this.category = category;
        this.release_date = release_date;
        this.rating = rating;
        this.description = description;
      }
}

// ---------------------------------functions
//function for welcoming msg in (hero section)
function welcoming(){
    let header = document.querySelector(".hero .content h1");
    let sub = document.querySelector(".hero .content h4");

    // if user then =>
    // change welcome msg for user
    header.textContent= "Welcome to the Library";  //welcome message
    sub.textContent= "Dive into endless stories and adventures, all at your fingertips";

    // else then =>
    header.textContent= "Welcome to the Library";  //welcome message
    sub.textContent= "Dive into endless stories and adventures, all at your fingertips";
}



// add the (top rated) section into home page
function addTopRated(){
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            books = json.map(function(element){
                book = new Book(element.id, element.image, element.title, element.author, element.category, element.release_date, element.rating, element.description);
                return book;
            });

            books.sort()
            topRated = books.sort(
                (b1, b2) => (b1.rating < b2.rating) ? 1 : (b1.rating > b2.rating) ? -1 : 0);

            let cards = '<ul class="cards">';
            for(i=0; i<10; i++){
                cards += `
                <li class="card top-rate" onclick="clickCard(${i},'top-rate')"></li>`;
            }
            cards += '</ul>';
            document.getElementById('top-rated').innerHTML = cards;
            printCards('top-rate', topRated);

        })
        .catch(error => console.error('Error:', error));
}

// add the (new arrival) section into home page
function addNewArrival(){
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            books = json.map(function(element){
                book = new Book(element.id, element.image, element.title, element.author, element.category, element.release_date, element.rating, element.description);
                return book;
            });

            books.sort()
            NewArrival = books.sort(
                (b1, b2) => (b1.release_date < b2.release_date) ? 1 : (b1.release_date > b2.release_date) ? -1 : 0);

                console.log(NewArrival);
            let cards = '<ul class="cards">';
            for(i=0; i<10; i++){
                cards += `
                <li class="card newBooks" onclick="clickCard(${i},'newBooks')"></li>`;
            }
            cards += '</ul>';
            document.getElementById('new-arrival').innerHTML = cards;
            printCards('newBooks', NewArrival);
        })
        .catch(error => console.error('Error:', error));
}

// printing recommendation section for user
// needs user but this is just a preview for it
function addRecommendation(){
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            books = json.map(function(element){
                book = new Book(element.id, element.image, element.title, element.author, element.category, element.release_date, element.rating, element.description);
                return book;
            });

            books.sort()
            recommendation = books.sort();

                console.log(recommendation);
            let list = '';
            for(i=0; i<7; i++){
                list += `
                <li class="recommend" type="button" onclick="clickListBook(${i})">
                    <h6>Title: ${recommendation[i].title}</h6>
                    <p>Author: ${recommendation[i].author}</p>
                </li>`;
            }
            document.getElementById('recommendation-list').innerHTML = list;

            let details = document.getElementById('recommend-details');
            details.innerHTML = `
                <img src="${recommendation[0].image}" alt="${recommendation[0].title}" height="390.06" width="282.19px">
                <div class="d-flex justify-content-between m-3 px-2">
                    <div class="text-start me-4 mt-3">
                        <p><b>Title: ${recommendation[0].title}</b></p>
                        <p>Rating: ${books[i].rating} <i class="fas fa-star" style="color: gold;"></i></p>
                    </div>
                    <a id="fav" onclick="addToFav(${books[0].id}, ${0}, 'recommendation', event)" style="text-decoration: none; color: black;"><i class="fav-icon far fa-heart"></i></a>
                </div>
            `;
            // printCards('newBooks', NewArrival);
        })
        .catch(error => console.error('Error:', error));
}

// function to change the selected book from list of recommendation
function clickListBook(index){
    let details = document.getElementById('recommend-details');
    details.innerHTML = `
        <img src="${recommendation[index].image}" alt="${recommendation[index].title}" height="390.06" width="282.19px">
        <div class="d-flex justify-content-between mx-5 px-4 my-4">
            <div class="text-start me-4">
                <p><b>Title: ${recommendation[index].title}</b></p>
                <p>Rating: ${books[i].rating} <i class="fas fa-star" style="color: gold;"></i></p>
            </div>
            <a id="fav" onclick="addToFav(${books[index].id}, ${0}, 'recommendation', event)" style="text-decoration: none; color: black;"><i class="fav-icon far fa-heart"></i></a>
        </div>
    `;
}

// function for book details when (clicked) in home page
function clickCard(id, section){
    // get tag by the passed id
    // let listItems = document.getElementsByTagName('li');
    let listItems = document.querySelectorAll(`li.${section}`);
    // listItems[id].setAttribute('id','clicked');

    console.log(listItems);
    listItems.forEach(element => {
        var idAttribute = element.getAttribute("id");
        if (idAttribute && idAttribute.indexOf('clicked') !== -1) {
            element.removeAttribute('id');
        }
    });
    console.log(listItems);
    listItems[id].setAttribute('id','clicked');
    // add the new content to its document
    if(section == 'top-rate'){
        printCards(section, topRated);
    }else if(section = 'newBooks'){
        printCards(section, NewArrival);
    }
}

// function to (print the card) based on if it clicked or not
function printCards(section, bookList){
    let list = document.querySelectorAll(section);
    let listItems = document.querySelectorAll(`li.${section}`);
    console.log(section);
    let i = 0;
    listItems.forEach(item => {
        var bookid = 0;
        var idAttribute = item.getAttribute("id");
        console.log(idAttribute);
        if (idAttribute && idAttribute.indexOf('clicked') !== -1) {
            books.forEach(element =>{
                if(bookList[i].title == element.title){
                    bookid = element.id;
                }
            });

            console.log('hi' + item);
            item.removeAttribute('onclick');
            item.innerHTML = `
            <div>
                <div class = "contents" >
                    <img src="${bookList[i].image}" class="card-img-top mb-3" alt="${bookList[i].title}" style="max-height: 317px; max-width: 208px;">
                    <div class = "content-container px-3">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title">Title: ${bookList[i].title}</h3>
                            <a id="fav" onclick="addToFav(${bookList[i].id}, ${i}, '${section}', event)" style="text-decoration: none; color: black;"><i class="fav-icon far fa-heart"></i></a>
                        </div>
                        <div class="card-content">
                            <p>Author: ${bookList[i].author}</p>
                            <p>Category: ${bookList[i].category}</p>
                            <p>Release Date: ${bookList[i].release_date}</p>
                            <p style="max-height: 144px; ovverflow: hidden;">Description: ${bookList[i].description}</p>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <p>Rating: ${bookList[i].rating} <i class="fas fa-star" style="color: gold;"></i></p>
                    <a href="HTML/book-details.html?id=${bookid} " class="btn read-more">Read more</a>
                </div>
            </div>`;
            i++;
        }else{
            var idAttribute = item.getAttribute("onclick");
            console.log(idAttribute);
            if (idAttribute !== `clickCard(${i},'${section}')`) {
                item.setAttribute('onclick',`clickCard(${i},'${section}')`);
            }
            item.removeAttribute('style');
            item.innerHTML = `
                <div class = "text-center">
                    <img src="${books[i].image}" class="card-img-top mb-3" alt="${books[i].title}" style="height: 200px">
                    <div class = "content-container px-3">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title" style="height: 52px; overflow: hidden;">Title: ${books[i].title}</h3>
                            <a id="fav" onclick="addToFav(${books[i].id}, ${i}, '${section}', event)" style="text-decoration: none; color: black;"><i class="fav-icon far fa-heart"></i></a>
                        </div>
                        <div class="card-content">
                            <p style="height: 48px">Author: ${books[i].author}</p>
                        </div>
                    </div>
                </div>`;
            i++;
        }
    })
}

//add to favourite function
function addToFav(id, index, section, event){
    let heartIcon = document.querySelectorAll(`.${section} .fav-icon`)

    if(section ==  'recommendation'){
        event.stopPropagation();
    }

    console.log(heartIcon);
    console.log(index);
    if(heartIcon[index].classList.contains('far')){
        heartIcon[index].classList.remove('far');
        heartIcon[index].classList.add('fas');

    }else if(heartIcon[index].classList.contains('fas')){
        heartIcon[index].classList.remove('fas');
        heartIcon[index].classList.add('far');
    
    }
}

//////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    let flag = 0;
    const c1 = document.querySelector('.c1');
    const c2 = document.querySelector('.c2');
    const c3 = document.querySelector('.c3');
    const c4 = document.querySelector('.c4');
    const c5 = document.querySelector('.c5');
    const c6 = document.querySelector('.c6');
  
    const nextButton = document.querySelector('.cco');
  
    nextButton.addEventListener('click', function() {
      if (flag === 0) {
        c2.style.transform = 'translateX(0) scale(1.5)';
        c2.style.zIndex = '99';
        c3.style.transform = 'translateX(-100px) scale(1)';
        c3.style.zIndex = '9';
        c4.style.transform = 'translateX(-100px) scale(1)';
        c4.style.zIndex = '9';
        c5.style.transform = 'translateX(-100px) scale(1)';
        c5.style.zIndex = '9';
        c6.style.transform = 'translateX(-100px) scale(1)';
        c6.style.zIndex = '9';
        c1.style.transform = 'translateX(100px) scale(1)';
        c1.style.zIndex = '9';
        flag = 1;
      } else if (flag === 1) {
        c3.style.transform = 'translateX(0) scale(1.5)';
        c3.style.zIndex = '99';
        c4.style.transform = 'translateX(-100px) scale(1)';
        c4.style.zIndex = '9';
        c5.style.transform = 'translateX(-100px) scale(1)';
        c5.style.zIndex = '9';
        c6.style.transform = 'translateX(-100px) scale(1)';
        c6.style.zIndex = '9';
        c1.style.transform = 'translateX(100px) scale(1)';
        c1.style.zIndex = '9';
        c2.style.transform = 'translateX(100px) scale(1)';
        c2.style.zIndex = '9';
        flag = 2;
      } else if (flag === 2) {
        c4.style.transform = 'translateX(0) scale(1.5)';
        c4.style.zIndex = '99';
        c5.style.transform = 'translateX(-100px) scale(1)';
        c5.style.zIndex = '9';
        c6.style.transform = 'translateX(-100px) scale(1)';
        c6.style.zIndex = '9';
        c1.style.transform = 'translateX(-100px) scale(1)';
        c1.style.zIndex = '9';
        c2.style.transform = 'translateX(100px) scale(1)';
        c2.style.zIndex = '9';
        c3.style.transform = 'translateX(100px) scale(1)';
        c3.style.zIndex = '9';
        flag = 3;
      }else if (flag === 3) {
        c5.style.transform = 'translateX(0) scale(1.5)';
        c5.style.zIndex = '99';
        c6.style.transform = 'translateX(-100px) scale(1)';
        c6.style.zIndex = '9';
        c1.style.transform = 'translateX(-100px) scale(1)';
        c1.style.zIndex = '9';
        c2.style.transform = 'translateX(-100px) scale(1)';
        c2.style.zIndex = '9';
        c3.style.transform = 'translateX(100px) scale(1)';
        c3.style.zIndex = '9';
        c4.style.transform = 'translateX(100px) scale(1)';
        c4.style.zIndex = '9';
        flag = 4;
      }else if (flag === 4) {
        c6.style.transform = 'translateX(0) scale(1.5)';
        c6.style.zIndex = '99';
        c1.style.transform = 'translateX(-100px) scale(1)';
        c1.style.zIndex = '9';
        c2.style.transform = 'translateX(-100px) scale(1)';
        c2.style.zIndex = '9';
        c3.style.transform = 'translateX(-100px) scale(1)';
        c3.style.zIndex = '9';
        c4.style.transform = 'translateX(100px) scale(1)';
        c4.style.zIndex = '9';
        c5.style.transform = 'translateX(100px) scale(1)';
        c5.style.zIndex = '9';
        flag = 5;
      }else if (flag === 5) {
        c1.style.transform = 'translateX(0) scale(1.5)';
        c1.style.zIndex = '99';
        c2.style.transform = 'translateX(-100px) scale(1)';
        c2.style.zIndex = '9';
        c3.style.transform = 'translateX(-100px) scale(1)';
        c3.style.zIndex = '9';
        c4.style.transform = 'translateX(-100px) scale(1)';
        c4.style.zIndex = '9';
        c5.style.transform = 'translateX(100px) scale(1)';
        c5.style.zIndex = '9';
        c6.style.transform = 'translateX(100px) scale(1)';
        c6.style.zIndex = '9';
        flag = 0;
      }
    });
});



let books = [];
let topRated = [];
let NewArrival =[];
let recommendation =[];
addTopRated();
addNewArrival();
addRecommendation();
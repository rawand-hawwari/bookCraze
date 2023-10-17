class Book {
    constructor(id, title, author, category, rating, description, language, release_date, image) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.rating = rating;
        this.description = description;
        this.language = language;
        this.release_date = release_date;
        this.image = image;
    }
}





function getdata() {
    
    fetch('http://localhost:3000/books')
    
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            data.map(element => {
                const book = new Book(element.id, element.title, element.author, element.category, element.rating, element.description, element.language, element.release_date, element.image);

                let card = document.createElement('div');
                card.className = "card";
                card.style = "width: 18rem; height:650px";
                card.innerHTML = `
                    <img src="${book.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit:content" >
                    <div class="card-body">
                        <h5 class="card-title" style="overflow:hidden; height:75px">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <p class="card-text">Category: ${book.category}</p>
                    </div>
                `;

                card.querySelector('.card-img-top').addEventListener('click', () => {
                    window.location.href = `/HTML/book-details.html?id=${book.id}`;
                });
                cards.appendChild(card);
            });

            
        })
        .catch(error => {
            console.error('Error:', error);
        });

        document.addEventListener("DOMContentLoaded", () => {
            const query = window.location.search.split("=")[1];
            if (!query) return; // return 404 page
            searchBook(query);
          });
}

async function searchBook(query) {
    fetch(`http://localhost:3000/books?q=${query}`)
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            cards.innerHTML = '';

            data.map(element => {
                const book = new Book(element.id, element.title, element.author, element.category, element.rating, element.description, element.language, element.release_date, element.image);

                let card = document.createElement('div');
                card.className = "card";
                card.style = "width: 18rem; height:650px";
                card.innerHTML = `
                    <img src="${book.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit:content" >
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <p class="card-text">Category: ${book.category}</p>
                    </div>
                `;

                card.querySelector('.card-img-top').addEventListener('click', () => {
                    window.location.href = `/HTML/book-details.html?id=${element.id}`;
                });
                cards.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
  }

getdata();

//Category

const categorySelect = document.getElementById('category');


categorySelect.addEventListener("change", (e) => {
    const selectedCategory = e.target.value; 
    const authorOption = document.querySelector('#author option[value="author"]');
    authorOption.selected = true;
    const languageOption = document.querySelector('#language option[value="language"]');
   languageOption.selected = true; 
   const sortOption = document.querySelector('#sort option[value="sortby"]');
   sortOption.selected = true; 
 
   
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            cards.innerHTML = ''; 
            data.map(element => {
                if (element.category === selectedCategory ) {
                    let card = document.createElement('div');
                    card.className = "card";
                    card.style = "width: 18rem; height:650px";
                    card.innerHTML = `
                        <img src="${element.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit:content" >
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Author: ${element.author}</p>
                            <p class="card-text">Category: ${element.category}</p>
                        </div>
                    `;
                    card.querySelector('.card-img-top').addEventListener('click', () => {
                        window.location.href = `/HTML/book-details.html?id=${element.id}`;
                    });
                    cards.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        if (selectedCategory == "category") {
            data = getdata();
        }


});

//Author

const authorSelect = document.getElementById('author');

authorSelect.addEventListener("change", (e) => {
    const selectedAuthor = e.target.value; 
    const categoryOption = document.querySelector('#category option[value="category"]');
    categoryOption.selected = true; 
    const languageOption = document.querySelector('#language option[value="language"]');
    languageOption.selected = true; 
    const sortOption = document.querySelector('#sort option[value="sortby"]');
    sortOption.selected = true; 
  
 
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            cards.innerHTML = ''; 
            data.map(element => {
                if (element.author === selectedAuthor ) {
                    let card = document.createElement('div');
                    card.className = "card";
                    card.style = "width: 18rem; height:650px";
                    card.innerHTML = `
                        <img src="${element.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit:content" >
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Author: ${element.author}</p>
                            <p class="card-text">Category: ${element.category}</p>
                        </div>
                    `;
                    card.querySelector('.card-img-top').addEventListener('click', () => {
                        window.location.href = `/HTML/book-details.html?id=${element.id}`;
                    });
                    cards.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        if (selectedAuthor == "author") {
            data = getdata();
        }

});

//language

const languageSelect = document.getElementById('language');

languageSelect.addEventListener("change", (e) => {
    const selectedLanguage = e.target.value; 
    const categoryOption = document.querySelector('#category option[value="category"]');
    categoryOption.selected = true; 
    const authorOption = document.querySelector('#author option[value="author"]');
    authorOption.selected = true; 
    const sortOption = document.querySelector('#sort option[value="sortby"]');
    sortOption.selected = true; 
    
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            cards.innerHTML = ''; 
            data.map(element => {
                if (element.language === selectedLanguage) {
                    let card = document.createElement('div');
                    card.className = "card";
                    card.style = "width: 18rem; height:650px";
                    card.innerHTML = `
                        <img src="${element.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit:content" >
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Author: ${element.author}</p>
                            <p class="card-text">Category: ${element.category}</p>
                        </div>
                    `;
                    card.querySelector('.card-img-top').addEventListener('click', () => {
                        window.location.href = `/HTML/book-details.html?id=${element.id}`;
                    });
                    cards.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        if (selectedLanguage == "language") {
            data = getdata();
        }
});



//Search
function searchBooks() {
    let searchQuery = document.getElementById('searchInput').value;
    search(searchQuery);
}

function search(searchQuery) {
    const categoryOption = document.querySelector('#category option[value="category"]');
    categoryOption.selected = true; 
    const authorOption = document.querySelector('#author option[value="author"]');
    authorOption.selected = true;
    const languageOption = document.querySelector('#language option[value="language"]');
   languageOption.selected = true; 
   const sortOption = document.querySelector('#sort option[value="sortby"]');
   sortOption.selected = true; 
 
    fetch(`http://localhost:3000/books?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            cards.innerHTML = '';

            data.map(element => {
                const book = new Book(element.id, element.title, element.author, element.category, element.rating, element.description, element.language, element.release_date, element.image);

                let card = document.createElement('div');
                card.className = "card";
                card.style = "width: 18rem; height:650px";
                card.innerHTML = `
                    <img src="${book.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit:content" >
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <p class="card-text">Category: ${book.category}</p>
                    </div>
                `;

                card.querySelector('.card-img-top').addEventListener('click', () => {
                    window.location.href = `html/detail.html?id=${element.id}`;
                });
                cards.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
      
}


//Sort

const sortSelect = document.getElementById('sort');

sortSelect.addEventListener("change", (e) => {
    const selectedSort = e.target.value;
    const categoryOption = document.querySelector('#category option[value="category"]');
    const languageOption = document.querySelector('#language option[value="language"]');
    const authorOption = document.querySelector('#author option[value="author"]');
    authorOption.selected = true; 
    languageOption.selected = true; 
    categoryOption.selected = true; 
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('book');
            cards.innerHTML = '';

            if (selectedSort === "A-Z") {
                data = sortDataAlphabetically(data); 
            }

            if (selectedSort === "Z-A") {
                data = sortDataAlphabeticallyreverse(data);
            }

            if (selectedSort === "oldest") {
                data = sortbydateasc(data);
            }
            if (selectedSort === "latest") {
                data = sortbydatedesc(data);
            }

            if (selectedSort === "toprated") {
                data = sortbytoprated(data);
            }

            if (selectedSort == "sortby") {
                data = getdata();
            }

            data.map(element => {
                const book = new Book(element.id, element.title, element.author, element.category, element.rating, element.description, element.language, element.release_date, element.image);

                let card = document.createElement('div');
                card.className = "card";
                card.style = "width: 18rem; height:650px";
                card.innerHTML = `
                    <img src="${book.image}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%;object-fit:content" >
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <p class="card-text">Category: ${book.category}</p>
                    </div>
                `;

                card.querySelector('.card-img-top').addEventListener('click', () => {
                    window.location.href = `/HTML/book-details.html?id=${book.id}`;
                });
                cards.appendChild(card);
            
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        
    

});

function sortDataAlphabetically(data) {
    return data.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
}
function sortDataAlphabeticallyreverse(data) {
    return data.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA > titleB) {
            return -1;
        }
        if (titleA < titleB) {
            return 1;
        }
        return 0;
    });
}
function sortbydateasc(data) {
    return data.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}
function sortbydatedesc(data) {
    return data.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        if (dateA > dateB) {
            return -1;
        }
        if (dateA < dateB) {
            return 1;
        }
        return 0;
    });
}
function sortbytoprated(data) {
    return data.sort((a, b) => {
        const rateA = a.rating;
        const rateB = b.rating;
        if (rateA > rateB) {
            return -1;
        }
        if (rateA < rateB) {
            return 1;
        }
        return 0;
    });
}





// // books class
// class Book {
//     constructor(
//       id,
//       image,
//       title,
//       author,
//       category,
//       release_date,
//       rating,
//       description
//     ) {
//       this.id = id;
//       this.image = image;
//       this.title = title;
//       this.author = author;
//       this.category = category;
//       this.release_date = release_date;
//       this.rating = rating;
//       this.description = description;
//     }
//   }
  
//   fetch("http://localhost:3000/books")
//     .then((res) => res.json())
//     .then((json) => {
//       books = json.map(function (element) {
//         book = new Book(
//           element.id,
//           element.image,
//           element.title,
//           element.author,
//           element.category,
//           element.release_date,
//           element.rating,
//           element.description
//         );
//         // return book;
//         if (element.author == "Helen Hoang") {
//           const bookFromAuthor = document.createElement("li");
//           bookFromAuthor.innerHTML = `
        
//         <div>
//             <img src="${element.image}" class="card-img-top" alt="...">
//           <h3 class="card-title">Title : ${element.title}</h3>
//           <div class="card-content">
//             <p>Author : ${element.author}</p>
//           </div>
//         </div>
        
//           `;
//           // Add a class to the newly created element
//           bookFromAuthor.classList.add("card");
//           document
//             .getElementById("card-author-books")
//             .appendChild(bookFromAuthor);
//   }
//   if (element.category =="Romance") {
      
  
//           const SuggestionsBokk = document.createElement("li");
//           SuggestionsBokk.innerHTML = `
        
//         <div>
//             <img src="${element.image}" class="card-img-top" alt="...">
//           <h3 class="card-title">Title : ${element.title}</h3>
//           <div class="card-content">
//             <p>Author : ${element.author}</p>
//           </div>
//         </div>
        
//           `;
  
//           SuggestionsBokk.classList.add("card");
//           document
//             .getElementById("SuggestionsBooks")
//             .appendChild(SuggestionsBokk);
//           }
//       });
//       // add the author name 
//       // not completed yet
//       document.getElementById("booksBy").textContent(`Books By ${element.author}`)
//     });
// books class
let bookrate = 0;
let toprateindex =0;
class Book {
    constructor(
      id,
      image,
      title,
      author,
      category,
      release_date,
      rating,
      description,
      about_author,
      author_img
    ) {
      this.id = id;
      this.image = image;
      this.title = title;
      this.author = author;
      this.category = category;
      this.release_date = release_date;
      this.rating = rating;
      this.description = description;
      this.about_author= about_author;
      this.author_img = author_img;
    }
  }
  
  function createBooks(books) {
    books.map(function (element) {
      book = new Book(
        element.id,
        element.image,
        element.title,
        element.author,
        element.category,
        element.release_date,
        element.rating,
        element.description,
        element.about_author,
        element.author_img
      );
      // return book;
      const bookFromAuthor = document.createElement("li");
      bookFromAuthor.innerHTML = `
      <div>
            <a href='/HTML/book-details.html?id=${element.id}'>
            <img src="${element.image}" class="card-img-top" alt="...">
            </a>
        <h3  class="card-title"><a href='/HTML/book-details.html?id=${element.id}'>
        ${element.title}
        </a></h3>
        <span class= "hart-addto" ><a href="#" style="text-decoration: none; color: black;"><i class="far fa-heart"></i></a></span>
        <h6 class="card-description"> ${element.description}</h6>
        <div class="card-content">
          <p>Author :<a href="http://127.0.0.1:5500/HTML/Author.html?author=${element.author}"> ${element.author}</a></p>
        </div>
      </div>        
        `;
      // Add a class to the newly created element
      bookFromAuthor.classList.add("card");
      document.getElementById("card-author-books").appendChild(bookFromAuthor);
      document.getElementById("authorName").textContent = element.author;
      document.getElementById("booksBy").textContent = `Books BY ${element.author}`;
        
        
      
    });
    
    // add the author name
    // not completed yet
    // document.getElementById("booksBy").textContent(`Books By ${element.author}`);
  }
  
  async function getAuthorBooks(author) {
    const books = await fetch(`http://localhost:3000/books?author=${author}`);
    const booksJson = await books.json();
    const authorBooks = booksJson.map((book) => book.id);
    createBooks(booksJson);
  
    fetch(`http://localhost:3000/books?category=${booksJson[0].category}`)
      .then((res) => res.json())
      .then((data) => {
        const suggestedsBooks = data.filter(
          (book) => !authorBooks.includes(book.id)
        );
        suggestedsBooks.map(function (element) {
          const SuggestionsBokk = document.createElement("li");
          SuggestionsBokk.innerHTML = `
        <div>
            <a href='/HTML/book-details.html?id=${element.id}'>
            <img src="${element.image}" class="card-img-top" alt="...">
            </a>
            <h3 class="card-title"><a href='/HTML/book-details.html?id=${element.id}'>       ${element.title}</a>      </h3> 
            <span class= "hart-addto" ><a href="#" style="text-decoration: none; color: black;"><i class="far fa-heart"></i></a></span>
            <h6 class="card-description"> ${element.description}</h6>
          <div class="card-content">
          <p>Author :<a href="Author.html?author=${element.author}"> ${element.author}</a></p>
          </div>
        </div>
          `;
          SuggestionsBokk.classList.add("card");
          document
            .getElementById("SuggestionsBooks")
            .appendChild(SuggestionsBokk);
        

        });
      });

    //   document.getElementById("topRatedBookImg").textContent = ;
    // finding the highest book rate and add it to the top rate card
      
    //   console.log(booksJson)
      topratedbook(booksJson);
  }
  
  function topratedbook(booksJson) {
    for (let index = 0; index < booksJson.length; index++) {
        if (booksJson[index].rating >bookrate && (index+1==index.length) ) {
            bookrate = booksJson[index].rating;
            toprateindex =index;
            // console.log(bookrate);
            
        }else if (index+1 === booksJson.length) {
                // console.log(index);
                // console.log(toprateindex);
                // document.getElementById("topRatedBookImg").setAttribute("src", booksJson[toprateindex].image);
                // document.getElementById("topratedbook").textContent = booksJson[toprateindex].title;
                // document.getElementById("bookrate").textContent = booksJson[toprateindex].rating;
                document.getElementById("about-author").textContent = booksJson[toprateindex].about_author;
                document.getElementById("author-img").setAttribute("src", booksJson[toprateindex].author_img);
                // document.getElementById("book-description").textContent = booksJson[toprateindex].description;
                
                const item = document.createElement("div");
                item.innerHTML = `
                <div>
                    <div class = "d-flex align-items-center justify-content-center" >
                        <a href='/HTML/book-details.html?id=${booksJson[toprateindex].id}'>
                        <img src="${booksJson[toprateindex].image}" class="card-img-top mb-3" alt="Book Cover" style="max-height: 317px; max-width: 208px;">
                        </a>
                        <div class = "content-container p-3">
                            <div class="d-flex justify-content-between">
                                <h3 class="card-title">Title: ${booksJson[toprateindex].title}</h3>
                                <a href="#" style="text-decoration: none; color: black;"><i class="far fa-heart"></i></a>
                            </div>
                            <div class="card-content">
                                <p>Author: ${booksJson[toprateindex].author}</p>
                                <p>Category: ${booksJson[toprateindex].category}</p>
                                <p>Release Date: ${booksJson[toprateindex].release_date}</p>
                                <p>Description: ${booksJson[toprateindex].description}</p>
                            </div>
                        </div>
                    </div>
                    <p>Author: ${booksJson[toprateindex].rating} <i class="fas fa-star" style="color: gold;"></i></p>
                </div>`;
                document.getElementById("top-seller-book").appendChild(item);
            }     
      }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const author = window.location.search.split("=")[1];
    if (!author) return; // return 404 page
    getAuthorBooks(author);
  });
  



  document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
  
    // Add a submit event listener to the form
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the author's name from the search bar input
      const authorName = document.getElementById("searchbar").value;
  
      // Construct the URL to the author's page with the entered author name
      const authorUrl = `/HTML/Author.html?author=${authorName}`;
  
      // Navigate to the specified URL
      window.location.href = authorUrl;
    });
  });

  function caseInsensitiveSearch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  }

//   async function getAuthorBooksFromSearch(author) {
//     const books = await fetch(`http://localhost:3000/books`);
//     const booksJson_ = await books.json();
//     console.log(booksJson_);
//     // Get the author's name from the search bar input
//     const authorName = document.getElementById("searchbar").value;
  
//     // Filter books based on the author name (case-insensitive and partial match)
//     const filteredBooks = booksJson_.filter((book) =>
//       caseInsensitiveSearch(authorName, book.author)
//     );
  
//     if (filteredBooks.length > 0) {
//       // Author found, display books
//       const authorBooks = filteredBooks.map((book) => book.id);
//       createBooks(filteredBooks);
  
//       // The rest of your code to display top-rated books and suggestions...
//     } else {
//       // Author not found, handle it as needed (e.g., show a message)
//       console.log("Author not found");
//     }
//   }
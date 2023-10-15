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
          <img src="${element.image}" class="card-img-top" alt="...">
        <h3 class="card-title">Title : ${element.title}</h3>
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
            <img src="${element.image}" class="card-img-top" alt="...">
          <h3 class="card-title">Title : ${element.title}</h3>
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
      let bookrate = 0;
    //   console.log(booksJson)
      for (let index = 0; index < booksJson.length; index++) {
        if (booksJson[index].rating >=bookrate ) {
            bookrate = booksJson[index].rating
            console.log(bookrate);
            if (index+1 === booksJson.length) {
                console.log(index);
                document.getElementById("topRatedBookImg").setAttribute("src", booksJson[index].image);
                document.getElementById("topratedbook").textContent = booksJson[index].title;
                document.getElementById("bookrate").textContent = booksJson[index].rating;
                document.getElementById("about-author").textContent = booksJson[index].about_author;
                document.getElementById("author-img").setAttribute("src", booksJson[index].author_img);
                document.getElementById("book-description").textContent = booksJson[index].description;
            }
        } 

        
      }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const author = window.location.search.split("=")[1];
    if (!author) return; // return 404 page
    getAuthorBooks(author);
  });
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
    )
     {
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

function getdata() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            let cards = document.getElementById('authors');
            data.map(element => {
                const authors = new Book(element.id,
                    element.image,
                    element.title,
                    element.author,
                    element.category,
                    element.release_date,
                    element.rating,
                    element.description,
                    element.about_author,
                    element.author_img);

                let card = document.createElement('div');
                card.className = "card";
                card.style = "width: 18rem; height:400px";
                card.innerHTML = `
                <a href="/HTML/Author.html?author=${authors.author}"> <img src="${authors.author_img}" class="card-img-top" alt="Book Cover" style="max-width: 100%; height:75%; object-fit: cover;" >
                </a>
                    <div class="card-body">
                        <p class="card-text">Author: ${authors.author}</p>
                    </div>`
                ;
                if(authors.id == 20){
                console.log(authors.author_img);}
console.log(authors.author)
                card.querySelector('.card-img-top').addEventListener('click', () => {
                    window.location.href = '';
                });
                cards.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
getdata();
async function getUserData(id) {
    const response = await fetch("http://localhost:3000/data");
  
    const info = await response.json();
  
    const firstname = info[id - 1].firstname;
  
    document.querySelector(".firstname2").textContent = firstname;
  
    const lastname = info[id - 1].lastname;
  
    document.querySelector(".lastname2").textContent = lastname;
  
    const email = info[id - 1].email;
  
    document.querySelector(".email2").textContent = email;
  
    const address = info[id - 1].address;
  
    document.querySelector(".address2").textContent = address;
  }
  getUserData(1);
  // -----------------------------------------------------
  async function updateUserData() {
    const userId = 1; // ID of the user you want to update
    const firstname2 = document.getElementById("callfirstname").value;
    const lastname2 = document.getElementById("calllastname").value;
    const address2 = document.getElementById("calladdress").value;
    const existingEmail = document.querySelector(".email2").textContent;
  
    // Only update if firstname2 is not null or empty
    if (firstname2) {
      const response = await fetch(`http://localhost:3000/data/${userId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname2,
          lastname: lastname2,
          address: `Address: ${address2}`,
          email: `${existingEmail}`, // Preserve the existing email
        }),
      });
  
  
      if (response.ok) {
        console.log("User data updated successfully");
      } else {
        console.error("Failed to update user data");
      }
    }
  }
  
  // ----------------------------------------------------------------------------------
  // removeData from JSON
  function removeData() {
    // Specify the URL of the endpoint
    const userId = 1;
    const firstname2 = document.getElementById("callfirstname").value;
    const lastname2 = document.getElementById("calllastname").value;
    const address2 = document.getElementById("calladdress").value;
    const existingEmail = document.querySelector(".email2").textContent;
  
    fetch(`http://localhost:3000/data/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // You can include a request body if needed
      body: JSON.stringify({
        firstname: firstname2,
        lastname: lastname2,
        address: `Address: ${address2}`,
        email: `${existingEmail}`,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data removed successfully:', data);
      })
      .catch(error => {
        console.error('Error removing data:', error);
      });
  }
  // ----------------------------------------------------------------------------------
  
  // profilepic
  let ProfilePic = document.getElementById("profilepic");
  let InputFile = document.getElementById("input-file");
  
  addEventListener('load', () => {
    const storedProfilePic = sessionStorage.getItem('profilePic');
    if (storedProfilePic) {
      ProfilePic.src = storedProfilePic;
    }
  });
  
  InputFile.onchange = function () {
    const imageUrl = URL.createObjectURL(InputFile.files[0]);
  
    // Save the profile picture data to session storage
    sessionStorage.setItem('profilePic', imageUrl);
  
    ProfilePic.src = imageUrl;
  }
  // ----------------------------------------------------------------------------------
  // LOGOUT
  function Logout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('profilePic');
    removeData();
    window.location.href = '../index.html';
  }

  function favorite(){
    document.getElementById('form-profile').style.display='none';
    displayFav();
  }

  function details(){
    document.getElementById('form-profile').style.display="block";
  }  

  const userSession = sessionStorage. getItem('userId');

  function displayFav() {
    let info, favorites;

    let books;
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            books = json;
            console.log(books);

            // Fetch favorites inside the books fetch
            fetch('http://localhost:3000/favourite')
                .then(response => response.json())
                .then(json => {
                    info = json;
                    console.log(info);

                    // Process favorites inside the favorites fetch
                    favorites = [];
                    if (info.length !== 0) {
                        info.forEach(element => {
                            if (element.user == userSession) {
                                favorites.push(element);
                            }
                        });
                    }

                    document.getElementById('favSection').innerHTML = '<ul id="cards"></ul>';
                    console.log(favorites);
                    if (favorites.length !== 0) {
                        favorites.forEach(element => {
                            document.getElementById('cards').innerHTML +=
                                `<li class="card" id="favCard" onclick="window.location='/HTML/book-details.html?id=${element.id}'">
                                    <div class="text-center">
                                        <img src="${books[element.id].image}" class="card-img-top mb-3" alt="${books[element.id].title}" style="height: 200px">
                                        <div class="content-container px-3">
                                            <div class="d-flex justify-content-between">
                                                <h3 class="card-title" style="height: 52px; overflow: hidden;">Title: ${books[element.id].title}</h3>
                                                <a id="fav" onclick="deleteFav(${books[element.id].id}, event)" style="text-decoration: none; color: #E55604;"><i class="fav-icon fas fa-heart"></i></a>
                                            </div>
                                            <div class="card-content">
                                                <p style="height: 48px">Author: ${books[element.id].author}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
                        });
                    }
                })
                .catch(error => console.error('Error fetching favorites:', error));
        })
        .catch(error => console.error('Error fetching books:', error));
}
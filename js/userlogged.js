var user = sessionStorage. getItem('userId');
if(user !=="" && user !== null){
    document.getElementById('profile-icon').classList.remove('d-none');
    document.getElementById('singin-button').classList.add('d-none');
}else{
    document.getElementById('singin-button').classList.remove('d-none');
    document.getElementById('profile-icon').classList.add('d-none');    
}


//Search
function searchBooks() {
    let searchQuery = document.getElementById('searchInput').value;
    search(searchQuery);
}

function search(searchQuery) {
    console.log(searchQuery);
    window.location = `/HTML/category.html?q=${searchQuery}`;  
}


const inputElement = document.querySelector('.input');
const buttonElement = document.querySelector('.search-button');
let listElement = document.querySelector('.users-list');

async function search(){    
    let users = [];

    listElement.innerHTML = `<h3>Carregando...</h3>`;

    const response = await fetch(`https://api.github.com/users/${inputElement.value.toLowerCase()}/following`);
    responseJson = await response.json();
    
    responseJson.map(user => {
        users.push(user);
    });

    list = '';
    
    for(user of users){
        list += `<section class="user-item">
                    <img src="${user.avatar_url}" alt="alt">
                    <p>${user.login}</p>
                    <a href="${user.html_url}">Ver perfil</a>
                </section>`
        
        listElement.innerHTML = list;
    }
}

inputElement.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('.search-button').click();
  }
});


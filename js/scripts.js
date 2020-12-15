import getUsersFromApi from './service.js';

const inputElement = document.querySelector('.input');
const buttonElement = document.querySelector('.search-button');
let listElement = document.querySelector('.users-list');

inputElement.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('.search-button').click();
  }
});

buttonElement.onclick = function search(){   
  let list = '';
  listElement.innerHTML = `<h3>Carregando...</h3>`; 
  
  const users = getUsersFromApi(inputElement.value.toLowerCase());

  users.then(userArray => {
    userArray.map(user => {
      list += 
      `<section class="user-item">
        <img src="${user.avatar_url}" alt="alt">
        <p>${user.login}</p>
        <a href="${user.html_url}">Ver perfil</a>
      </section>`
    })    
    listElement.innerHTML = list;
  }).catch(error => {
    listElement.innerHTML = `<h3>Usuário não encontrado</h3>`
  })
}
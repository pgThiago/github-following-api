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
    if(userArray.length === 0)
      list += `<h3>${inputElement.value} segue nenhum dev</h3>`
    else
      list += `<h3>${inputElement.value} está seguindo os seguintes devs</h3>`
    userArray.map(user => {
      console.log(user);
      list += 
      `<section class="user-item">
        <img src="${user.avatar_url}" alt="alt">
        <p>${user.login}</p>
        <a href="https://github.com/${user.login}?tab=repositories" target="_blank" rel="noopener noreferrer">Repositórios</a>
        <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">Ver perfil</a>
      </section>`
    })    
    listElement.innerHTML = list;
  }).catch(error => {
    listElement.innerHTML = `<h3>Usuário não encontrado</h3>`
  })
}
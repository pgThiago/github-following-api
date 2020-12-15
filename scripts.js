let users = [];
let list = '';
async function search(){
    let searchButtonElement = document.querySelector('.search-button');
    let inputElement = document.querySelector('.input').value;
    let listElement = document.querySelector('.users-list');
    
    const response = await fetch(`https://api.github.com/users/${inputElement.toLowerCase()}/following`);
    responseJson = await response.json();

    responseJson.map(user => {
        users.push(user);
    })
    
    for(user of users){
        list += `<section class="user-item">
                    <img src="${user.avatar_url}" alt="alt">
                    <p>${user.login}</p>
                    <a href="${user.html_url}">Ver perfil</a>
                </section>`
        
        listElement.innerHTML = list;
    }    
}

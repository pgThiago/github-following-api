const inputElement = document.querySelector('.input')
const buttonElement = document.querySelector('.search-button')
let listElement = document.querySelector('.users-list')

let list = ''
let shouldLoadMore = false

let page = 1

let infoTextElement = document.querySelector('.info-text')
let loadingElement = document.querySelector('.loading')

let loadMoreButton = document.querySelector('.load-more')

inputElement.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault()
		document.querySelector('.search-button').click()
	}
})

buttonElement.onclick = function search() {
	loadingElement.classList.add('reveal')

	const users = getUsersFromApi(inputElement.value.toLowerCase(), page)
	if (!users)
		list += `Usuário não encontrado!`

	if (!shouldLoadMore)
		list = ''
	users.then(userArray => {
		userArray.map(user => {
			list +=
				`<section class="user-item">
        <img src="${user.avatar_url}" alt="alt">
        <p>${user.login}</p>
        <a href="https://github.com/${user.login}?tab=repositories" target="_blank" rel="noopener noreferrer">Repositórios</a>
        <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">Ver perfil</a>
      </section>`
		})

		infoTextElement.innerHTML = `${inputElement.value} está seguindo os seguintes Devs`
		infoTextElement.classList.add('reveal')
		loadingElement.classList.remove('reveal')
		loadMoreButton.classList.add('reveal')
		listElement.innerHTML = list

	}).catch(error => {
		listElement.innerHTML = `<h3>Usuário não encontrado</h3>`
	})
}

function loadMore() {
	page++
	shouldLoadMore = true
	document.querySelector('.search-button').click()
}
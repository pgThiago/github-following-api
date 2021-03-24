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

buttonElement.onclick = async function search() {
	loadingElement.classList.add('reveal')

	if (!shouldLoadMore) {
		page = 1
		list = ''
	}

	if (inputElement.value === '') {
		loadingElement.classList.remove('reveal')
		infoTextElement.classList.add('reveal')
		infoTextElement.innerHTML = 'Digite um nome de usuário!'
		return
	}

	const users = await getUsersFromApi(inputElement.value.toLowerCase(), page)
	if (users === null) {
		loadingElement.classList.remove('reveal')
		infoTextElement.classList.add('reveal')
		infoTextElement.innerHTML = 'Usuário não encontrado!'
		return
	}

	users.map(user => {
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
	shouldLoadMore = false
}

function loadMore() {
	page++
	shouldLoadMore = true
	document.querySelector('.search-button').click()
}
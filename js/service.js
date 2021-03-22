async function getUsersFromApi(username, page) {
	const response = await fetch(`https://api.github.com/users/${username}/following?per_page=100&page=${page}`)
	return response.json()
}
async function getUsersFromApi(username, page) {
	const response = await fetch(`https://api.github.com/users/${username}/following?per_page=4&page=${page}`)
	if (response.status !== 200) return null
	return response.json()
}
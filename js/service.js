async function getUsersFromApi(username, page) {
	const response = await fetch(`https://api.github.com/users/${username}/following?per_page=12&page=${page}`)
	if (response.status !== 200) return
	return response.json()
}
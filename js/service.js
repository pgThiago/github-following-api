export default async function getUsersFromApi(username) {
    const response = await fetch(`https://api.github.com/users/${username}/following`);
    return response.json();
}

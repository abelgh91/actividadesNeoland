export const updateToken = () => {
    const user = localStorage.getItem('user');  // nos traemos el user del localstorage y lo parseamos
    if (user) {
        const parseUser = JSON.parse(user)
        return parseUser.token; // nos traemos solamente el apartado del token
    }
}
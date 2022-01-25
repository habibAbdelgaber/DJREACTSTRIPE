function login(token) {
    const user = {
        token: token
    }
    localStorage.setItem('user', JSON.stringify(user))
    // console.log(user)
    return user
}

function logout() {
    localStorage.removeItem('user')
}


function isLoggedIn() {
    const user = localStorage.getItem('user')
    return user !== null
}


function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

export const authService = {
    login,
    logout,
    isLoggedIn,
    getUser
}
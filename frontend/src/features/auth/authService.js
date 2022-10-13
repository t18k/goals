import axios from 'axios'

const API_URL = 'http://localhost:8000/api/users'

// Register User
const register = async (userData) => {
    // make post request with userData
    const response = await axios.post(API_URL, userData)

    // token stored as 'user' in localStorage
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login User
const login = async (userData) => {
    // make post request with userData
    const response = await axios.post(API_URL + '/login', userData)

    // token stored as 'user' in localStorage
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// LogOut User
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService
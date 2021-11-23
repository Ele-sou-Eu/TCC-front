import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'x-access-token': localStorage.getItem('@token')
    },
    timeout: 600
})

api.interceptors.response.use(
    (response) => response,
    error => {
        if(error.response.status === 401){
            localStorage.removeItem('@token')
            location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
import axios from 'axios'

user_request = document.getElementById("user_request");

const api = axios.create({
    baseURL: "http://localhost:8000/api/request"
});


export default api;
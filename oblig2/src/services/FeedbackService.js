import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getFeedbacks() {
        return API.get('/feedbacks')
    },
    getFeedback(id) {
        return API.get('/feedbacks/' + id)
    },
    postFeedback(feedback) {
        return API.post('/feedbacks', feedback)
    }
}
import axios from 'axios'
import { API_URL } from '../config'

export const createUser = user => {
    return axios
        .post(`${API_URL}/users`, user)
}
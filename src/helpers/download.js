import axios from 'axios'
import { API_URL } from '../config'

export const getDownloadInfo = (id) => {
    const url = `${API_URL}/posts/${id}`

    return axios.get(url)
}
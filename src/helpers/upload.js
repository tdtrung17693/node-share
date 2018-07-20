import axios from 'axios'
import { API_URL } from '../config'

export const upload = (form, cb = () => {}) => {
    const url = `${API_URL}/upload`
    let data = new FormData()

    form.files.forEach(file => {
        data.append('files', file)
    })

    data.append('to', form.to)
    data.append('from', form.from)
    data.append('message', form.message)

    const config = {
        onUploadProgress: ev => {
            return cb({
                type: 'onUploadProgress',
                payload: ev
            })
        }
    }

    axios.post(url, data, config)
        .then(response => {
            return cb({
                type: 'success',
                payload: response.data
            })
        })
        .catch(err => {
            return cb({
                type: 'error',
                payload: err
            })
        })
}
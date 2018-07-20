const production = process.env.NODE_ENV === 'production'

export const API_URL = production
    ? '/api' : 'http://localhost:3000/api'

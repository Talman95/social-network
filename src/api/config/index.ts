import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'API-KEY': 'bbb527b3-6bec-4c67-abf9-15d3ea5311d5'
    },
})
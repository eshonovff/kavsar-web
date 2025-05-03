import axios from "axios";
console.log("API_URL =>", import.meta.env.VITE_APP_API_URL);



export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
    
})

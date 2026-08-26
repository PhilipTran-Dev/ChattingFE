// import axios from "axios";
// // export const baseURL = "http://localhost:8080";
// export const baseURL = "http://ec2-18-138-228-181.ap-southeast-1.compute.amazonaws.com:8080";


// export const HttpClient = axios.create({
//     baseURL: baseURL,
// });

import axios from "axios";

export const baseURL = import.meta.env.VITE_BACKEND_URL || "http://192.168.1.9:8080";

export const HttpClient = axios.create({
    baseURL: baseURL,
});
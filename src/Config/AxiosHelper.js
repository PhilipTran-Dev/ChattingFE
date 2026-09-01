import axios from "axios";

export const SERVERS = {
    LOCAL: "http://192.168.1.9:8080",
    VPS: "http://ec2-18-141-169-207.ap-southeast-1.compute.amazonaws.com:8080",
    AWS: "",
};

const ACTIVE_SERVER = import.meta.env.VITE_ACTIVE_SERVER || "AWS";

export const baseURL = import.meta.env.VITE_BACKEND_URL !== undefined
    ? import.meta.env.VITE_BACKEND_URL
    : (SERVERS[ACTIVE_SERVER] ?? "");

export const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
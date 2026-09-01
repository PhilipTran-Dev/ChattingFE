import axios from "axios";

export const SERVERS = {
    LOCAL: "http://192.168.1.9:8080",
    VPS: "http://ec2-18-141-169-207.ap-southeast-1.compute.amazonaws.com:8080",
    AWS: "http://18.141.169.207",
};

const ACTIVE_SERVER = import.meta.env.VITE_ACTIVE_SERVER || "AWS"; // "LOCAL" | "VPS" | "AWS"

export const baseURL = SERVERS[ACTIVE_SERVER] || SERVERS.AWS;

export const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
import axios from "axios";
import { getSessionUser } from "./session-service";
import AppConfig from "../config.json";


const createClient = () =>{
    const user = getSessionUser();
    let token = null;
    let authHeader = null;
    if(user != null){
        token = user.token;
        authHeader = "Bearer " + token;
    }
    
    return axios.create({
        baseURL:AppConfig.config.api,
        // baseURL:"https://itireland.onrender.com",
        // baseURL:"http://localhost:8080",

        headers:{
            Authorization:authHeader,
        }
    })
}

const createUploadClient = () =>{
    const user = getSessionUser();
    let token = null;
    let authHeader = null;
    if(user != null){
        token = user.token;
        authHeader = "Bearer " + token;
    }
    
    return axios.create({
        // baseURL:"https://itireland.herokuapp.com",
        // baseURL:"https://itireland.onrender.com",
        baseURL:AppConfig.config.api,

        headers:{
            Authorization:authHeader,
            "Content-Type": "multipart/form-data"
        }
    })
}

export {createUploadClient};

export default createClient;


import { AxiosRequestConfig } from "axios";
import createClient from "./api-client";

export interface Response<T> {
    status:number;
    message:string;
    data:T;
    totalPages:number;
    totalElements:number;
    page:number;
}

export interface Entity {
    id: number;
  }

class HttpService<T>{
    endpoint : string;

    constructor(endpoint:string){
        this.endpoint = endpoint;
    }

    get = (requestConfig?:AxiosRequestConfig) => {
        return createClient().get<Response<T>>(this.endpoint,{...requestConfig})
                                .then(resp=>resp.data.data)
    }

    getById = (id:string | undefined) => {
        return createClient().get<Response<T>>(this.endpoint+"/"+id)
                                .then(resp=>resp.data.data)
    }

    getAllResponse = (requestConfig?:AxiosRequestConfig) =>{
        return createClient().get<Response<T[]>>(this.endpoint,{...requestConfig})
                                .then(resp=>resp.data)
    }

    getAll = (requestConfig?:AxiosRequestConfig) =>{
        return createClient().get<Response<T[]>>(this.endpoint,{...requestConfig})
                                .then(resp=>resp.data.data)
    }

    post = (entity : T) =>{
        return createClient().post<Response<T>>(this.endpoint, entity)
                                .then(resp=>resp.data.data)
    }

    delete = <T extends Entity>(entity: T) => {
        return createClient()
        .delete<Response<null>>(this.endpoint+"/"+entity.id)
            .then(resp=>resp.data)

    }

    update<T extends Entity>(entity : T){
        return createClient().patch<Response<T>>(this.endpoint + "/" +entity.id, entity)
                                .then(resp=>resp.data.data)
    }
}

 const APIClient =  <T>(endpoint : string) => new HttpService<T>(endpoint); 
 export default APIClient;

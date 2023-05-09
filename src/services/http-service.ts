import { AxiosRequestConfig } from "axios";
import createClient from "./api-client";

export interface Response<T> {
    status:number;
    message:string;
    data:T[];
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
    
    create(entity : T){
        return createClient().post(this.endpoint, entity)

    }

    get(requestConfig?:AxiosRequestConfig){
        return createClient().get(this.endpoint,{...requestConfig})
    }

    delete<T extends Entity>(entity: T){
        return createClient()
        .delete(this.endpoint+"/"+entity.id)

    }

    update<T extends Entity>(entity : T){
        return createClient().patch(this.endpoint + "/" +entity.id, entity)
    }
}

 const create =  <T>(endpoint : string) => new HttpService<T>(endpoint); 
 export default create;

import {useState , useEffect} from "react"
import axios from " axios" ;
import { BACKEND_URL } from "../config";

export interface Blog {
    "content " : string ;
    "title " : string ;
    "id" : number ;
    "author" : {
        "name " : string
    }
}

export const useBlog = ({id} : {id : string}) => {
    const [loading , setloading] =useState(true);
    const [blog , setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`{$BACKEND_URL}/api/v1/blog/${id}`,{
            headers : {
                Auhorisation : localStorage.getItem("token")

            }
        })
        .then (response => {
            setBlog (response.data.blog);
            setloading(false );

        })
    },[id])
    return{
        loading,
        blog
    }
}
import { useContext,useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { User } from "../context/User"
import axios, { axiosPrivate } from "../api/axios"
export default function Google1(){
const {newUser,setNewUser}=useContext(User)
const {at}=useParams()
//setNewUser({...newUser,"accessToken":at})
console.log(at)
useEffect(()=>{
    const fe=async ()=>{
    const re=await axiosPrivate.post('/google/get',{"refreshToken":at})
    const d={"username":re.data?.username,"userid":re.data?._id,"email":re.data?.email,"accessToken":re.data?.pwd}
    setNewUser(d)
    console.log(re)}
    fe()
    console.log(newUser)
},[])




  //console.log(someCookieValue)
    return(<>m<br/>
    m<br/>m<br/>m<br/>m<br/>m<br/>

    
    </>)
}
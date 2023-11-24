import { useContext,useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { User } from "../context/User"
import axios, { axiosPrivate } from "../api/axios"
import { useLocation } from 'react-router-dom';

export default function Google1(){
  const { search } = useLocation();
  const params = new URLSearchParams(search);
const {newUser,setNewUser}=useContext(User)
const at=params.get('at');
localStorage.setItem('at', at);
console.log(at)
const [data, setData] = useState('');

const storedData = localStorage.getItem('yourDataKey');
if (storedData) {
  setData(storedData);
}
//setNewUser({...newUser,"accessToken":at})
console.log(at)
useEffect(()=>{
    const fe=async ()=>{
    const re=await axiosPrivate.post('/google/get',{"refreshToken":at})
    const d={"username":re.data?.username,"userid":re.data?._id,"email":re.data?.email,"otoken":re.data?.refreshToken}
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
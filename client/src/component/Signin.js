import { User } from "../context/User"
import { useContext } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { addClient, addUser, getEmp, verifyUser } from "../api/api"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loader from "./Loader";
import Google from "./Google";
import { ToastContainer,toast } from "react-toastify";
export default function Signin(){
  const [col,setCol]=React.useState('gray')
  const {newUser,setNewUser}=useContext(User)
const [login,setLogin]=React.useState({"email":"","pwd":""})
const { setAuth } = useAuth();
  const navigate = useNavigate();
const [load,setLoad]=React.useState(0)
const [stat,setStat]=React.useState('')


var at;
const axiosPrivate=useAxiosPrivate()
  async function hand(){
    const res= await axiosPrivate.put(`/user1/update`
    )
  console.log(res)
  at=res?.data?.accessToken;
  console.log(at)




  }
  async function handleSubmit(){
    setLoad(1)
   const res= await verifyUser(login)
   setLoad(0)
   console.log(res)
   //setStat(res.response.)
   if(res?.response?.status===400||res?.response?.status===401||res?.response?.status===403||res?.response?.status===404||res?.response?.status===500){
    setStat('Error Credentials')
    console.log("cbxnbznvbnbv")
    console.log(res.response.data.message)
    toast(res.response.data.message)
        }
   if(res.status==200||res.status==201||res.status==202){
    toast('Login Success! Redirecting...')
    console.log(res)
    const accessToken = res?.data?.accessToken;
            const roles = res?.data?.roles;
            const tm=res?.data
            setNewUser({ "email":login.email,"pwd":login.pwd,roles, accessToken,"picture":tm?.picture,'username':tm.username,'userid':tm.userid });
            setTimeout(() => {
              navigate('/post')
            }, 2000);
           
         }else{
          toast(res.response.data)
         }
  
  }
  

  async function  handleChange(event){
    setLogin(old=>{
      return({
        ...old,
        [event.target.name]:event.target.value
      })
    })
    console.log(login)
  //   console.log(await addUser({
  //     "email":newUser.email
  // }
  // ))
//   const t=await addUser({
//     "email":newUser.email
// }
// )


  }
    return(<>
    <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-white">
       Create Account Now
      
      </h1>
      <p className="leading-relaxed mt-4">
        Join Us Today
      </p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-white text-lg font-medium title-font mb-5">
        Sign In
      </h2>
 
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-400">
          Email
        </label>
        <input
        onChange={handleChange}
          type="email"
          id="email"
          name="email"
          value={login.email}
          className={`w-full bg-${col}-600 bg-opacity-20  focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-400">
          Password
        </label>
        <input
        onChange={handleChange}
          type="password"
          id="pwd"
          name="pwd"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button onClick={handleSubmit}className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
        Sign In
      </button>
      
      {load===1&&<Loader/>}
      <div>{stat}</div>
      <ToastContainer />
      <Google/>
      <p className="text-l mt-3">
       Please wait while we let you in!!
      </p>
    </div>
  </div>
</section>
</>)
}
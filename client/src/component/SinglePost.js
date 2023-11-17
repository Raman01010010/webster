import axios from "../api/axios";
import React, { useState, useEffect ,useContext} from "react";
import {Reactions,Counter} from "./Reactions";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';

//const url="http://localhost:3500/"
import { SlackCounter }from '@charkour/react-reactions';
import { ReactionBarSelector } from '@charkour/react-reactions';
import Test from "./Test";
import { User } from "../context/User";
import Loader from "./Loader";
const url="http://localhost:3500/"
//const url="http://172.29.50.69:3500/"
const FilePreview = ({ fileList }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex justify-center">
      {fileList?.map((file, index) => (
        <div key={index} className="relative group">
          {file.match(/\.(jpeg|jpg|gif|png)$/) ? (
            <img src={file} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
          ) : file.match(/\.(mp4|webm|ogg)$/) ? (
            <video controls className="w-full h-full object-cover rounded-md">
              <source src={file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
           
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
                         <p className="text-gray-600">File Preview {index + 1}</p>

            </div>
          )}
           <a href={file}> 
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <p className="text-white">Preview {index + 1}</p>
          </div>
          </a>
        </div>
       
      ))}
    </div>
  );
};
function SinglePost() {
    const axiosPrivate=useAxiosPrivate()
    const [item,setItem]=useState({});
    const [like,setLike]=useState({"id":"","react":{"emoji":"","by":""}})
const [load,setLoad]=React.useState(0)
const {newUser}=useContext(User)
    let { id } = useParams();
    useEffect(()=>{
        const fetchPost=async()=>{
            try{
                const res=await axiosPrivate.post(`/post/getone`,{"id":id});
                setItem(res.data);
                console.log(res)
                //setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        fetchPost();
    },[id])
    async function handleSelect(item, key) {
        console.log(6565);
        console.log(key);
        console.log(item);
      
        // Use the updated state returned by setLike
        const updatedLike = {"id": item._id, "react": {"emoji": key, "by": newUser.email}};
        setLike(updatedLike);
      
        console.log(updatedLike);
      
        const res = await axiosPrivate.post('/post/react', updatedLike);
        console.log(res);
      }
    
  // function body here
  return(<>
  
<div style={{paddingTop:'15vh'}} className=" bg-gray-900 p-4 md:w-full  w-full">
    <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
    <div className=" p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              {item.email}
            </h2>
            <h1 className="title-font text-lg font-medium text-white mb-3">
                {item.head}
            </h1>
            <p className="leading-relaxed mb-3">
                {item.content}
            </p>
            <ul className="flex flex-wrap text-xs font-medium -m-1">
                      {item.hashtag?.map(it=>{
                        return(<><li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">{it}</a>
                      </li></>)
                      })}
                      
                     
                    </ul>
                  
        </div>
        <FilePreview fileList={item.file}/>
        <div className="flex justify-center p-6">
                    
                    <SlackCounter  counters={item.react}/>
               <br/>
                    <ReactionBarSelector iconSize={15}  onSelect={(key)=>handleSelect(item,key)} reactions={[{label: "👍", node: <div>👍</div>, key: "👍"},{label: "🎉", node: <div>🎉</div>, key: "🎉"},{label: "🎊", node: <div>🎊</div>, key: "🎊"},{label: "💓", node: <div>💓</div>, key: "💓"}]} />
             
                  </div>
                  <br/>
                 <div className="flex justify-center"> <Test id={item._id}/></div>
    </div>
</div>

  </>)
}

export default SinglePost;

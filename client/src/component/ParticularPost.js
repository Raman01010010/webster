import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Reactions,Counter} from "./Reactions";
import { SlackCounter }from '@charkour/react-reactions';
import { ReactionBarSelector } from '@charkour/react-reactions';
import Test from "./Test";
//step1
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const url="http://localhost:3500/"

const FilePreview = ({ fileList }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {fileList.map((file, index) => (
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
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <p className="text-white">Preview {index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ParticularPost = () => {

//step2
  const axiosPrivate=useAxiosPrivate()
  const {email} = useParams()
  

    console.log(email);

const [re,setRe]=useState("")
const [posts, setPosts] = useState([]);
const [show,setShow]=useState(1)

const [like,setLike]=useState({"id":"","react":{"emoji":"","by":""}})

async function handle(item){
    console.log("hidfj")
  
console.log(re)
    console.log(item._id)
    setLike({"id":item._id,"react":re})


  
  
}
async function handle1(){
  console.log("hidfj")
 //step3
  const res=await axiosPrivate.post('/post/react',like)
  console.log(res)
  console.log(like)
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const d = {
            email:email
        }
        //step4
        const response = await axiosPrivate.post('/getpost',d);
        setPosts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      console.log(posts) 
    };

    fetchData();
  }, []);





  async function handleSelect(item, key) {
    console.log(6565);
    console.log(key);
    console.log(item);
  
    const updatedLike = {"id": item._id, "react": {"emoji": key, "by": 'rmnprj@outlook.com'}};
    setLike(updatedLike);
  
    console.log(updatedLike);
  
    const res = await axiosPrivate.post('/post/react', updatedLike);
    console.log(res);
  }
  
  return (
    <>
   
   <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto">
            <div style={{width:"100vh"}} className="flex flex-wrap mr-auto ml-auto  -m-4">

    {posts.map(item=>{
      return(<>
  
<div className=" bg-gray-900 p-4 md:w-full  w-full">
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
                    
                    <SlackCounter counters={item.react}/>
               <br/>
                    <ReactionBarSelector iconSize={15}  onSelect={(key)=>handleSelect(item,key)} reactions={[{label: "👍", node: <div>👍</div>, key: "👍"},{label: "🎉", node: <div>🎉</div>, key: "🎉"},{label: "🎊", node: <div>🎊</div>, key: "🎊"},{label: "💓", node: <div>💓</div>, key: "💓"}]} />
             
                  </div>
                  <br/>
                 <div className="flex justify-center"> <Test id={item._id}/></div>
    </div>
</div>


</>)})}
</div></div>
</section>

   
    </>
  );
}

export default ParticularPost

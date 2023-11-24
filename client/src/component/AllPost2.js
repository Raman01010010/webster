import axios from "../api/axios";
import React, { useState, useEffect ,useContext} from "react";
import {Reactions,Counter} from "./Reactions";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

//const url="http://localhost:3500/"
import { SlackCounter }from '@charkour/react-reactions';
import { ReactionBarSelector } from '@charkour/react-reactions';
import Test from "./Test";
import { User } from "../context/User";
const url="http://localhost:3500/"
const FilePreview = ({ file }) => {
  return (
    <div className="mb-2">
 
    </div>
  );
};

const PostPreview = ({ post }) => {
  const { heading, content, file } = post;
console.log(post)
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md mb-4">
      <h2 className="text-2xl font-bold mb-2">{heading}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
      {file.map((file, index) => (
        <FilePreview key={index} file={file} />
      ))}
    </div>
  );
};


 // Import the PostPreview component

const YourMainComponent = () => {



    const axiosPrivate=useAxiosPrivate()
    const [re,setRe]=useState("")
    const [posts, setPosts] = useState([]);
   const [show,setShow]=useState(1)
  //console.log(extractedHashtags)
  const [like,setLike]=useState({"id":"","react":{"emoji":"","by":""}})
  const {newUser}=useContext(User)
  async function handle(item){
      console.log("hidfj")
      //console.log(show)
    //  console.log(re)
  console.log(re)
      console.log(item._id)
      setLike({"id":item._id,"react":re})
  
  
      // })
    
  }
  async function handle1(){
    console.log("hidfj")
    //console.log(show)
  //  console.log(re)
  
  
    const res=await axiosPrivate.post('/post/react',like)
    console.log(res)
    console.log(like)
    // setShow(old=>{
    //     return(!old)
    // })
  
  }
  //console.log("HIHIIHI")
  
    useEffect(() => {
      // Use an async function within the effect
      const fetchData = async () => {
        try {
          const a=newUser.email
          const response = await axiosPrivate.post('/post/all',newUser);
          setPosts(response.data);
          console.log(response.data)
          // Assuming the response is an array of post objects
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
        console.log(posts) 
      };
  
      fetchData(); // Call the async function
    }, []);
  
  
  
  
  
    async function handleSelect(item, key) {
      console.log(6565);
      console.log(key);
      console.log(item);
    
      // Use the updated state returned by setLike
      const updatedLike = {"id": item._id, "react": {"emoji": key, "by": 'rmnprj@outlook.com'}};
      setLike(updatedLike);
    
      console.log(updatedLike);
    
      const res = await axiosPrivate.post('/post/react', updatedLike);
      console.log(res);
    }
  
  // Assuming you have an array of posts
 

  return (
    <div>
      {/* Render PostPreviews for each post in the array */}
      {posts.map((post, index) => (
        <PostPreview key={index} post={post} />
      ))}
    </div>
  );
};

export default YourMainComponent;

import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import {Reactions,Counter} from "./Reactions";
//const url="http://localhost:3500/"
import { SlackCounter }from '@charkour/react-reactions';
import { ReactionBarSelector } from '@charkour/react-reactions';
import Test from "./Test";
const url="http://172.29.50.69:3500/"

export default function AllPost() {
  const [re,setRe]=useState("")
  const [posts, setPosts] = useState([]);
 const [show,setShow]=useState(1)
//console.log(extractedHashtags)
const [like,setLike]=useState({"id":"","react":{"emoji":"","by":""}})

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


  const res=await axios.post('/post/react',like)
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
        const response = await axios.get('/post/all');
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
  
    const res = await axios.post('/post/react', updatedLike);
    console.log(res);
  }
  
  return (
    <>
    <div style={{height:"12vh"}}></div>
      <div>
     
        <div>

{posts.map(item=>{
    const sr=`${url}${item.picture}`
    return(<>
     <section className="flex flex-col justify-center antialiased bg-gray-900 text-gray-200 ">
          <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
            {/* Blog post */}
            <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
              <a className="relative block group" href="#0">
                <div className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true" />
                <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                  <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={sr} width={540} height={303} alt="Blog post" />
                </figure>
              </a>
              <div>
                <header>
                  <div className="">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      {item.hashtag?.map(it=>{
                        return(<><li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">{it}</a>
                      </li></>)
                      })}
                      
                     
                    </ul>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight ">
                    <a className="hover:text-gray-100 transition duration-150 ease-in-out" href="#0">{item.head}</a>
                  </h3>
                </header>
                <p className="text-lg text-gray-400 flex-grow">{item.content}</p>
                <Test id={item._id}/>
                <footer className="flex items-center mt-4">
                  <a href="#0">
                    <img className="rounded-full flex-shrink-0 mr-4" src="https://preview.cruip.com/open-pro/images/news-author-04.jpg" width={40} height={40} alt="Author 04" />
                  </a>
                  <div>
                    <a className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">{item.email}</a>
                    <span className="text-gray-700"> - </span>
                    <span className="text-gray-500">{item.time}</span>
                    <SlackCounter counters={item.react}/>
                  
                  </div>
              
                  <ReactionBarSelector  onSelect={(key)=>handleSelect(item,key)} reactions={[{label: "👍", node: <div>👍</div>, key: "👍"},{label: "🎉", node: <div>🎉</div>, key: "🎉"},{label: "🎊", node: <div>🎊</div>, key: "🎊"},{label: "💓", node: <div>💓</div>, key: "💓"}]} />
             
                </footer>
                
              </div>
            </article>
          </div>
        </section></>)
})}



       
        {/* More components */}
       
      </div>
      </div>
    </>
  );
}

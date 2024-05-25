import axios from "../api/axios";
import React, { useState, useEffect, useContext } from "react";
import { Reactions, Counter } from "./Reactions";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import NavigationIcon from "@mui/icons-material/Navigation";
//const url="http://localhost:3500/"
import { FacebookCounter, GithubCounter, SlackCounter } from "@charkour/react-reactions";
import { ReactionBarSelector } from "@charkour/react-reactions";
import Test from "./Test";
import { User } from "../context/User";
import Loader from "./Loader";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const url = "http://localhost:3500/";
//const url="http://172.29.50.69:3500/"
const FilePreview = ({ fileList }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex justify-center">
      {fileList.map((file, index) => (
        <div key={index} className="relative group">
          {file.match(/\.(jpeg|jpg|gif|png)$/) ? (
            <img
              src={file}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
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
export default function AllPost() {
  const axiosPrivate = useAxiosPrivate();
  const [re, setRe] = useState("");
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(1);
  //console.log(extractedHashtags)
  const [like, setLike] = useState({ id: "", react: { emoji: "", by: "" } });
  const [load, setLoad] = React.useState(0);
  const { newUser } = useContext(User);
  async function handle(item) {
    console.log("hidfj");
    //console.log(show)
    //  console.log(re)
    console.log(re);
    console.log(item._id);
    setLike({ id: item._id, react: re });

    // })
  }
  async function handle1() {
    console.log("hidfj");
    //console.log(show)
    //  console.log(re)

    const res = await axiosPrivate.post("/post/react", like);
    console.log(res);
    console.log(like);
    // setShow(old=>{
    //     return(!old)
    // })
  }
  //console.log("HIHIIHI")
  const [page, setPage] = useState(1);
  useEffect(() => {
    // Use an async function within the effect
    const fetchData = async () => {
      try {
        const a = newUser.email;
        setLoad(1);
        const response = await axiosPrivate.post("/post/all", {
          ...newUser,
          page: page,
        });
        setPosts((old) => {
          return [...old, ...response.data];
        });
        setLoad(0);
        console.log(response.data);
        // Assuming the response is an array of post objects
      } catch (error) {
        console.error("Error fetching posts:", error);
      }

      console.log(posts);
    };

    fetchData(); // Call the async function
  }, [page]);

  async function handleSelect(item, key) {
    console.log(6565);
    console.log(key);
    console.log(item);

    // Use the updated state returned by setLike
    const updatedLike = {
      id: item._id,
      react: { emoji: key, by: newUser.email },
    };
    setLike(updatedLike);
    setPosts((old) => {
      return old?.map((it) => {
        if (it._id === item._id) {
          // Check if the user has already reacted with the same emoji
          const existingReactionIndex = it.react.findIndex(reaction => reaction.by === newUser.email && reaction.emoji === key);
    
          if (existingReactionIndex !== -1) {
            // Remove the existing reaction if found
            const updatedReactions = [...it.react];
            updatedReactions.splice(existingReactionIndex, 1);
            return { ...it, react: updatedReactions };
          } else {
            // Check if the user has reacted with a different emoji
            const otherReactionIndex = it.react.findIndex(reaction => reaction.by === newUser.email);
    
            if (otherReactionIndex !== -1) {
              // Remove the existing reaction if found
              const updatedReactions = [...it.react];
              updatedReactions.splice(otherReactionIndex, 1);
              return { ...it, react: [...updatedReactions, { emoji: key, by: newUser.email }] };
            } else {
              // Add the new reaction
              return { ...it, react: [...it.react, { emoji: key, by: newUser.email }] };
            }
          }
        }
        return it;
      });
    });
    
    
    
    
    console.log(updatedLike);

    const res = await axiosPrivate.post("/post/react", updatedLike);
    console.log(res);
  }

  const [hash, setHash] = useState("");

  async function handSearch() {
    try {
      const res = await axiosPrivate.post("/post/search", {
        ...newUser,
        hashtags: hash,
      });
      setPosts(res?.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-24 mx-auto">
          <Link to="/cpost">
            <Fab
              color="primary"
              aria-label="add"
              // onClick={handleFilterDialogOpen}
              sx={{
                position: "fixed",
                bottom: "20px", // Adjust the bottom value as needed
                left: "20px", // Adjust the right value as needed
              }}
            >
              <i class="fa-solid fa-plus"></i>      </Fab>
          </Link>
          <div
            style={{ width: "100vh" }}
            className="flex flex-wrap mr-auto ml-auto  -m-4"
          >
            {load===1&& <Loader />}
            {posts.map((item) => {
              return (
                <>
                  <div className="  p-4 md:w-full  w-full">
                    <a 
                  //  href={`/post1/${item._id}`}
                    >
                      <div className="h-full bg-[#1C1678] border-2 border-gray-800 rounded-lg ">
                        <div className=" p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                          {item.email.split('@')[0]}
                          </h2>
                          <h1 className="title-font text-lg font-medium text-white mb-3">
                            {item.head}
                          </h1>
                          <p className="leading-relaxed mb-3">{item.content}</p>
                          <ul className="flex flex-wrap text-xs font-medium -m-1">
                            {item.hashtag?.map((it) => {
                              return (
                                <>
                                  <li className="m-1">
                                    <a
                                      className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                                      href="#0"
                                    >
                                      {it}
                                    </a>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                        <FilePreview fileList={item.file} />
                      
                        <br />
                       
                       
                        <div className="bg-white  flex justify-between w-[100%] mx-4px">
                          {" "}
                         
                    <div className="mt-[4px]">
                          <GithubCounter counters={item.react}/>
                          </div>
                          <ReactionBarSelector
                            iconSize={25}
                            onSelect={(key) => handleSelect(item, key)}
                            reactions={[
                              { label: "👍", node: <div>👍</div>, key: "👍" },
                              { label: "🎉", node: <div>🎉</div>, key: "🎉" },
                              { label: "🎊", node: <div>🎊</div>, key: "🎊" },
                              { label: "💓", node: <div>💓</div>, key: "💓" },
                            ]}
                          />
                          <Test id={item._id} />
                          <Link to={`/post1/${item._id}`}>
                          <button>
                            View Post
                          </button>
                          </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                </>
              );
            })}

            <div className="flex flex-wrap ml-auto mr-auto">
              <Fab
                onClick={() => {
                  setPage((old) => {
                    return old + 1;
                  });
                }}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div>
            <Fab
              sx={{
                position: "fixed",
                bottom: "20px", // Adjust the bottom value as needed
                right: "20px",
                color: "success.main", // Adjust the right value as needed
              }}
              variant="extended"
            >
              <input
                onChange={(e) => {
                  setHash(e.target.value);
                }}
                type="text"
              ></input>
              <NavigationIcon onClick={handSearch} sx={{ mr: 1 }} />
            </Fab>
          </div>
        </div>
      </section>
    </>
  );
}

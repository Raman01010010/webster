import React, { useState } from 'react';
import axios from '../api/axios';
import { useContext } from 'react';
import { User } from '../context/User';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const CommentSection = (props) => {
  const axiosPrivate=useAxiosPrivate()
  const {newUser}=useContext(User)
    console.log(props)
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    const tm={"text":e.target.value,"user":newUser.userid,"postId":props.id}
    setComment(tm);
    console.log(comment)
  };

  const handleCommentSubmit = async() => {
    if (comment?.text?.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
try{
      const res=await axiosPrivate.post('/post/com',comment)
      console.log(res)
    }catch(error){
      console.log(error)
    }
    }
  };


  React.useEffect(()=>{
    const get=async()=>{
try{
const res=await axiosPrivate.post('/post/get',{"postId":props.id})
setComments(res?.data)
console.log(res)
}catch(error){
    console.log(error)
}}
get()
  },[])

  return (
    <div style={{marginLeft:"2vh" ,height:"50vh"}} className="w-full  max-w-md z-20 mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4" >
        <h2 className="text-xl font-semibold">Comments</h2>

        {/* Display existing comments */}
        <div className="comments" style={{ height: '28vh', overflowY: 'auto' }}>
          {comments.map((item,index) => (
            <div key={index} className="flex space-x-2 bg-[#7BC9FF] rounded-md m-2">
             <AccountBoxIcon/>
              <div className=''>
                <p className="text-gray-800 text-s font-semibold">{item?.user?.username}</p>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="comment-input flex space-x-2">
        <AccountBoxIcon sx={{ fontSize: 60 }}/>
          <div style={{display:"flex"}}>
            <textarea
            style={{height:"10vh"}}
              className="w-full p-2 border rounded"
              placeholder="Add your comment..."
              value={comment.text}
              onChange={handleCommentChange}
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;

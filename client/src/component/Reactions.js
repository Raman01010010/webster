import React from 'react';
import { ReactionBarSelector } from '@charkour/react-reactions';
import { SlackCounter }from '@charkour/react-reactions';
import { useContext } from 'react';
import { User } from "../context/User"
export const Reactions = (props) => {
  const {newUser}=useContext(User)
 //console.log(props)
  //console.log(newUser)
  function ram(){
  }
  function handleSelect(key){
   
   // console.log("fndx")
  
    //console.log("123445")
    props.set({"by":newUser.email,"emoji":key})
   // console.log("key")
   // console.log(key)
   console.log(props.k)
    props.api()
   
  }
  return <ReactionBarSelector onSelect={handleSelect} reactions={[{label: "like", node: <div>👍</div>, key: "like"},{label: "congrats", node: <div>🎉</div>, key: "congrats"},{label: "Celebrate", node: <div>🎊</div>, key: "Celebrate"},{label: "Love", node: <div>💓</div>, key: "Love"}]} />;
};


export  const Counter = () => {
  return <SlackCounter counters={[{
    emoji: '🗿', // String emoji reaction
    by: 'case', // String of persons name
  },{
    emoji: '🗿', // String emoji reaction
    by: 'case', // String of persons name
  },{
    emoji: '🗿', // String emoji reaction
    by: 'case', // String of persons name
  },{
    emoji: '🗿', // String emoji reaction
    by: 'case', // String of persons name
  },{
    emoji: 'M', // String emoji reaction
    by: 'case', // String of persons name
  }]} />;
};
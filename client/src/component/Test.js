import React from 'react';
import { useState } from 'react';
import CommentSection from './Comment';
import CommentIcon from '@mui/icons-material/Comment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
export default function Test(props){
function TranslucentPopup({ onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

const [isPopupVisible, setPopupVisible] = useState(false);

const openPopup = () => {
  setPopupVisible(true);
};

const closePopup = () => {
  setPopupVisible(false);
};

return (
  <div className=" items-center  justify-center">
    <button onClick={openPopup} className="bg-white w-[100%] text-gray-800 ">
      <CommentIcon fontSize='large'/>
      Comments
    </button>

    {isPopupVisible && (
      <TranslucentPopup >
        <div className="text-lg">
            <div onClick={closePopup}>Close</div>
        
         <CommentSection id={props.id}/>
        </div>
      </TranslucentPopup>
    )}
  </div>
);



}

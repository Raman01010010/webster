import React from 'react'
import Review from './Review'
const {data}=props;
const Review = (props) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

export default Review

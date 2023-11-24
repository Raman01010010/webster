import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Element, animateScroll as scroll, scroller } from 'react-scroll';
import img1 from "./pexels-buro-millennial-1438081.jpg";
import img2 from "./pexels-fauxels-3184430.jpg";
import 'animate.css/animate.css';

const Home2 = () => {
   
  const pageStyle = {
    background: 'linear-gradient(to right, violet, indigo)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    
    <div style={pageStyle}>
      <div className="text-center text-white p-4">
        <h1 className="text-6xl mb-8 font-bold">Welcome to the BE Bop</h1>
        <div className="space-x-4 mt-8">
          <Link to="/signin" className="text-white">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </Link>
          <Link to="/signup" className="text-white">
            <button className="border border-green-500 hover:bg-green-500 hover:text-white text-green-500 font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="space-y-8">
          <div className="flex items-center p-4 animate__animated animate__fadeInRight">
            <img src={img1} alt="Image 1" className="w-2/5 rounded-lg mr-4 animate__animated animate__slideInLeft" />
            <div className="flex-1">
              <h2 className="text-xl mb-4">
                Build your professional narrative seamlessly with our Resume Builder. Craft customized resumes, showcase your skills, and make a lasting impression. Elevate your career journey with ease and precision using our intuitive and powerful resume-building feature.
              </h2>
              <p>Data 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Data 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div className="flex items-center p-4 animate__animated animate__fadeInLeft">
            <div className="flex-1">
              <h2 className="text-xl mb-4">
                Connect face-to-face effortlessly with our Video Chat feature. Seamlessly conduct virtual meetings, interviews, or networking sessions. Experience the power of real-time communication, fostering meaningful connections in a digital world.
              </h2>
              <p>Data 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <img src={img2} alt="Image 2" className="w-2/5 rounded-lg ml-4 animate__animated animate__slideInRight" />
          </div>
          <div className="flex items-center p-4 animate__animated animate__fadeInRight">
            <img src={img1} alt="Image 3" className="w-2/5 rounded-lg mr-4 animate__animated animate__slideInLeft" />
            <div className="flex-1">
              <p>Data 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Data 5: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;

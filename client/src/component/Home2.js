import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import img1 from "./pexels-buro-millennial-1438081.jpg";
import img2 from "./pexels-fauxels-3184430.jpg";
import 'animate.css/animate.css';
import { useInView } from 'react-intersection-observer';

const Home2 = () => {
  const pageStyle = {
    background: 'linear-gradient(to right, violet, indigo)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const [ref1, inView1] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  const [isScrollingIn1, setIsScrollingIn1] = useState(true);
  const [isScrollingIn2, setIsScrollingIn2] = useState(true);
  const [isScrollingIn3, setIsScrollingIn3] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      const threshold1 = 200;
      const threshold2 = 400;
      const threshold3 = 850;

      if (offset < threshold1 && !isScrollingIn1) {
        setIsScrollingIn1(true);
      } else if (offset >= threshold1 && isScrollingIn1) {
        setIsScrollingIn1(false);
      }

      if (offset < threshold2 && !isScrollingIn2) {
        setIsScrollingIn2(true);
      } else if (offset >= threshold2 && isScrollingIn2) {
        setIsScrollingIn2(false);
      }

      if (offset < threshold3 && !isScrollingIn3) {
        setIsScrollingIn3(true);
      } else if (offset >= threshold3 && isScrollingIn3) {
        setIsScrollingIn3(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollingIn1, isScrollingIn2, isScrollingIn3]);

  return (
    <Element name="home2">
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
            <motion.div className="flex items-center p-4 animate__animated animate__fadeInRight">
              <motion.img
                ref={ref1}
                src={img1}
                alt="Image 1"
                className="w-2/5 rounded-lg mr-4"
                initial={{ opacity: 0, x: 50 }}
                animate={inView1 && isScrollingIn1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              />
              <div className="flex-1">
                <h2 className="text-xl mb-4">
                  Build your professional narrative seamlessly with our Resume Builder. Craft customized resumes, showcase your skills, and make a lasting impression. Elevate your career journey with ease and precision using our intuitive and powerful resume-building feature.
                </h2>
                <p>Data 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Data 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center p-4 animate__animated animate__fadeInLeft">
              <div className="flex-1">
                <h2 className="text-xl mb-4">
                  Connect face-to-face effortlessly with our Video Chat feature. Seamlessly conduct virtual meetings, interviews, or networking sessions. Experience the power of real-time communication, fostering meaningful connections in a digital world.
                </h2>
                <p>Data 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <motion.img
                ref={ref2}
                src={img2}
                alt="Image 2"
                className="w-2/5 rounded-lg ml-4"
                initial={{ opacity: 0, x: -50 }}
                animate={inView2 && isScrollingIn2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              />
            </motion.div>
            <motion.div className="flex items-center p-4 animate__animated animate__fadeInRight">
              <motion.img
                ref={ref3}
                src={img1}
                alt="Image 3"
                className="w-2/5 rounded-lg mr-4"
                initial={{ opacity: 0, x: 50 }}
                animate={inView3 && isScrollingIn3 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              />
              <div className="flex-1">
                <p>Data 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Data 5: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Home2;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const Profilepage = () => {
  const [activeTab, setActiveTab] = useState('description');
  const {email} = useParams(); 
  const [data,setData] = useState([]);

  useEffect(()=>{
    const fetchingData = async() => {
        const data = {
            email:email
        }
        const res = await axios.post('/fetchingdata',data);
        setData(res.data)
    } 
    fetchingData()
  },[])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'reviews':
        return (
          <div>
            <h2>Connections</h2>
            {/* Add your review content here */}


          </div>
        );
      case 'details':
        return (
          <div>
            <h2>Details</h2>
            {/* Add your detail content here */}


          </div>
        );
      default:
        return (
          <div>
            <h2>Description</h2>
            {/* Your existing description content */}
            <p className="leading-relaxed mb-4">
              Fam locavore kickstarter distillery...

            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Animated Night Hill Illustrations
              </h1>
              <div className="flex mb-4">
                <button
                  onClick={() => handleTabClick('description')}
                  className={`flex-grow text-indigo-500 border-b-2 ${
                    activeTab === 'description' && 'border-indigo-500'
                  } py-2 text-lg px-1`}
                >
                  Description
                </button>
                <button
                  onClick={() => handleTabClick('reviews')}
                  className={`flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 ${
                    activeTab === 'reviews' && 'text-indigo-500 border-indigo-500'
                  }`}
                >
                  Connections
                </button>
                <button
                  onClick={() => handleTabClick('details')}
                  className={`flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 ${
                    activeTab === 'details' && 'text-indigo-500 border-indigo-500'
                  }`}
                >
                 Skills
                </button>
              </div>
              {renderContent()}
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profilepage;

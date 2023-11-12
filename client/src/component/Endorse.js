import React from 'react';
import { useLocation } from 'react-router-dom';

const Endorse = () => {
  const location = useLocation();
  const { state } = location;

  // Check if data is defined and is an array
  const data = Array.isArray(state?.param1) ? state.param1 : [];

  return (
    <div>
      {data.length !== 0 ? (
        
          <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
          
            <div className="flex flex-wrap -m-2">
                 {
                    data.map((element)=>{
                        return(
                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div className="h-full flex items-center border-black-200 border p-4 rounded-lg bg-red-300">
                              <img
                                alt="team"
                                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                src="https://dummyimage.com/80x80"
                              />
                              <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">
                                  {element}
                                </h2>
                                <p className="text-gray-500">UI Designer</p>
                              </div>
                            </div>
                          </div>
                        )
                    })
                 }

            </div>
          </div>
        </section>
        
      ) : (
        <div>No endorsements available.</div>
      )}
    </div>
  );
};

export default Endorse;

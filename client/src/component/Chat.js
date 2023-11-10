import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";
import { Input } from 'react-chat-elements'
import io from 'socket.io-client';
import { useState,useEffect } from "react";

export default function Chat(){
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
      // Update isDesktop state when the window is resized
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 768);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return(<>
<section style={{ backgroundColor: "#CDC4F9" }}>
  <div className="container mx-auto sm:px-4 py-5">
    <div className="flex flex-wrap ">
      <div className="md:w-full pr-4 pl-4">
        <div
          className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300"
          id="chat3"
          style={{ borderRadius: 15 }}
        >
          <div className="flex-auto p-6">
            <div className="flex flex-wrap ">


                {isDesktop&&  <div id="desk" className=" h-3/4 overflow-scroll md:w-1/2 pr-4 pl-4 lg:w-2/5 pr-4 pl-4 xl:w-1/3 pr-4 pl-4 mb-4 md:mb-0">
                <div className="p-6">
                  <div className="relative flex items-stretch w-full rounded mb-3">
                    <input
                      type="search"
                      className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded rounded"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                    />
                    <span
                      className="input-group-text border-0"
                      id="search-addon"
                    >
                      <i className="fas fa-search" />
                    </span>
                  </div>
                  <div
                    data-mdb-perfect-scrollbar="true"
                    style={{ position: "relative", height: 400 }}
                  >
                    <ul className="list-unstyled mb-0">
                      <li className="p-2 border-b">
                        <a href="#!" className="flex justify-between">
                          <div className="flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar"
                                className="flex self-center me-3"
                                width={60}
                              />
                              <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 badge-dot" />
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Marie Horwitz</p>
                              <p className="text-xs text-gray-700">
                                Hello, Are you there?
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-gray-700 mb-1">
                              Just now
                            </p>
                            <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 rounded-full py-2 px-4 float-end">
                              3
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-b">
                        <a href="#!" className="flex justify-between">
                          <div className="flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar"
                                className="flex self-center me-3"
                                width={60}
                              />
                              <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-yellow-500 badge-dot" />
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Alexa Chung</p>
                              <p className="text-xs text-gray-700">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-gray-700 mb-1">
                              5 mins ago
                            </p>
                            <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 rounded-full py-2 px-4 float-end">
                              2
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-b">
                        <a href="#!" className="flex justify-between">
                          <div className="flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                alt="avatar"
                                className="flex self-center me-3"
                                width={60}
                              />
                              <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 badge-dot" />
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Danny McChain</p>
                              <p className="text-xs text-gray-700">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-gray-700 mb-1">
                              Yesterday
                            </p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-b">
                        <a href="#!" className="flex justify-between">
                          <div className="flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                alt="avatar"
                                className="flex self-center me-3"
                                width={60}
                              />
                              <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 badge-dot" />
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Ashley Olsen</p>
                              <p className="text-xs text-gray-700">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-gray-700 mb-1">
                              Yesterday
                            </p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-b">
                        <a href="#!" className="flex justify-between">
                          <div className="flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                alt="avatar"
                                className="flex self-center me-3"
                                width={60}
                              />
                              <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-yellow-500 badge-dot" />
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Kate Moss</p>
                              <p className="text-xs text-gray-700">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-gray-700 mb-1">
                              Yesterday
                            </p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2">
                        <a href="#!" className="flex justify-between">
                          <div className="flex flex-row">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar"
                                className="flex self-center me-3"
                                width={60}
                              />
                              <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 badge-dot" />
                            </div>
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Ben Smith</p>
                              <p className="text-xs text-gray-700">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-gray-700 mb-1">
                              Yesterday
                            </p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>}
            



              <div className=" md:w-1/2 pr-4 pl-4 lg:w-3/5 pr-4 pl-4 xl:w-2/3 pr-4 pl-4">
                
                <div
                  className="pt-3 pe-3"
               
                  style={{ position: "relative", height: 350 }}
                >
                    <div className="h-5/6 overflow-scroll">




                  <div className="flex flex-row justify-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="text-xs p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <p className="text-xs ms-3 mb-3 rounded-3 text-gray-700 float-end">
                        12:00 PM | Aug 13
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-end">
                    <div>
                      <p className="text-xs p-2 me-3 mb-1 text-white rounded-3 bg-blue-600">
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p className="text-xs me-3 mb-3 rounded-3 text-gray-700">
                        12:00 PM | Aug 13
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                  </div>
                  <div className="flex flex-row justify-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="text-xs p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                      <p className="text-xs ms-3 mb-3 rounded-3 text-gray-700 float-end">
                        12:00 PM | Aug 13
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style={{ width: 45, height: "100%" }}
                    />
                    <div>
                      <p
                        className="text-xs p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                      <p className="text-xs ms-3 mb-3 rounded-3 text-gray-700 float-end">
                        12:00 PM | Aug 13
                      </p>
                    </div>
                  </div>






                  </div>
                </div>
                <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-400">
          Password
        </label>
        <input
       // onChange={}
          type="password"
          id="pwd"
          name="pwd"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
        Send
      </button>
                <div className="text-gray-700 flex justify-start items-center pe-3 pt-3 mt-2">
              
                  
                </div>
              </div>
              <button>bdjbvbvxcb</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>)
}
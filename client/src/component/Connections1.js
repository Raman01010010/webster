import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams, useNavigate, Link } from "react-router-dom";

function Connections1() {
    const { email } = useParams();
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchingData = async () => {
            try {
                const d = {
                    email: email,
                };
                const res = await axiosPrivate.post("/connect/fetchingdata", d);
                setData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchingData();
    }, [email]);

    // console.log("skjdhskjdskjskjdshkj" , data)

    return (
        <div>

            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-auto rounded-xl bg-clip-border">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 mt-12 font-sans text-base font-normal text-blue-gray-700 mt-8">

                    {data.connection && data.connection.map((element, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/profilepage/${element}`)}
                            className="cursor-grab"
                            style={{ borderBottom: index !== data.connection.length - 1 ? '1px solid #e5e7eb' : 'none' }}
                        >
                            <div
                                role="button"
                                className="flex items-center w-full p-3 leading-tight mb-3 transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                            >
                                <div className="grid mr-4 place-items-center">
                                    <img
                                        alt="candice"
                                        src="https://docs.material-tailwind.com/img/face-1.jpg"
                                        className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                                    />
                                </div>
                                <div>
                                    <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                        {element}
                                    </h6>
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                        Software Engineer @ Material Tailwind
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}




                </nav>
            </div>

        </div>
    )
}

export default Connections1

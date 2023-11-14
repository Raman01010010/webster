import axios from '../api/axios';
import React, { useState ,useContext} from 'react';
import { User } from '../context/User';
export default function Post1() {
    const {newUser}=useContext(User)
    const [image, setImage] = useState('https://preview.cruip.com/open-pro/images/blog-post-01.jpg');
    const [postData, setPostdata] = useState({ "email":newUser.email,"head": "Heading", "content": "Content of the post", "hashtag": "" })
    const hashtagRegex = /#[a-zA-Z0-9_]+/g; 
 
//    const text="vbcnbvv #ram #sam"// Regular expression to match hashtags
 //     const extractedHashtags = text.match(hashtagRegex);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload= (e) => {
      setSelectedFile(e.target.files);
      const file = e.target.files[0];
      console.log(file)
      if (file) {
          const imageUrl = URL.createObjectURL(file[0]);
          setImage(imageUrl);
      }
    };
    function handleChange(e) {

        const newText = e.target.value; // Use innerText instead of textContent
        console.log(newText);
console.log(postData.content.match(hashtagRegex))
const extractedHashtags = postData.content.match(hashtagRegex);
setPostdata(old=>{
    return(
        {
            ...old,
            "hashtag":extractedHashtags
        }
    )
})
        setPostdata((old) => {
            return {
                ...old,
                [e.target.name]: newText,
            };
        });
        console.log(postData);
    }

   




    const handleUpload = () => {
        if (!selectedFile) {
          alert('Please select a file to upload.');
          return;
        }
 
        const text=postData.content// Regular expression to match hashtags
      
        const formData = new FormData();
        for (const file of selectedFile) {
          formData.append('files', file);
        }
    
        formData.append('json',JSON.stringify(postData))
    console.log(formData)
        axios
          .post('/upload/multiple', formData,postData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log('File uploaded successfully:', response.data);
            // Add any further processing or UI updates here
          })
          .catch((error) => {
            console.error('File upload failed:', error);
            // Handle errors and display an error message to the user
          });
      };



    return (<>
        <div>
            <section className="flex flex-col justify-center antialiased bg-gray-900 text-gray-200 min-h-screen">
                <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
                    {/* Blog post */}
                    <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                        <label className="relative block group" htmlFor="image-upload">
                            <div className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true" />
                            <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                                <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={image} alt="Blog post" />
                            </figure>
                        </label>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            className="hidden"
                            multiple
                            onChange={handleImageUpload}
                        />
                        <div>
                            <header>
                                <div className="mb-3">
                                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                                        <li className="m-1">
                                            <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">Product</a>
                                        </li>
                                        <li className="m-1">
                                            <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">Engineering</a>
                                        </li>
                                        <li className="m-1">
                                            <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">Engineering</a>
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                                    <input name="head" onChange={handleChange} className="hover:text-gray-900 transition duration-150 ease-in-out" href="#0"/>
                                </h3>
                            </header><br />
                            <textarea name="content" onChange={handleChange} className="text-lg bg-gray-100 text-gray-900 flex-grow">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</textarea>
                            <button onClick={handleUpload}className='bg-green-200'>UPLOAD</button>
                            <footer className="flex items-center mt-4">
                                
                                <a href="#0">
                                    <img className="rounded-full flex-shrink-0 mr-4" src="https://preview.cruip.com/open-pro/images/news-author-04.jpg" width={40} height={40} alt="Author 04"/> 
                                </a>
                                <div>
                                    <a className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Chris Solerieu</a>
                                    <span className="text-gray-700"> - </span>
                                    <span className="text-gray-500">Jan 19, 2020</span>
                                </div>
                                
                            </footer>
                        </div>
                    </article>
                </div>
            </section>
            
            {/* More components */}
            {/* <div x-show="open" className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
                <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
                    <div>👉 <a className="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-blog-post-hover" target="_blank">More components on Cruip.com</a></div>
                    <button className="text-gray-500 hover:text-gray-400 ml-5">
                        <span className="sr-only">Close</span>
                        <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                        </svg>
                    </button>
                </div>
            </div> */}
        </div>
    </>)
}
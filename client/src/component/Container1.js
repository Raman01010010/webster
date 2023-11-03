import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
export default function Container1(){
    return(<>
          <Routes>

          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}


//import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
//import './App.css'
import GoogleIcon from '@mui/icons-material/Google';
function navigate(url){
  window.location.href = url;
}

async function auth(){
  const response =await fetch('https://r-m-n.azurewebsites.net/google',{method:'post'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function Google() {


  return (
    <>

<button className="bg-blue-500 text-white h-10"  type="button" onClick={()=> auth()}>
          <GoogleIcon  sx={{fontSize:40}}/> Sign In with Google
            </button>
    </>
  )
}

export default Google;
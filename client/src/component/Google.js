

//import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
//import './App.css'

function navigate(url){
  window.location.href = url;
}

async function auth(){
  const response =await fetch('r-m-n-p.azurewebsites.net/google',{method:'post'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function Google() {


  return (
    <>

<button className="bg-blue-500 text-white h-10"  type="button" onClick={()=> auth()}>
           Sign In with Google
            </button>
    </>
  )
}

export default Google;
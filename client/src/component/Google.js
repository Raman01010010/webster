

//import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
//import './App.css'

function navigate(url){
  window.location.href = url;
}

async function auth(){
  const response =await fetch('http://127.0.0.1:3500/google',{method:'post'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function Google() {


  return (
    <>
<h1>Welcome to Consulting Ninja!</h1>
<h3>Google OAuth!</h3>
<p>Visit <a href="https://www.youtube.com/@ConsultingNinja/featured"><strong>@ConsultingNinja</strong></a> to see more great videos!</p>

<button className="bg-blue-500 text-white h-10"  type="button" onClick={()=> auth()}>
           Sign In with Google
            </button>
    </>
  )
}

export default Google;
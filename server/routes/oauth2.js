var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require('google-auth-library');
const User = require('../model/User');

async function getUserData({access_token,refreshToken}) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  console.log('data', data);



  const dataEmail = data?.email; // Assuming data is an object with an email property

  // Try to find a user with the given email
  const existingUser = await User.findOne({ email: dataEmail });
  
  if (!existingUser) {
    // If the user doesn't exist, create a new user
    const newUser = new User({
      name: data?.name,
      email: dataEmail,
      username: dataEmail,
      picture: data?.picture,
      pwd: access_token,
      refreshToken: refreshToken
    });
  
    await newUser.save();
    console.log('New user created:', newUser);
  
    // Store the user ID in the cookie
    res.cookie('useri', newUser._id, { maxAge: 900000 });
  } else {
    // If the user exists, update the user's information
    const updatedUser = await User.findOneAndUpdate(
      { email: dataEmail },
      {
        $set: {
          name: data?.name,
          picture: data?.picture,
          pwd: existingUser.pwd,
          refreshToken: refreshToken
        }
      },
      { new: true } // Return the updated user, not the original user
    );
  
    console.log('User updated:', updatedUser);
  
    // Store the user ID in the cookie
   // res.cookie('useri', updatedUser._id, { maxAge: 900000 });
  }
  
}

/* GET home page. */
router.get('/', async function (req, res, next) {
    let ans;
  const code = req.query.code;

  console.log(code);
  try {
    const redirectURL = "http://127.0.0.1:3500/oauth"
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const tokenResponse = await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(tokenResponse.tokens);
    console.info('Tokens acquired.');
    const user = oAuth2Client.credentials;
    console.log('credentials', user);

    // Decode the ID token
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokenResponse.tokens.id_token,
      audience: process.env.CLIENT_ID, // Your client ID from Google Cloud Console
    });
 const   ans1=await oAuth2Client.credentials.refesh_token
    const payload = ticket.getPayload();
    console.log('Decoded ID Token payload', payload.email);
 
  const r1= await getUserData({access_token:oAuth2Client.credentials.access_token,refreshToken:oAuth2Client.credentials.refresh_token});
    console.log('raman',r1)
   // res.cookie('gwt',oAuth2Client.credentials.access_token , { maxAge: 900000, httpOnly: true }); // Adjust options as needed
  res.cookie('gwtr',oAuth2Client.credentials.refesh_token , { maxAge: 900000, httpOnly: true });
  res.redirect(303,`http://localhost:3000/google/${oAuth2Client.credentials.access_token}`);
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
  }
  console.log(ans)
  //res.redirect(303,`http://localhost:3000/google/${ans}`);

  
});




module.exports = router;

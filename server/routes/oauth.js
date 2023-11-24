var express = require('express');
var router = express.Router();

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');
const User = require('../model/User');


/* GET users listing. */
router.post('/', async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:3000');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy","no-referrer-when-downgrade");
  const redirectURL = 'http://127.0.0.1:3500/oauth';

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
      redirectURL
    );
    console.log(oAuth2Client)

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
      prompt: 'consent'
    });

    res.json({url:authorizeUrl})
console.log(authorizeUrl)
});

router.post('/get',async(req,res)=>{
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken)
    const re=await User.find({refreshToken:refreshToken})
    res.status(200).send(re[0])
    console.log(re)
})

module.exports = router;
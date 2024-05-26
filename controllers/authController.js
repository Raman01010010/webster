const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    user=email;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    console.log(user)
    const foundUser = await User.findOne({ email: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.pwd);
    
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "userid":foundUser._id,
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
      
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        
        foundUser.refreshToken = refreshToken;
        console.log(foundUser)
        try {
            const result = await foundUser.save();
            console.log("User saved successfully:", result);
        } catch (error) {
            console.error("Error saving user:", error);
        }

        
        console.log("njj")
        //console.log(result);
       console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, 
           // secure: true, 
           // sameSite: 'None',
             maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ 
            //roles,
            "username":foundUser.username,"userid":foundUser._id,"email":foundUser.email,'picture':foundUser.picture, 
            accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
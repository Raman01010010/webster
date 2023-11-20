const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Job = require('../model/jobSchema.js')

exports.particularjob = async (req, res) => {
  const email = req.body.email;

  try {
    // Find the user with the specified email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const userId = user._id;

    // Find jobs for the user based on their id
    const jobs = await Job.find({ jobberid: userId });

    res.send(jobs);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
